'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JSX } from 'react'

export default function Navbar(): JSX.Element {
	const pathname: string = usePathname()
	const splitPath: string[] = pathname.split('/')

	const isConsole: boolean = splitPath[1] === 'console'

	return (
		<div className="navbar bg-base-100 shadow-sm">
			{/* Navbar start */}
			<div className="w-full sm:navbar-start">
				{/* Responsive menu */}
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							{!isConsole && (
								<Link href="/register">
									<p className="text-sm hover:bg-base-200">Are you partner?</p>
								</Link>
							)}
						</li>
						<li>
							{isConsole && (
								<Link href="/console/chats">
									<p className="text-sm hover:bg-base-200">Chats</p>
								</Link>
							)}
						</li>
					</ul>
				</div>
				{/* Logo */}
				<Link href="/">
					<p className="btn btn-ghost bg-base-100 text-xl">My Partner 👷</p>
				</Link>
			</div>
			{/* Navbar central */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						{!isConsole && (
							<Link href="/register">
								<p className="text-sm hover:bg-base-200">Are you partner?</p>
							</Link>
						)}
					</li>
					<li>
						{isConsole && (
							<Link href="/console/chats">
								<p className="text-sm hover:bg-base-200">Chats</p>
							</Link>
						)}
					</li>
				</ul>
			</div>
			{/* Navbar end */}
			<div className="navbar-end"></div>
		</div>
	)
}
