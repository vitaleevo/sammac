import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    expiresAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_expiry", ["expiresAt"]),
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    imageStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    summary: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
    status: v.string(),
    featured: v.optional(v.boolean()),
    publishedAt: v.optional(v.number()),
    imageStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),
  courses: defineTable({
    title: v.string(),
    category: v.string(),
    summary: v.string(),
    description: v.optional(v.string()),
    duration: v.string(),
    modality: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    status: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_start", ["startDate"]),
  inquiries: defineTable({
    type: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    organization: v.optional(v.string()),
    subject: v.optional(v.string()),
    interest: v.optional(v.string()),
    preferredDate: v.optional(v.string()),
    message: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_status", ["status"]),
});
