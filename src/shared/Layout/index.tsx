'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JSX, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

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
				<main className="flex flex-1 flex-col items-center sm:p-12 sm:py-6 w-full h-full">
					{children}
				</main>
				{/* Footer */}
				<Footer />
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					pauseOnHover
					draggable
				/>
			</div>
		</QueryClientProvider>
	)
}
