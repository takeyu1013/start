import { createFileRoute } from "@tanstack/react-router";

import yamlContent from "../../convex-spec.yaml?raw";

export const Route = createFileRoute("/spec")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(yamlContent);
      },
    },
  },
});
