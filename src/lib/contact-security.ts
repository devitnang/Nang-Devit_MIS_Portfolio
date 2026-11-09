import { createHash } from "node:crypto";
import { isIP } from "node:net";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_LOCAL_RATE_LIMIT_ENTRIES = 4096;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const RATE_LIMIT_SCRIPT = [
  'local count = redis.call("INCR", KEYS[1])',
  'if count == 1 then redis.call("PEXPIRE", KEYS[1], ARGV[1]) end',
  'return {count, redis.call("PTTL", KEYS[1])}',
].join("\n");

const LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { min: 3, max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 3000 },
} as const;

type ContactInput = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  turnstileToken?: string;
};

type Environment = Record<string, string | undefined>;
type Fetcher = typeof fetch;

type RateLimitEntry = { count: number; resetAt: number };

export type ContactHandlerDependencies = {
  env?: () => Environment;
  fetch?: Fetcher;
  now?: () => number;
};

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function normalizeOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.origin;
  } catch {
    return null;
  }
}

function isVercelEnvironment(env: Environment): boolean {
  return env.VERCEL === "1" || Boolean(env.VERCEL_URL) || Boolean(env.VERCEL_ENV);
}

function getAllowedOrigins(env: Environment, request: Request): Set<string> {
  const configured = env.CONTACT_ALLOWED_ORIGINS
    ?.split(",")
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter(
      (origin): origin is string =>
        origin !== null && (env.NODE_ENV !== "production" || origin.startsWith("https://")),
    );

  if (configured && configured.length > 0) {
    const origins = new Set(configured);
    if (env.NODE_ENV !== "production") {
      const requestOrigin = normalizeOrigin(request.url);
      if (requestOrigin) origins.add(requestOrigin);
      origins.add("http://localhost:3000");
      origins.add("http://127.0.0.1:3000");
    }
    return origins;
  }

  const siteOrigin = normalizeOrigin(env.NEXT_PUBLIC_SITE_URL);
  const origins = new Set<string>();

  if (siteOrigin && (env.NODE_ENV !== "production" || siteOrigin.startsWith("https://"))) {
    origins.add(siteOrigin);
  }

  if (env.NODE_ENV !== "production") {
    const requestOrigin = normalizeOrigin(request.url);
    if (requestOrigin) return new Set([requestOrigin]);
    return new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);
  }

  origins.add("https://www.nangdevit.xyz");
  origins.add("https://nangdevit.xyz");
  origins.add("https://mis-portfolio.nangdevit.xyz");

  const reqHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (reqHost) {
    const cleanHost = reqHost.split(":")[0].toLowerCase();
    if (
      cleanHost === "nangdevit.xyz" ||
      cleanHost.endsWith(".nangdevit.xyz") ||
      cleanHost.endsWith(".vercel.app")
    ) {
      origins.add(`https://${cleanHost}`);
    }
  }

  if (env.VERCEL_URL) {
    const vercelOrigin = normalizeOrigin(`https://${env.VERCEL_URL}`);
    if (vercelOrigin) origins.add(vercelOrigin);
  }
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    const prodOrigin = normalizeOrigin(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
    if (prodOrigin) origins.add(prodOrigin);
  }

  return origins;
}

