import { Button, Link } from "@heroui/react";
import { createFileRoute, Link as TanStackLink } from "@tanstack/react-router";
import {
	getAuth,
	getSignInUrl,
	getSignUpUrl,
	type User,
} from "@workos/authkit-tanstack-react-start";
import { useAuth } from "@workos/authkit-tanstack-react-start/client";

export const Route = createFileRoute("/_layout/")({
	component: Home,
	loader: async () => {
		const { user } = await getAuth();
		const signInUrl = await getSignInUrl();
		const signUpUrl = await getSignUpUrl();
		return { user, signInUrl, signUpUrl };
	},
});

function Home() {
	const { user, signInUrl, signUpUrl } = Route.useLoaderData();
	return (
		<div className="flex flex-col items-center gap-y-4">
			<h1 className="text-center font-bold text-3xl">
				Welcome to the Sample App
			</h1>
			<p className="text-balance text-center text-muted">
				This is the home page for the sample application.
			</p>
			{user && <UserMenu user={user} />}
			<Link>
				<TanStackLink to={signUpUrl}>Sign up now!</TanStackLink>
			</Link>
			<Link>
				<TanStackLink to={signInUrl}>Sign in now!</TanStackLink>
			</Link>
		</div>
	);
}

function UserMenu({ user }: { user: User }) {
	const { signOut } = useAuth();

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm">{user.email}</span>
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	);
}
