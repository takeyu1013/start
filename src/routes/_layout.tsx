import { Button, Dropdown, Label, Link } from "@heroui/react";
import { IconMenu2 } from "@tabler/icons-react";
import {
	createFileRoute,
	Outlet,
	Link as TanStackLink,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: Layout,
});

function Layout() {
	return (
		<>
			<header className="sticky top-0 z-10 flex h-14 items-center justify-center bg-background">
				<div className="flex max-w-5xl flex-1 items-center justify-between px-4">
					<Link className="font-bold text-2xl" underline="none">
						<TanStackLink to="/">SAMPLE APP</TanStackLink>
					</Link>
					<Dropdown>
						<Button className="p-1" variant="ghost">
							<IconMenu2 stroke={2} />
						</Button>
						<Dropdown.Popover className="bg-background" placement="bottom end">
							<Dropdown.Menu>
								<Dropdown.Item>
									<Label>Home</Label>
								</Dropdown.Item>
								<Dropdown.Item>
									<Label>Help</Label>
								</Dropdown.Item>
								<Dropdown.Item>
									<TanStackLink className="block w-full" to="/log-in">
										Log in
									</TanStackLink>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
				</div>
			</header>
			<main className="mx-auto max-w-5xl p-4">
				<Outlet />
			</main>
		</>
	);
}
