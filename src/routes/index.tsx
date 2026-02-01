import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAuth, getSignInUrl } from "@workos/authkit-tanstack-react-start";
import { Authenticated, Unauthenticated } from "convex/react";

import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const { user } = await getAuth();
    const signInUrl = await getSignInUrl();
    return { user, signInUrl };
  },
});

function Home() {
  const { data } = useSuspenseQuery(convexQuery(api.function.listTable));
  const { signInUrl } = Route.useLoaderData();
  return (
    <main>
      <Authenticated>
        <ul>
          {data.map(({ _id, text }) => (
            <li key={_id}>{text}</li>
          ))}
        </ul>
        <Link reloadDocument to="/sign-out">
          Sign out
        </Link>
      </Authenticated>
      <Unauthenticated>
        <a href={signInUrl}>
          <button>Sign in</button>
        </a>
      </Unauthenticated>
      <div>
        <Link to="/authenticated">Authenticated Page</Link>
      </div>
    </main>
  );
}
