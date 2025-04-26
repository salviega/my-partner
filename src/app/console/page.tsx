'use client'

import { JSX } from 'react'

export default function Chat(): JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold">Console</h1>
			<p className="mt-4 text-gray-600">This is the console page.</p>
		</div>
	)
}
