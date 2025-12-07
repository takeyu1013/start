/// <reference types="vite/client" />

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
import { getAuth } from "@workos/authkit-tanstack-react-start";
import {
	AuthKitProvider,
	useAccessToken,
	useAuth,
} from "@workos/authkit-tanstack-react-start/client";
import { ConvexProviderWithAuth, type ConvexReactClient } from "convex/react";
import { type ReactNode, useCallback, useMemo } from "react";
import appCss from "../styles/app.css?url";

const fetchWorkosAuth = createServerFn({ method: "GET" }).handler(async () => {
	const auth = await getAuth();
	const { user } = auth;
	return {
		userId: user?.id ?? null,
		token: user ? auth.accessToken : null,
	};
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}>()({
	beforeLoad: async ({ context }) => {
		const { userId, token } = await fetchWorkosAuth();
		if (token) {
			context.convexQueryClient.serverHttpClient?.setAuth(token);
		}
		return { userId, token };
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
	const { convexQueryClient } = useRouteContext({ from: Route.id });
	return (
		<AuthKitProvider>
			<ConvexProviderWithAuth
				client={convexQueryClient.convexClient}
				useAuth={useAuthFromWorkOS}
			>
				<RootDocument>
					<Outlet />
				</RootDocument>
			</ConvexProviderWithAuth>
		</AuthKitProvider>
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

function useAuthFromWorkOS() {
	const { loading, user } = useAuth();
	const { accessToken, getAccessToken } = useAccessToken();
	const fetchAccessToken = useCallback(
		async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
			if (!accessToken || forceRefreshToken) {
				return (await getAccessToken()) ?? null;
			}

			return accessToken;
		},
		[accessToken, getAccessToken],
	);
	return useMemo(
		() => ({
			isLoading: loading,
			isAuthenticated: !!user,
			fetchAccessToken,
		}),
		[loading, user, fetchAccessToken],
	);
}
