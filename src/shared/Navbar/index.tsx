import Link from 'next/link'
import { JSX } from 'react'

export default function Navbar(): JSX.Element {
	return (
		<div className="navbar bg-base-100 shadow-sm">
			{/* Navbar start */}
			<div className="navbar-start">
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
				</div>
				{/* Logo */}
				<Link href="/">
					<p className="btn btn-ghost bg-base-100 text-xl">My Partner 👷</p>
				</Link>
			</div>
			{/* Navbar central */}
			<div className="navbar-center"></div>
			{/* Navbar end */}
			<div className="navbar-end"></div>
		</div>
	)
}
