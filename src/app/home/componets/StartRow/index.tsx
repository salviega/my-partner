import { JSX } from 'react'

export default function StarRow({ stars }: { stars: number }): JSX.Element {
	return (
		<ul className="flex gap-0.5 text-yellow-400">
			{[...Array(5)].map((_, index: number) => (
				<li key={index}>{index < stars ? '★' : '☆'}</li>
			))}
		</ul>
	)
}
