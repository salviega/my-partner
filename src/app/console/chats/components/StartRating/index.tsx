'use client'

import { JSX, useState } from 'react'

interface Props {
	value: number
	onChange: (rating: number) => void
	size?: string
}

export default function StarRating(props: Props): JSX.Element {
	const { value, onChange, size = 'text-2xl' } = props

	const [hovered, setHovered] = useState<number | null>(null)

	const active: number = hovered ?? value

	return (
		<ul className={`flex gap-1 select-none ${size}`}>
			{[1, 2, 3, 4, 5].map((index: number) => (
				<li
					key={index}
					className={`cursor-pointer transition-colors ${
						index <= active ? 'text-orange-500' : 'text-gray-300'
					}`}
					onMouseEnter={() => setHovered(index)}
					onMouseLeave={() => setHovered(null)}
					onClick={() => onChange(index)}
				>
					★
				</li>
			))}
		</ul>
	)
}
