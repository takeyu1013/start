import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doc")({
  component: Page,
  ssr: false,
});

function Page() {
  return (
    <ApiReferenceReact
      configuration={{
        url: "/spec",
      }}
    />
  );
}
