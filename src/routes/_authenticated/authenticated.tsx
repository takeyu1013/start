import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/authenticated")({
  component: Page,
});

function Page() {
  return (
    <main>
      <p>Welcome!</p>
      <Link reloadDocument to="/sign-out">
        Sign out
      </Link>
    </main>
  );
}