function hasValidOrigin(request: Request, env: Environment): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;

  const origin = normalizeOrigin(originHeader);
  if (!origin || originHeader !== origin) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite?.toLowerCase() === "cross-site") return false;

  const allowedOrigins = getAllowedOrigins(env, request);
  if (allowedOrigins.has(origin)) return true;

  // On Vercel deployments and custom portfolio domains, automatically accept matching origin
  if (!env.CONTACT_ALLOWED_ORIGINS) {
    try {
      const originUrl = new URL(origin);
      if (
        originUrl.protocol === "https:" &&
        (originUrl.hostname.endsWith(".vercel.app") ||
          originUrl.hostname === "nangdevit.xyz" ||
          originUrl.hostname.endsWith(".nangdevit.xyz"))
      ) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

function getClientIp(request: Request, env: Environment): string | null {
  // Set this header at the trusted edge and overwrite any client supplied value.
  // Never enable the route behind a proxy that forwards untrusted client headers.
  const headerName = env.CONTACT_CLIENT_IP_HEADER?.trim();
  if (!headerName && env.NODE_ENV === "production" && !isVercelEnvironment(env)) return null;
  const trustedHeader = headerName || "x-forwarded-for";
  if (!/^[a-z0-9-]+$/i.test(trustedHeader)) return null;
  const rawValue = request.headers.get(trustedHeader)?.trim();
  if (!rawValue) return null;
  // If comma-separated in a proxy chain (e.g. Vercel edge), extract real client IP
  const value = rawValue.split(",")[0].trim();
  if (!value || isIP(value) === 0) return null;
  return value;
}

function hashClientIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function isRateLimitConfigurationPresent(env: Environment): boolean {
  return Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
}

async function checkDistributedRateLimit(
  ipHash: string,
  env: Environment,
  fetcher: Fetcher,
): Promise<{ allowed: boolean; remaining: number; retryAfter: number } | null> {
  const redisUrl = env.UPSTASH_REDIS_REST_URL;
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return null;

  let url: URL;
  try {
    url = new URL(redisUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  try {
    const response = await fetcher(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        RATE_LIMIT_SCRIPT,
        "1",
        `contact:rate:${ipHash}`,
        String(RATE_LIMIT_WINDOW_MS),
      ]),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("result" in payload)) return null;
    const result = (payload as { result?: unknown }).result;
    if (!Array.isArray(result) || result.length < 2) return null;

    const count = Number(result[0]);
    const ttlMs = Number(result[1]);
    if (!Number.isFinite(count) || !Number.isFinite(ttlMs) || count < 1) return null;

    const retryAfter = Math.max(1, Math.ceil(ttlMs / 1000));
    return {
      allowed: count <= RATE_LIMIT_MAX,
      remaining: Math.max(0, RATE_LIMIT_MAX - count),
      retryAfter,
    };
  } catch {
    return null;
  }
}

function checkLocalRateLimit(
  ipHash: string,
  map: Map<string, RateLimitEntry>,
  now: number,
): { allowed: boolean; remaining: number; retryAfter: number } {
  let entry = map.get(ipHash);
  if (!entry || now >= entry.resetAt) {
    if (map.size >= MAX_LOCAL_RATE_LIMIT_ENTRIES) {
      for (const [key, value] of map) {
        if (now >= value.resetAt) map.delete(key);
      }
    }

    if (map.size >= MAX_LOCAL_RATE_LIMIT_ENTRIES) {
      const overflowKey = "__overflow__";
      entry = map.get(overflowKey);
      if (!entry || now >= entry.resetAt) {
        entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
        map.set(overflowKey, entry);
      }
    } else {
      entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
      map.set(ipHash, entry);
    }
  }

  entry.count += 1;
  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return {
    allowed: entry.count <= RATE_LIMIT_MAX,
    remaining: Math.max(0, RATE_LIMIT_MAX - entry.count),
    retryAfter,
  };
}

async function checkRateLimit(
  ipHash: string,
  map: Map<string, RateLimitEntry>,
  env: Environment,
  fetcher: Fetcher,
  now: number,
): Promise<{ allowed: boolean; remaining: number; retryAfter: number } | null> {
  if (isRateLimitConfigurationPresent(env)) {
    return checkDistributedRateLimit(ipHash, env, fetcher);
  }
  if (env.NODE_ENV === "production" && !isVercelEnvironment(env)) return null;
  return checkLocalRateLimit(ipHash, map, now);
}

class InvalidBodyError extends Error { }
class OversizedBodyError extends Error { }

async function readJsonBody(request: Request): Promise<unknown> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    throw new OversizedBodyError();
  }

  const reader = request.body?.getReader();
  if (!reader) throw new InvalidBodyError();

  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new OversizedBodyError();
      }
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof OversizedBodyError) throw error;
    throw new InvalidBodyError();
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new InvalidBodyError();
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasUnsafeControls(value: string): boolean {
  return /[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u.test(value);
}

function isValidEmail(email: string): boolean {
  if (email.length > LIMITS.email.max || /\s|[\u0000-\u001F\u007F-\u009F]/u.test(email)) return false;

  const separator = email.indexOf("@");
  if (separator <= 0 || separator !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, separator);
  const domain = email.slice(separator + 1);
  if (local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;

  const labels = domain.split(".");
  if (labels.length < 2 || labels.some((label) => label.length < 1 || label.length > 63)) return false;
  if (labels.some((label) => !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label))) return false;
  return labels[labels.length - 1].length >= 2;
}

type ValidationResult =
  | { input: ContactInput; errors: null }
  | { input: null; errors: Record<string, string> };

function validateInput(value: unknown): ValidationResult {
  if (!isPlainObject(value)) return { input: null, errors: { form: "Invalid form data." } };

  const allowedKeys = new Set([
    "fullName",
    "email",
    "subject",
    "message",
    "honeypot",
    "turnstileToken",
  ]);
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) {
    return { input: null, errors: { form: "Unexpected form data." } };
  }

  const errors: Record<string, string> = {};
  for (const key of ["fullName", "email", "subject", "message"] as const) {
    if (typeof value[key] !== "string") errors[key] = "This field is required.";
  }
  for (const key of ["honeypot", "turnstileToken"] as const) {
    if (value[key] !== undefined && typeof value[key] !== "string") {
      errors.form = "Invalid form data.";
    }
  }
  if (Object.keys(errors).length > 0) return { input: null, errors };

  const rawFullName = value.fullName as string;
  const rawEmail = value.email as string;
  const rawSubject = value.subject as string;
  const rawMessage = value.message as string;
  const fullName = rawFullName.trim();
  const email = rawEmail.trim();
  const subject = rawSubject.trim();
  const message = rawMessage.replace(/\r\n?/g, "\n").trim();

  if (!fullName) errors.fullName = "Full name is required.";
  else if (fullName.length < LIMITS.fullName.min) errors.fullName = "Full name must be at least 2 characters.";
  else if (fullName.length > LIMITS.fullName.max) errors.fullName = "Full name cannot exceed 100 characters.";
  else if (hasUnsafeControls(rawFullName)) errors.fullName = "Full name contains invalid characters.";

  if (!email) errors.email = "Email address is required.";
  else if (hasUnsafeControls(rawEmail) || !isValidEmail(email)) errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Subject is required.";
  else if (subject.length < LIMITS.subject.min) errors.subject = "Subject must be at least 3 characters.";
  else if (subject.length > LIMITS.subject.max) errors.subject = "Subject cannot exceed 150 characters.";
  else if (hasUnsafeControls(rawSubject)) errors.subject = "Subject contains invalid characters.";

  if (!message) errors.message = "Message is required.";
  else if (message.length < LIMITS.message.min) errors.message = "Message must be at least 10 characters.";
  else if (message.length > LIMITS.message.max) errors.message = "Message cannot exceed 3000 characters.";
  else if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u.test(rawMessage)) {
    errors.message = "Message contains invalid characters.";
  }

  if (Object.keys(errors).length > 0) return { input: null, errors };

  return {
    errors: null,
    input: {
      fullName,
      email,
      subject,
      message,
      honeypot: value.honeypot as string | undefined,
      turnstileToken: value.turnstileToken as string | undefined,
    },
  };
}

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTurnstileConfiguration(env: Environment): {
  siteKey: string | undefined;
  secretKey: string | undefined;
} | null {
  const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const secretKey = env.TURNSTILE_SECRET_KEY;

  if (env.NODE_ENV === "production" && !isVercelEnvironment(env) && (!siteKey || !secretKey)) return null;
  if (Boolean(siteKey) !== Boolean(secretKey)) return null;
  return { siteKey, secretKey };
}

