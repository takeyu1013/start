import { v } from "convex/values";
import { query } from "./_generated/server";

export const listNumber = query({
	args: {
		count: v.number(),
	},
	handler: async ({ db, auth }, { count }) => {
		const numberList = await db.query("numbers").order("desc").take(count);
		return {
			numberList: numberList
				.reverse()
				.map(({ _id, value }) => ({ id: _id, value })),
			viewer: (await auth.getUserIdentity())?.name ?? null,
		};
	},
});
