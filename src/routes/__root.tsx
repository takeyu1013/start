/// <reference types="vite/client" />

import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { auth } from "@clerk/tanstack-react-start/server";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
import appCss from "../styles/app.css?url";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
	const session = await auth();
	const token = await session.getToken({ template: "convex" });

	return {
		userId: session.userId,
		token,
	};
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}>()({
	beforeLoad: async ({ context: { convexQueryClient } }) => {
		const { token, userId } = await fetchClerkAuth();
		if (token) {
			convexQueryClient.serverHttpClient?.setAuth(token);
		}
		return {
			userId,
			token,
		};
	},
	component: RootComponent,
	head: () => ({
		links: [{ rel: "stylesheet", href: appCss }],
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
	}),
});

function RootComponent() {
	const { convexClient } = useRouteContext({ from: Route.id });
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
				<RootDocument>
					<Outlet />
				</RootDocument>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html className="light" data-theme="light" lang="ja">
			<head>
				<HeadContent />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
