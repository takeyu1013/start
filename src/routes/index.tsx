import { convexQuery } from "@convex-dev/react-query";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
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
		<main className="container mx-auto">
			<ul>
				{numberList.map(({ id, value }) => (
					<li key={id}>{value}</li>
				))}
			</ul>
			<Form className="flex flex-col gap-y-4">
				<TextField isRequired name="email" type="email">
					<Label>Email</Label>
					<Input />
				</TextField>
				<Button type="submit">Submit</Button>
			</Form>
		</main>
	);
}
