import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import {
  AuthKitProvider,
  useAccessToken,
  useAuth,
} from "@workos/authkit-tanstack-react-start/client";
import { ConvexProviderWithAuth } from "convex/react";
import { useCallback, useMemo } from "react";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const CONVEX_URL = import.meta.env.VITE_CONVEX_URL ?? "";
  const convexQueryClient = new ConvexQueryClient(CONVEX_URL);
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
      context: { convexQueryClient, queryClient },
      defaultPreload: "intent",
      routeTree,
      scrollRestoration: true,
      InnerWrap: ({ children }) => (
        <AuthKitProvider>
          <ConvexProviderWithAuth
            client={convexQueryClient.convexClient}
            useAuth={useAuthFromWorkOS}
          >
            {children}
          </ConvexProviderWithAuth>
        </AuthKitProvider>
      ),
    }),
    queryClient,
  );
  return router;
}

function useAuthFromWorkOS() {
  const { loading, user } = useAuth();
  const { accessToken, getAccessToken } = useAccessToken();
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (!accessToken || forceRefreshToken) {
        return (await getAccessToken()) ?? null;
      }
      console.log(accessToken);
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
