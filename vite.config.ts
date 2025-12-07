import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		nitro({
			vercel: {
				functions: {
					runtime: "bun1.x",
				},
			},
		}),
		tailwindcss(),
		tsConfigPaths(),
		tanstackStart(),
		viteReact(),
	],
	server: {
		port: 3000,
	},
});
