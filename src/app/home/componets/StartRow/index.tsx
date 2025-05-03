'use client'
import { JSX } from 'react'

type Props = {
	stars: number
}

export default function StarRow(props: Props): JSX.Element {
	const { stars } = props

	return (
		<ul className="flex gap-0.5 text-yellow-400">
			{[...Array(5)].map((_, index: number) => (
				<li key={index}>{index < stars ? '★' : '☆'}</li>
			))}
		</ul>
	)
}
