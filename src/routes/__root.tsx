/// <reference types="vite/client" />

import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import appCss from "../styles/app.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}>()({
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
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
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
