import { useState, ReactNode } from "react";

import { Link } from "react-router-dom";

import { Transition } from "@headlessui/react";
import { IconMenu2 } from "@tabler/icons";

import Logo from "../components/Logo";

type AsideProps = {
	children: ReactNode;
};

type DefaultProps = {
	children: ReactNode;
	navigation: ReactNode;
};

function Aside({ children }: AsideProps) {
	return (
		<aside className="flex flex-col flex-grow px-6 pb-6 overflow-y-auto bg-gray-800">
			<div className="flex items-center flex-shrink-0 h-16 my-6">
				<Link to="/" className="mx-auto">
					<Logo />
				</Link>
			</div>
			{children}
		</aside>
	);
}

export default function Default({ children, navigation }: DefaultProps) {
	const [showingMobileMenu, setShowingMobileMenu] = useState(false);

	return (
		<div className="lg:flex h-screen overflow-hidden bg-gray-900">
			<header className="bg-gray-800">
				<div className="lg:hidden px-2">
					<div className="h-16 flex items-center justify-between">
						<div className="px-2">
							<Link to="/">
								<Logo />
							</Link>
						</div>
						<div>
							<button
								onClick={() => setShowingMobileMenu(true)}
								className="p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-gray-500 transition duration-150 ease-in-out"
							>
								<IconMenu2 />
							</button>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 h-full">{children}</main>

			{/* Off-canvas menu for mobile */}
			<Transition
				show={showingMobileMenu}
				unmount={false}
				className="fixed inset-0 z-40 flex flex-row-reverse lg:hidden"
			>
				{/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
				<Transition.Child
					unmount={false}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					{() => (
						<div className="fixed inset-0">
							<div
								onClick={() => setShowingMobileMenu(false)}
								className="absolute inset-0 bg-gray-900 opacity-75"
							/>
						</div>
					)}
				</Transition.Child>

				{/* Off-canvas menu, show/hide based on off-canvas menu state. */}
				<Transition.Child
					unmount={false}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
					className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800"
				>
					<div className="absolute top-0 left-0 p-1 -ml-14">
						<Transition.Child
							unmount={false}
							className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
							aria-label="Close sidebar"
							as="button"
							onClick={() => setShowingMobileMenu(false)}
						>
							<svg
								className="w-6 h-6 text-white"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</Transition.Child>
					</div>
					<Aside>{navigation}</Aside>
				</Transition.Child>
				<div className="flex-shrink-0 w-14">
					{/* Dummy element to force sidebar to shrink to fit close icon */}
				</div>
			</Transition>

			<div className="hidden lg:flex lg:flex-shrink-0">
				<div className="flex flex-col w-64">
					<Aside>{navigation}</Aside>
				</div>
			</div>
		</div>
	);
}
