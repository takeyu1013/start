import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "fs/promises";

export const Route = createFileRoute("/spec")({
  server: {
    handlers: {
      GET: async () => {
        const yamlContent = await readFile("convex-spec.yaml", "utf-8");
        return new Response(yamlContent);
      },
    },
  },
});
