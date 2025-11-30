import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL ?? "";
	const convexClient = new ConvexReactClient(CONVEX_URL, {
		unsavedChangesWarning: false,
	});
	const convexQueryClient = new ConvexQueryClient(convexClient);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = routerWithQueryClient(
		createRouter({
			context: { queryClient, convexClient, convexQueryClient },
			defaultPreloadStaleTime: 0,
			routeTree,
			scrollRestoration: true,
			Wrap: ({ children }) => (
				<ConvexProvider client={convexQueryClient.convexClient}>
					{children}
				</ConvexProvider>
			),
		}),
		queryClient,
	);

	return router;
}
