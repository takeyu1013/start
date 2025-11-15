import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated) {
		throw redirect({
			to: "/",
		});
	}

	return { userId };
});
export const Route = createFileRoute("/protected")({
	component: Page,
	beforeLoad: async () => await authStateFn(),
	loader: async ({ context: { userId } }) => {
		return { userId };
	},
});

function Page() {
	const { userId } = Route.useLoaderData();

	return (
		<main className="container mx-auto">
			<h1>Welcome! Your ID is {userId}!</h1>
		</main>
	);
}
