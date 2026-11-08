import { NextRequest, NextResponse } from "next/server";
import { ContactFormData, ApiResponse } from "@/types";

// ─── In-memory Rate Limiter ───────────────────────────────────────────────────
// Stores { count, resetAt } per IP. Resets every WINDOW_MS milliseconds.
// NOTE: For multi-instance deployments (e.g. Vercel), use an external store
//       such as Upstash Redis with @upstash/ratelimit instead.
const RATE_LIMIT_MAX = 5; // max submissions per IP per window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10-minute window
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitResult(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Sanitize a string for safe embedding inside a Telegram HTML message.
 * Strips all control characters (including CRLF, NUL, zero-width chars)
 * before HTML-entity-encoding, preventing both header injection and XSS.
 */
function sanitizeForTelegram(text: string): string {
  // 1. Remove all control characters (0x00-0x1F, 0x7F, Unicode control/format)
  //    but preserve printable Unicode and normal whitespace (\t, \n, \r kept for readability)
  const stripped = text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200D\u2028\u2029\uFEFF]/g, "")
    .replace(/\r\n/g, "\n")   // normalize CRLF → LF
    .replace(/\r/g, "\n");    // normalize lone CR → LF

  // 2. HTML-entity-encode to prevent XSS in Telegram's HTML parse mode
  return stripped
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strict email format check.
 * Rejects addresses with newlines or other CRLF injection characters.
 */
function isValidEmail(email: string): boolean {
  if (/[\r\n\t]/.test(email)) return false;
  const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 max
}

/**
 * Derive client IP from headers, with a safe fallback.
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Field Length Constants ───────────────────────────────────────────────────
const LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 3000 },
} as const;

// ─── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // ── 1. Rate Limiting ────────────────────────────────────────────────────────
  const clientIp = getClientIp(request);
  const { allowed } = getRateLimitResult(clientIp);

  if (!allowed) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Too many requests. Please wait a few minutes before submitting again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": "600",
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    // ── 2. Parse & type-check request body ─────────────────────────────────
    let body: Partial<ContactFormData>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid request format." },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message, honeypot } = body;

    // ── 3. Honeypot anti-spam ───────────────────────────────────────────────
    if (honeypot && String(honeypot).trim().length > 0) {
      // Silently accept — avoids alerting the bot that it was detected
      return NextResponse.json<ApiResponse>(
        { success: true, message: "Thank you for reaching out! Your message has been received." },
        { status: 200 }
      );
    }

    // ── 4. Coerce & trim ───────────────────────────────────────────────────
    const cleanName    = String(fullName    ?? "").trim();
    const cleanEmail   = String(email       ?? "").trim();
    const cleanSubject = String(subject     ?? "").trim();
    const cleanMessage = String(message     ?? "").trim();

    // ── 5. Backend field validation ─────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!cleanName) {
      errors.fullName = "Full name is required.";
    } else if (cleanName.length < LIMITS.fullName.min) {
      errors.fullName = `Full name must be at least ${LIMITS.fullName.min} characters.`;
    } else if (cleanName.length > LIMITS.fullName.max) {
      errors.fullName = `Full name cannot exceed ${LIMITS.fullName.max} characters.`;
    }

    if (!cleanEmail) {
      errors.email = "Email address is required.";
    } else if (!isValidEmail(cleanEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!cleanSubject) {
      errors.subject = "Subject is required.";
    } else if (cleanSubject.length < LIMITS.subject.min) {
      errors.subject = `Subject must be at least ${LIMITS.subject.min} characters.`;
    } else if (cleanSubject.length > LIMITS.subject.max) {
      errors.subject = `Subject cannot exceed ${LIMITS.subject.max} characters.`;
    }

    if (!cleanMessage) {
      errors.message = "Message is required.";
    } else if (cleanMessage.length < LIMITS.message.min) {
      errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
    } else if (cleanMessage.length > LIMITS.message.max) {
      errors.message = `Message cannot exceed ${LIMITS.message.max} characters.`;
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please correct the highlighted form fields.",
          data: errors,
        },
        { status: 400 }
      );
    }

    // ── 6. Sanitize for Telegram delivery (after validation passes) ─────────
    const safeName    = sanitizeForTelegram(cleanName);
    const safeEmail   = sanitizeForTelegram(cleanEmail);
    const safeSubject = sanitizeForTelegram(cleanSubject);
    const safeMessage = sanitizeForTelegram(cleanMessage);

    // ── 7. Format submission timestamp (Cambodia Time, UTC+7) ───────────────
    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Phnom_Penh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // ── 8. Build Telegram HTML message ─────────────────────────────────────
    const telegramMessage = [
      `🏛️ <b>Portfolio Website — New Contact Message</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Full Name:</b> ${safeName}`,
      `📧 <b>Email:</b> <code>${safeEmail}</code>`,
      `📌 <b>Subject:</b> ${safeSubject}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📝 <b>Description:</b>`,
      `${safeMessage}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🕒 <b>Submitted At:</b> ${submissionDate} (Cambodia Time)`,
      `🌐 <b>Source:</b> <a href="https://www.nangdevit.xyz">www.nangdevit.xyz</a>`,
    ].join("\n");

    // ── 9. Read secrets from environment (server-side only) ─────────────────
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const groupId  = process.env.TELEGRAM_GROUP_ID ?? process.env.TELEGRAM_CHAT_ID;
    const topicId  = process.env.TELEGRAM_TOPIC_ID ?? process.env.TELEGRAM_THREAD_ID;

    if (!botToken || !groupId) {
      // Dev / staging: log sanitized summary (no raw user data in logs)
      console.warn(
        "⚠️ [Contact API] Telegram env vars not configured. Message received but not forwarded.\n" +
        `Name length: ${cleanName.length} | Email domain: ${cleanEmail.split("@")[1] ?? "?"} | Subject length: ${cleanSubject.length}`
      );
      return NextResponse.json<ApiResponse>(
        { success: true, message: "Thank you for contacting Nang Devit! Your message has been received." },
        { status: 200 }
      );
    }

    // ── 10. Deliver to Telegram ─────────────────────────────────────────────
    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const requestPayload: Record<string, unknown> = {
      chat_id: groupId,
      text: telegramMessage,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (topicId && !isNaN(Number(topicId))) {
      requestPayload.message_thread_id = Number(topicId);
    }

    const telegramRes = await fetch(telegramEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload),
      signal: AbortSignal.timeout(8000), // 8-second hard timeout
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      // Log only the error code from Telegram — not user data
      console.error("❌ [Telegram API Error] code:", telegramData.error_code, "desc:", telegramData.description);
      return NextResponse.json<ApiResponse>(
        { success: true, message: "Your message was received and registered. Thank you for reaching out!" },
        { status: 200 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Your message has been delivered to Nang Devit via Telegram. Thank you!" },
      { status: 200 }
    );

  } catch (err: unknown) {
    // Log class name only — avoids leaking internal paths or stack traces
    const errName = err instanceof Error ? err.constructor.name : "UnknownError";
    console.error("❌ [Contact API Unexpected Error]:", errName);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or email devit.nang@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
