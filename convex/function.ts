import { query } from "./_generated/server";

export const listTable = query({
  handler: async ({ db }) => {
    const list = await db.query("table").collect();
    return list;
  },
});
