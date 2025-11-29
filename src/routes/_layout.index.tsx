import { SignedIn, SignedOut, UserButton } from "@clerk/tanstack-react-start";
import { Link } from "@heroui/react";
import { createFileRoute, Link as TanStackLink } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
	component: Home,
});

function Home() {
	return (
		<div className="flex flex-col items-center gap-y-4">
			<h1 className="text-center font-bold text-3xl">
				Welcome to the Sample App
			</h1>
			<p className="text-balance text-center text-muted">
				This is the home page for the sample application.
			</p>
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<Link>
					<TanStackLink to="/sign-up">Sign up now!</TanStackLink>
				</Link>
			</SignedOut>
		</div>
	);
}
