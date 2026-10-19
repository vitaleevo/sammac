import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

const url = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
export const convex = url ? new ConvexHttpClient(url) : null;

export async function getPosts(limit = 20) {
  if (!convex) return [];
  try { return await convex.query(api.content.listPublicPosts, { limit }); } catch { return []; }
}
export async function getProjects(limit = 20) {
  if (!convex) return [];
  try { return await convex.query(api.content.listPublicProjects, { limit }); } catch { return []; }
}
export async function getCourses() {
  if (!convex) return [];
  try { return await convex.query(api.content.listPublicCourses, {}); } catch { return []; }
}
export async function getPost(slug: string) {
  if (!convex) return null;
  try { return await convex.query(api.content.getPostBySlug, { slug }); } catch { return null; }
}
export async function getProject(slug: string) {
  if (!convex) return null;
  try { return await convex.query(api.content.getProjectBySlug, { slug }); } catch { return null; }
}
