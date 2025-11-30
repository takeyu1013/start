import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/_layout/log-in")({
	component: RouteComponent,
});

const handleForm = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		return data;
	})
	.handler(async ({ data }) => {
		console.log(data);
		return redirect({ to: "/" });
	});

function RouteComponent() {
	const { Field, Subscribe } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<section className="flex flex-col gap-y-4">
			<h1 className="mx-auto text-2xl">Log in</h1>
			<Form
				action={handleForm.url}
				className="flex flex-col gap-y-4"
				method="post"
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
