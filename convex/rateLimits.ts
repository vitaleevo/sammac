import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const consume = mutation({
  args: {
    secret: v.string(),
    key: v.string(),
    limit: v.number(),
    windowMs: v.number(),
  },
  handler: async (ctx, args) => {
    if (
      !process.env.ADMIN_WRITE_SECRET ||
      args.secret !== process.env.ADMIN_WRITE_SECRET
    )
      throw new Error("Unauthorized");
    const now = Date.now();
    const record = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
    // Bound retention as well as request counts; IP addresses are hashed by the server.
    const expired = await ctx.db
      .query("rateLimits")
      .withIndex("by_expiry", (q) => q.lt("expiresAt", now))
      .take(20);
    for (const item of expired)
      if (item._id !== record?._id) await ctx.db.delete(item._id);
    if (!record) {
      await ctx.db.insert("rateLimits", {
        key: args.key,
        count: 1,
        expiresAt: now + args.windowMs,
      });
      return true;
    }
    if (record.expiresAt <= now) {
      await ctx.db.patch(record._id, {
        count: 1,
        expiresAt: now + args.windowMs,
      });
      return true;
    }
    if (record.count >= args.limit) return false;
    await ctx.db.patch(record._id, { count: record.count + 1 });
    return true;
  },
});
