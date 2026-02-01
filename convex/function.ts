import { query } from "./_generated/server";

export const listTable = query({
  handler: async ({ auth, db }) => {
    const user = await auth.getUserIdentity();
    console.log(user);
    const list = await db.query("table").collect();
    return list;
  },
});
