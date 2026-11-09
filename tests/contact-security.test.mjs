import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/contact-security.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
});
const compiledModuleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
const { createContactHandler } = await import(compiledModuleUrl);

const ORIGIN = "https://portfolio.test";
const VALID_INPUT = {
  fullName: "Jordan Rivera",
  email: "jordan@example.com",
  subject: "Project inquiry",
  message: "I would like to discuss a project with you.",
};

function makeRequest(body = VALID_INPUT, options = {}) {
  const headers = new Headers({
    "Content-Type": options.contentType ?? "application/json",
    Origin: options.origin ?? ORIGIN,
    "x-forwarded-for": options.ip ?? "203.0.113.12",
  });
  if (options.fetchSite) headers.set("sec-fetch-site", options.fetchSite);
  return new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function makeDependencies(overrides = {}) {
  const calls = [];
  const env = {
    NODE_ENV: "test",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
    ...overrides.env,
  };
  const fetch = async (input, init = {}) => {
    calls.push({ url: String(input), init });
    return Response.json({ ok: true, result: { message_id: 1 } });
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: overrides.fetch ?? fetch,
    now: () => 1_800_000_000_000,
  });
  return { handler, calls, env };
}

async function readJson(response) {
  return response.json();
}

test("rejects missing, cross-origin, and cross-site browser requests", async () => {
  const { handler, calls } = makeDependencies();
  for (const options of [
    { origin: "" },
    { origin: "https://attacker.test" },
    { fetchSite: "cross-site" },
  ]) {
    const response = await handler(makeRequest(VALID_INPUT, options));
    assert.equal(response.status, 403);
  }
  assert.equal(calls.length, 0);
});

test("requires JSON and rejects malformed, oversized, and unexpected payloads", async () => {
  const { handler } = makeDependencies();
  assert.equal((await handler(makeRequest(VALID_INPUT, { contentType: "text/plain" }))).status, 415);
  assert.equal((await handler(makeRequest("{"))).status, 400);
  assert.equal((await handler(makeRequest({ ...VALID_INPUT, extra: "unexpected" }))).status, 400);
  assert.equal((await handler(makeRequest({ ...VALID_INPUT, message: "x".repeat(17_000) }))).status, 413);
});

test("rejects wrong field types, invalid email addresses, and header injection", async () => {
  const { handler, calls } = makeDependencies();
  const cases = [
    { ...VALID_INPUT, fullName: { value: "Jordan" } },
    { ...VALID_INPUT, email: "jordan@example.com\r\nBcc: victim@example.com" },
    { ...VALID_INPUT, subject: "Hello\r\nBcc: victim@example.com" },
    { ...VALID_INPUT, email: "jordan..rivera@example.com" },
    { ...VALID_INPUT, message: "line\u0000break" },
    { ...VALID_INPUT, fullName: "x".repeat(101) },
    { ...VALID_INPUT, subject: "ab" },
    { ...VALID_INPUT, message: "short" },
  ];
  for (const [index, body] of cases.entries()) {
    const response = await handler(makeRequest(body, { ip: `203.0.113.${20 + index}` }));
    assert.equal(response.status, 400);
  }
  assert.equal(calls.length, 0);
});

test("silently absorbs the honeypot without forwarding contact data", async () => {
  const { handler, calls } = makeDependencies();
  const response = await handler(makeRequest({ honeypot: "bot-filled" }));
  assert.equal(response.status, 200);
  assert.equal((await readJson(response)).success, true);
  assert.equal(calls.length, 0);
});

test("enforces five requests per IP in the local fallback limiter", async () => {
  const { handler, calls } = makeDependencies();
  for (let index = 0; index < 5; index += 1) {
    assert.equal((await handler(makeRequest({ ...VALID_INPUT, email: "bad" }))).status, 400);
  }
  const limited = await handler(makeRequest({ ...VALID_INPUT, email: "bad" }));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "600");
  assert.equal(limited.headers.get("X-RateLimit-Remaining"), "0");
  assert.equal(calls.length, 0);
});

test("uses the shared production limiter and hashes IPs in Redis keys", async () => {
  let redisCount = 0;
  const calls = [];
  const env = {
    NODE_ENV: "production",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    CONTACT_CLIENT_IP_HEADER: "x-forwarded-for",
    UPSTASH_REDIS_REST_URL: "https://redis.example.test",
    UPSTASH_REDIS_REST_TOKEN: "test-redis-token",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (input, init = {}) => {
      calls.push({ url: String(input), init });
      const command = JSON.parse(init.body);
      assert.equal(command[0], "EVAL");
      assert.equal(command[2], "1");
      assert.match(command[3], /^contact:rate:[a-f0-9]{64}$/);
      assert.equal(command[3].includes("203.0.113.12"), false);
      redisCount += 1;
      return Response.json({ result: [redisCount, 600_000] });
    },
  });

  for (let index = 0; index < 5; index += 1) {
    assert.equal((await handler(makeRequest({ ...VALID_INPUT, email: "bad" }))).status, 400);
  }
  const limited = await handler(makeRequest({ ...VALID_INPUT, email: "bad" }));
  assert.equal(limited.status, 429);
  assert.equal(calls.length, 6);
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-redis-token");
});

