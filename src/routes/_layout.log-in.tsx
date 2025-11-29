import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/log-in")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<section className="flex flex-col gap-y-4">
			<h1 className="mx-auto text-2xl">Log in</h1>
			<Form className="flex flex-col gap-y-4">
				<TextField isRequired name="email" type="email">
					<Label>Email</Label>
					<Input />
				</TextField>
				<TextField isRequired name="password" type="password">
					<Label>Password</Label>
					<Input />
				</TextField>
				<Button className="w-full" type="submit">
					Submit
				</Button>
			</Form>
		</section>
	);
}
