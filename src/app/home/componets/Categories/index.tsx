import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'

import { categories } from '@/constants'

export default function Categories(): JSX.Element {
	return (
		<section className="container mx-auto px-4 py-10">
			<h2 className="mb-8 text-center text-2xl font-semibold">
				Search your partner
			</h2>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
				{categories.map(({ title, href, label, img }) => (
					<Link
						key={href}
						href={href}
						title={title}
						className="flex flex-col items-center gap-2 rounded-lg p-4 transition hover:bg-gray-100"
					>
						<Image src={img} alt={label} width={44} height={44} />
						<span className="text-sm font-medium">{label}</span>
					</Link>
				))}
			</div>
		</section>
	)
}
