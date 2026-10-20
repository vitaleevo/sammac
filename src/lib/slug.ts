export function normalizeSlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 180)
    .replace(/^-+|-+$/g, "");
}

export function publicationSlug(value: string, title: string): string {
  return normalizeSlug(value) || normalizeSlug(title);
}
