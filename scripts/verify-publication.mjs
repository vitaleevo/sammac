import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
assert(
  process.env.ADMIN_SESSION_SECRET,
  "Load .env.local before these checks.",
);
const body = Buffer.from(
  JSON.stringify({ email: process.env.ADMIN_EMAIL, exp: Date.now() + 300_000 }),
).toString("base64url");
const cookie =
  "sammac_admin=" +
  body +
  "." +
  createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(body)
    .digest("base64url");
const ids = [];
async function request(method, data) {
  return fetch(base + "/api/admin/content", {
    method,
    headers: { "content-type": "application/json", cookie },
    body: data ? JSON.stringify(data) : undefined,
  });
}
try {
  for (const entity of ["post", "project"]) {
    for (const mode of ["manual", "blank"]) {
      const suffix = randomUUID();
      const expected = "qa-publicacao-tecnica-" + suffix;
      const data = {
        title: "QA Publicação Técnica " + suffix,
        slug:
          mode === "manual"
            ? "  QA PUBLICAÇÃO Técnica — " + suffix + "  "
            : "   ",
        excerpt: "Resumo de verificação temporária.",
        summary: "Resumo de verificação temporária.",
        content: "Conteúdo do rascunho temporário que deve ser preservado.",
        status: "draft",
        imageUrl: "/images/control-panel.jpg",
      };
      const response = await request("POST", { entity, data });
      assert.equal(response.status, 200, await response.clone().text());
      const { id } = await response.json();
      assert(id);
      ids.push({ entity: entity === "post" ? "posts" : "projects", id });
      const dashboard = await request("GET");
      assert.equal(dashboard.status, 200);
      const saved = (await dashboard.json())[
        entity === "post" ? "posts" : "projects"
      ].find((item) => item._id === id);
      assert.equal(saved?.slug, expected);
      assert.equal(saved.content, data.content);
      assert.equal(saved.imageUrl, data.imageUrl);
      assert.equal(saved.status, "draft");
      console.log(
        "PASS " +
          entity +
          " " +
          mode +
          ": API normalizes address and preserves content/image",
      );
    }
  }
} finally {
  for (const item of ids) {
    const response = await request("DELETE", item);
    assert.equal(response.status, 200);
  }
  console.log("Temporary private records removed: " + ids.length);
}