async function verifyTurnstile(
  token: string,
  secretKey: string,
  allowedOrigins: Set<string>,
  fetcher: Fetcher,
): Promise<boolean> {
  const body = new URLSearchParams({ secret: secretKey, response: token });
  try {
    const response = await fetcher(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;

    const result: unknown = await response.json();
    if (!isPlainObject(result) || result.success !== true || result.action !== "contact") return false;
    if (typeof result.hostname !== "string") return false;
    return (
      [...allowedOrigins].some((origin) => new URL(origin).hostname === result.hostname) ||
      result.hostname.endsWith(".vercel.app") ||
      result.hostname === "nangdevit.xyz" ||
      result.hostname.endsWith(".nangdevit.xyz")
    );
  } catch {
    return false;
  }
}

export function createContactHandler(dependencies: ContactHandlerDependencies = {}) {
  const env = dependencies.env ?? (() => process.env);
  const fetcher = dependencies.fetch ?? fetch;
  const now = dependencies.now ?? Date.now;
  const localRateLimitMap = new Map<string, RateLimitEntry>();

  return async function handleContactPost(request: Request): Promise<Response> {
    const currentEnv = env();

    if (!hasValidOrigin(request, currentEnv)) {
      return jsonResponse({ success: false, message: "This request is not allowed." }, 403);
    }

    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
      return jsonResponse({ success: false, message: "Invalid request format." }, 415);
    }

    const clientIp = getClientIp(request, currentEnv);
    if (!clientIp) {
      return jsonResponse({ success: false, message: "The contact service is temporarily unavailable." }, 503);
    }

    const rateLimit = await checkRateLimit(
      hashClientIp(clientIp),
      localRateLimitMap,
      currentEnv,
      fetcher,
      now(),
    );
    if (!rateLimit) {
      return jsonResponse({ success: false, message: "The contact service is temporarily unavailable." }, 503);
    }
    const rateHeaders = {
      "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
    };
    if (!rateLimit.allowed) {
      return jsonResponse(
        { success: false, message: "Too many requests. Please wait before submitting again." },
        429,
        { ...rateHeaders, "Retry-After": String(rateLimit.retryAfter) },
      );
    }

    let body: unknown;
    try {
      body = await readJsonBody(request);
    } catch (error) {
      if (error instanceof OversizedBodyError) {
        return jsonResponse({ success: false, message: "Request is too large." }, 413, rateHeaders);
      }
      return jsonResponse({ success: false, message: "Invalid request format." }, 400, rateHeaders);
    }

    // Silently absorb filled honeypots before requiring normal form fields.
    if (isPlainObject(body) && typeof body.honeypot === "string" && body.honeypot.trim()) {
      return jsonResponse(
        { success: true, message: "Thank you for reaching out! Your message has been received." },
        200,
        rateHeaders,
      );
    }

    const validation = validateInput(body);
    if (!validation.input) {
      return jsonResponse(
        {
          success: false,
          message: "Please correct the highlighted form fields.",
          data: validation.errors,
        },
        400,
        rateHeaders,
      );
    }

    const input = validation.input;
    const allowedOrigins = getAllowedOrigins(currentEnv, request);
    const turnstileConfig = getTurnstileConfiguration(currentEnv);
    if (!turnstileConfig) {
      return jsonResponse({ success: false, message: "The contact service is temporarily unavailable." }, 503, rateHeaders);
    }
    if (turnstileConfig.secretKey) {
      if (!input.turnstileToken || input.turnstileToken.length > 2048) {
        return jsonResponse({ success: false, message: "Please complete the anti-spam check." }, 400, rateHeaders);
      }
      const verified = await verifyTurnstile(
        input.turnstileToken,
        turnstileConfig.secretKey,
        allowedOrigins,
        fetcher,
      );
      if (!verified) {
        return jsonResponse({ success: false, message: "The anti-spam check could not be verified. Please try again." }, 400, rateHeaders);
      }
    }

    const botToken = currentEnv.TELEGRAM_BOT_TOKEN;
    const groupId = currentEnv.TELEGRAM_GROUP_ID ?? currentEnv.TELEGRAM_CHAT_ID;
    const topicId = currentEnv.TELEGRAM_TOPIC_ID ?? currentEnv.TELEGRAM_THREAD_ID;
    if (!botToken || !groupId) {
      return jsonResponse({ success: false, message: "The contact service is temporarily unavailable." }, 503, rateHeaders);
    }

    const safeName = escapeTelegramHtml(input.fullName);
    const safeEmail = escapeTelegramHtml(input.email);
    const safeSubject = escapeTelegramHtml(input.subject);
    const safeMessage = escapeTelegramHtml(input.message);
    const submissionDate = new Date(now()).toLocaleString("en-US", {
      timeZone: "Asia/Phnom_Penh",
      dateStyle: "full",
      timeStyle: "medium",
    });
    const telegramMessage = [
      "🏛️ <b>Portfolio Website — New Contact Message</b>",
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      `👤 <b>Full Name:</b> ${safeName}`,
      `📧 <b>Email:</b> <code>${safeEmail}</code>`,
      `📌 <b>Subject:</b> ${safeSubject}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      "📝 <b>Description:</b>",
      safeMessage,
      "━━━━━━━━━━━━━━━━━━━━━━━━━",
      `🕒 <b>Submitted At:</b> ${submissionDate} (Cambodia Time)`,
      `🌐 <b>Source:</b> <a href="${[...allowedOrigins][0]}">${new URL([...allowedOrigins][0]).hostname}</a>`,
    ].join("\n");

    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload: Record<string, unknown> = {
      chat_id: groupId,
      text: telegramMessage,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };
    if (topicId && /^\d+$/.test(topicId)) payload.message_thread_id = Number(topicId);

    try {
      const telegramResponse = await fetcher(telegramEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      });
      if (!telegramResponse.ok) {
        console.error("[Contact API] Telegram delivery failed with HTTP status", telegramResponse.status);
        return jsonResponse({ success: false, message: "Your message could not be delivered. Please try again later." }, 502, rateHeaders);
      }

      const telegramResult: unknown = await telegramResponse.json();
      if (!isPlainObject(telegramResult) || telegramResult.ok !== true) {
        console.error("[Contact API] Telegram rejected a contact delivery.");
        return jsonResponse({ success: false, message: "Your message could not be delivered. Please try again later." }, 502, rateHeaders);
      }
    } catch (error) {
      const errorName = error instanceof Error ? error.constructor.name : "UnknownError";
      console.error("[Contact API] Delivery error:", errorName);
      return jsonResponse({ success: false, message: "Your message could not be delivered. Please try again later." }, 502, rateHeaders);
    }

    return jsonResponse(
      { success: true, message: "Your message has been delivered. Thank you for reaching out!" },
      200,
      rateHeaders,
    );
  };
}

export const handleContactPost = createContactHandler();
