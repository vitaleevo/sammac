import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  postSchema,
  projectSchema,
} = require("../output/publication-tests/validation.js");
const base = {
  title: "Automação Industrial",
  excerpt: "Resumo técnico de teste.",
  summary: "Resumo técnico de teste.",
  content: "Conteúdo que deve ser preservado.",
  status: "published",
  imageStorageId: "existing-upload",
  imageUrl: "/images/control-panel.jpg",
};

for (const [entity, schema] of [
  ["artigo", postSchema],
  ["projeto", projectSchema],
]) {
  test(entity + ": normaliza endereço manual na publicação", () => {
    const value = schema.parse({
      ...base,
      slug: "  AUTOMAÇÃO Industrial: nível I & II!  ",
    });
    assert.equal(value.slug, "automacao-industrial-nivel-i-ii");
    assert.equal(value.status, "published");
    assert.equal(value.content, base.content);
    assert.equal(value.imageStorageId, base.imageStorageId);
    assert.equal(value.imageUrl, base.imageUrl);
  });
  for (const slug of [undefined, "", "   ", "!!!"]) {
    test(
      entity +
        ": endereço vazio ou sem letras usa título (" +
        JSON.stringify(slug) +
        ")",
      () => {
        assert.equal(
          schema.parse({ ...base, slug }).slug,
          "automacao-industrial",
        );
      },
    );
  }
  test(entity + ": preserva endereço válido já publicado", () => {
    assert.equal(
      schema.parse({ ...base, slug: "endereco-existente-2026" }).slug,
      "endereco-existente-2026",
    );
  });
  test(entity + ": limita endereço e elimina hífen final", () => {
    const value = schema.parse({ ...base, slug: "a-".repeat(120) }).slug;
    assert(value.length <= 180);
    assert.match(value, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });
  test(entity + ": rejeita tipo inválido de endereço", () => {
    assert.equal(
      schema.safeParse({ ...base, slug: { value: "unsafe" } }).success,
      false,
    );
  });
  test(
    entity + ": erro legível quando não há título nem endereço utilizável",
    () => {
      const result = schema.safeParse({ ...base, title: "!!!", slug: "   " });
      assert.equal(result.success, false);
      assert.equal(
        result.error.issues[0].message,
        "Indique um título ou endereço com letras ou números.",
      );
    },
  );
}
