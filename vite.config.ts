import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	optimizeDeps: {
		include: ["@clerk/tanstack-react-start", "cookie"],
	},
	plugins: [tailwindcss(), tsConfigPaths(), tanstackStart(), viteReact()],
	server: {
		port: 3000,
	},
});
