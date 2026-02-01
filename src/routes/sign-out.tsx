import { createFileRoute } from "@tanstack/react-router";
import { signOut } from "@workos/authkit-tanstack-react-start";

export const Route = createFileRoute("/sign-out")({
  loader: async () => {
    const VERCEL_PROJECT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const returnTo = VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";
    await signOut({ data: { returnTo } });
  },
});
