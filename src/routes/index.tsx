// src/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const filePath = "count.txt";

async function readCount() {
	return parseInt(
		await Bun.file(filePath)
			.text()
			.catch(() => "0"),
		10,
	);
}

const getCount = createServerFn({
	method: "GET",
}).handler(() => {
	return readCount();
});

const updateCount = createServerFn({ method: "POST" })
	.validator((d: number) => d)
	.handler(async ({ data }) => {
		const count = await readCount();
		await Bun.write(filePath, `${count + data}`);
	});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const router = useRouter();
	const state = Route.useLoaderData();

	return (
		<button
			type="button"
			onClick={() => {
				updateCount({ data: 1 }).then(() => {
					router.invalidate();
				});
			}}
		>
			Add 1 to {state}?
		</button>
	);
}
