import { JSX, ReactNode } from 'react'

import Footer from '../Footer'
import Navbar from '../Navbar'

type Props = {
	children: ReactNode
}

export default function Layout(props: Props): JSX.Element {
	const { children } = props
	return (
		<div className="flex flex-col items-center w-full min-h-screen">
			{/* Navbar */}
			<Navbar />
			{/* Main */}
			<main className="flex flex-1 flex-col items-center py-6 sm:p-12 w-full h-full">
				{children}
			</main>
			{/* Footer */}
			<Footer />
		</div>
	)
}
