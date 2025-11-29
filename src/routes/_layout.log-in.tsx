import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/log-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});
	return (
		<section className="flex flex-col gap-y-4">
			<h1 className="mx-auto text-2xl">Log in</h1>
			<Form
				className="flex flex-col gap-y-4"
				onSubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					handleSubmit();
				}}
			>
				<Field name="email">
					{({ handleChange, name, state: { value } }) => (
						<TextField
							id={name}
							isRequired
							name={name}
							onChange={(value) => handleChange(value)}
							type="email"
							value={value}
						>
							<Label>Email</Label>
							<Input />
						</TextField>
					)}
				</Field>
				<Field name="password">
					{({ handleChange, name, state: { value } }) => (
						<TextField
							id={name}
							isRequired
							name={name}
							onChange={(value) => handleChange(value)}
							type="password"
							value={value}
						>
							<Label>Password</Label>
							<Input />
						</TextField>
					)}
				</Field>
				<Subscribe>
					{({ canSubmit, isSubmitting }) => (
						<Button className="w-full" isDisabled={!canSubmit} type="submit">
							{isSubmitting ? "..." : "Submit"}
						</Button>
					)}
				</Subscribe>
			</Form>
		</section>
	);
}
