import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const listTable = query({
  handler: async ({ auth, db }) => {
    const user = await auth.getUserIdentity();
    console.log(user);
    const list = await db.query("table").collect();
    return list;
  },
});

export const postTable = mutation({
  args: {
    text: v.string(),
  },
  handler: async ({ db }, { text }) => {
    await db.insert("table", { text });
  },
});