test("escapes Telegram HTML and safely processes successful delivery with mocked services", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "test",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
    TURNSTILE_SECRET_KEY: "test-secret-key",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
      assert.equal(init.body.get("secret"), "test-secret-key");
      assert.equal(init.body.get("response"), "test-captcha-token");
      return Response.json({ success: true, action: "contact", hostname: "portfolio.test" });
    }
    return Response.json({ ok: true, result: { message_id: 1 } });
  };
  const handler = createContactHandler({ env: () => env, fetch, now: () => 1_800_000_000_000 });
  const response = await handler(makeRequest({
    ...VALID_INPUT,
    fullName: "<img src=x onerror=alert(1)>",
    subject: "<script>alert(1)</script>",
    message: "Hello & welcome <b>there</b>",
    turnstileToken: "test-captcha-token",
  }));

  assert.equal(response.status, 200);
  assert.equal((await readJson(response)).success, true);
  assert.equal(calls.length, 2);
  const telegram = JSON.parse(calls[1].init.body);
  assert.equal(telegram.chat_id, "-1001234567890");
  assert.equal(telegram.parse_mode, "HTML");
  assert.match(telegram.text, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(telegram.text, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(telegram.text, /Hello &amp; welcome &lt;b&gt;there&lt;\/b&gt;/);
  assert.doesNotMatch(telegram.text, /<img|<script>/);
});

test("rejects failed CAPTCHA verification without attempting Telegram delivery", async () => {
  const env = {
    NODE_ENV: "test",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "test-site-key",
    TURNSTILE_SECRET_KEY: "test-secret-key",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const calls = [];
  const handler = createContactHandler({
    env: () => env,
    fetch: async (input) => {
      calls.push(String(input));
      return Response.json({ success: false, action: "contact", hostname: "portfolio.test" });
    },
  });
  const response = await handler(makeRequest({ ...VALID_INPUT, turnstileToken: "invalid-token" }));
  assert.equal(response.status, 400);
  assert.equal(calls.length, 1);
  assert.match(calls[0], /siteverify/);
});

test("reports delivery failures without claiming success or echoing provider details", async () => {
  const { handler } = makeDependencies({
    fetch: async () => new Response(JSON.stringify({ ok: false, description: "private provider detail" }), { status: 500 }),
  });
  const response = await handler(makeRequest());
  const body = await readJson(response);
  assert.equal(response.status, 502);
  assert.equal(body.success, false);
  assert.doesNotMatch(JSON.stringify(body), /private provider detail/);
});

test("fails closed in production without distributed rate limiting", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "production",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    CONTACT_CLIENT_IP_HEADER: "x-forwarded-for",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "site-key",
    TURNSTILE_SECRET_KEY: "secret-key",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (...args) => {
      calls.push(args);
      return Response.json({ ok: true });
    },
  });
  const response = await handler(makeRequest());
  assert.equal(response.status, 503);
  assert.equal(calls.length, 0);
});

test("fails closed when production CAPTCHA configuration is missing", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "production",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    CONTACT_CLIENT_IP_HEADER: "x-forwarded-for",
    UPSTASH_REDIS_REST_URL: "https://redis.example.test",
    UPSTASH_REDIS_REST_TOKEN: "test-redis-token",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (input) => {
      calls.push(String(input));
      return Response.json({ result: [1, 600_000] });
    },
  });
  const response = await handler(makeRequest());
  assert.equal(response.status, 503);
  assert.equal(calls.length, 1);
  assert.match(calls[0], /redis\.example\.test/);
});

test("fails closed in production until a trusted client IP header is configured", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "production",
    CONTACT_ALLOWED_ORIGINS: ORIGIN,
    UPSTASH_REDIS_REST_URL: "https://redis.example.test",
    UPSTASH_REDIS_REST_TOKEN: "test-redis-token",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (...args) => {
      calls.push(args);
      return Response.json({ result: [1, 600_000] });
    },
  });
  const response = await handler(makeRequest());
  assert.equal(response.status, 503);
  assert.equal(calls.length, 0);
});

test("automatically accepts Vercel origins and delivers safely on Vercel deployment", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "production",
    VERCEL: "1",
    VERCEL_URL: "nangdevit-portfolio.vercel.app",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (input, init = {}) => {
      calls.push({ url: String(input), init });
      return Response.json({ ok: true, result: { message_id: 1 } });
    },
  });
  const request = new Request("https://nangdevit-portfolio.vercel.app/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://nangdevit-portfolio.vercel.app",
      "sec-fetch-site": "same-origin",
      "x-forwarded-for": "203.0.113.50, 76.76.21.21",
    },
    body: JSON.stringify(VALID_INPUT),
  });
  const response = await handler(request);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.success, true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /api\.telegram\.org/);
});

test("automatically accepts mis-portfolio.nangdevit.xyz and subdomains on production", async () => {
  const calls = [];
  const env = {
    NODE_ENV: "production",
    VERCEL: "1",
    TELEGRAM_BOT_TOKEN: "test-bot-token",
    TELEGRAM_GROUP_ID: "-1001234567890",
  };
  const handler = createContactHandler({
    env: () => env,
    fetch: async (input, init = {}) => {
      calls.push({ url: String(input), init });
      return Response.json({ ok: true, result: { message_id: 2 } });
    },
  });
  const request = new Request("https://mis-portfolio.nangdevit.xyz/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://mis-portfolio.nangdevit.xyz",
      "sec-fetch-site": "same-origin",
      "x-forwarded-for": "103.20.15.42",
      host: "mis-portfolio.nangdevit.xyz",
    },
    body: JSON.stringify(VALID_INPUT),
  });
  const response = await handler(request);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.success, true);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /api\.telegram\.org/);
});

