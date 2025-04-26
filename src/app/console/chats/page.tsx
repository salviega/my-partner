'use client'

import { JSX } from 'react'

import Layout from '@/shared/Layout'

export default function Chats(): JSX.Element {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Chats</h1>
				<p className="mt-4 text-gray-600">This is the chats page.</p>
			</div>
		</Layout>
	)
}
