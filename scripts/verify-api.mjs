import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const secret = process.env.ADMIN_SESSION_SECRET;
assert(secret, "Load .env.local before running these integration checks.");
const body = Buffer.from(
  JSON.stringify({ email: process.env.ADMIN_EMAIL, exp: Date.now() + 300_000 }),
).toString("base64url");
const cookie =
  "sammac_admin=" +
  body +
  "." +
  createHmac("sha256", secret).update(body).digest("base64url");
let passed = 0;
async function request(
  path,
  { method = "GET", data, auth = false, origin, raw } = {},
) {
  const headers = { "content-type": "application/json" };
  if (auth) headers.cookie = cookie;
  if (origin) headers.origin = origin;
  return fetch(base + path, {
    method,
    headers,
    body: raw ?? (data === undefined ? undefined : JSON.stringify(data)),
    redirect: "manual",
  });
}
async function check(name, run) {
  await run();
  passed++;
  console.log("PASS " + name);
}
await check("anonymous admin access denied", async () =>
  assert.equal((await request("/api/admin/content")).status, 401),
);
await check("protected page redirects to login", async () => {
  const r = await request("/backoffice");
  assert([307, 308].includes(r.status));
  assert(r.headers.get("location").includes("/backoffice/login"));
});
await check("malformed JSON handled", async () =>
  assert.equal(
    (await request("/api/contact", { method: "POST", raw: "{" })).status,
    400,
  ),
);
await check("invalid inquiry rejected", async () =>
  assert.equal(
    (await request("/api/contact", { method: "POST", data: { name: "A" } }))
      .status,
    400,
  ),
);
await check("cross-origin request denied", async () =>
  assert.equal(
    (
      await request("/api/contact", {
        method: "POST",
        data: {},
        origin: "https://example.org",
      })
    ).status,
    403,
  ),
);
await check("oversized request denied", async () =>
  assert.equal(
    (
      await request("/api/contact", {
        method: "POST",
        data: { message: "x".repeat(17_000) },
      })
    ).status,
    413,
  ),
);
await check("signed admin session can read dashboard", async () => {
  const r = await request("/api/admin/content", { auth: true });
  assert.equal(r.status, 200);
  const d = await r.json();
  assert(Array.isArray(d.posts) && Array.isArray(d.courses));
});
await check("admin payload validation", async () =>
  assert.equal(
    (
      await request("/api/admin/content", {
        method: "POST",
        auth: true,
        data: { entity: "post", data: { title: "x" } },
      })
    ).status,
    422,
  ),
);
await check("meeting requires future date and subject", async () =>
  assert.equal(
    (
      await request("/api/meeting", {
        method: "POST",
        data: {
          type: "meeting",
          name: "QA Test",
          email: "qa@example.com",
          phone: "244930183262",
          message: "Verification only",
          preferredDate: "2020-01-01",
        },
      })
    ).status,
    400,
  ),
);
let id;
const slug = "qa-draft-" + randomUUID();
const draft = {
  title: "QA draft — automatic verification",
  slug,
  excerpt: "Temporary private draft for integration verification.",
  content:
    "Temporary private draft. This item is removed by the verification script.",
  status: "draft",
};
try {
  await check("create private draft", async () => {
    const r = await request("/api/admin/content", {
      method: "POST",
      auth: true,
      data: { entity: "post", data: draft },
    });
    assert.equal(r.status, 200);
    id = (await r.json()).id;
    assert(id);
  });
  await check("draft is not public", async () =>
    assert.equal((await request("/blog/" + slug)).status, 404),
  );
  await check("update private draft", async () => {
    const r = await request("/api/admin/content", {
      method: "POST",
      auth: true,
      data: {
        entity: "post",
        data: { ...draft, id, title: "QA draft — edited" },
      },
    });
    assert.equal(r.status, 200);
  });
  await check("draft persisted in dashboard", async () => {
    const r = await request("/api/admin/content", { auth: true });
    const d = await r.json();
    assert.equal(d.posts.find((p) => p._id === id)?.title, "QA draft — edited");
  });
} finally {
  if (id) {
    const r = await request("/api/admin/content", {
      method: "DELETE",
      auth: true,
      data: { entity: "posts", id },
    });
    assert.equal(r.status, 200);
    console.log("PASS temporary draft removed");
    passed++;
  }
}
console.log("Verified " + passed + " API checks. No customer data was used.");
