import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JSX, ReactNode } from 'react'

import Alert from '../Alert'
import Footer from '../Footer'
import Navbar from '../Navbar'

const queryClient = new QueryClient()

type Props = {
	children: ReactNode
}

export default function Layout(props: Props): JSX.Element {
	const { children } = props
	return (
		<QueryClientProvider client={queryClient}>
			<div className="flex flex-col items-center w-full min-h-screen">
				{/* Navbar */}
				<Navbar />
				{/* Main */}
				<main className="flex flex-1 flex-col items-center py-6 sm:p-12 w-full h-full">
					{children}
					<Alert />
				</main>
				{/* Footer */}
				<Footer />
			</div>
		</QueryClientProvider>
	)
}
