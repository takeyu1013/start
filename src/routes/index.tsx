import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = useSuspenseQuery(convexQuery(api.function.listTable));
  return (
    <main>
      <ul>
        {data.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
      <Link to="/form">Form</Link>
    </main>
  );
}
