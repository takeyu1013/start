import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const {
		data: { numberList },
	} = useSuspenseQuery(convexQuery(api.function.listNumber, { count: 10 }));

	return (
		<main>
			<ul>
				{numberList.map(({ id, value }) => (
					<li key={id}>{value}</li>
				))}
			</ul>
		</main>
	);
}
