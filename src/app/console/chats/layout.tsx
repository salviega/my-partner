import { JSX } from 'react'

export default function Layout({
	children
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
			<div className="flex flex-col gap-4 w-full max-w-7xl mx-auto">
				{children}
			</div>
		</div>
	)
}
