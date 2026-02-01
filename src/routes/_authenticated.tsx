import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth, getSignInUrl } from "@workos/authkit-tanstack-react-start";

export const Route = createFileRoute("/_authenticated")({
  loader: async ({ location }) => {
    const { user } = await getAuth();
    if (!user) {
      const { pathname } = location;
      const href = await getSignInUrl({ data: { returnPathname: pathname } });
      throw redirect({ href });
    }
  },
  component: () => <Outlet />,
});
