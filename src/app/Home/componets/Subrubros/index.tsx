// app/Home/components/Subrubros.tsx
'use client'

import Image from 'next/image'
import { JSX } from 'react'

import { subrubros } from '@/constants'

export type Subrubro = {
	title: string
	href: string
	icon: string
	items: string[]
}

export default function Subrubros(): JSX.Element {
	return (
		<div className="subrubros space-y-6">
			{subrubros.map(sr => (
				<div key={sr.title}>
					{/* Encabezado con ícono + link */}
					<a
						href={sr.href}
						className="flex items-center gap-2 group hover:underline"
					>
						<Image
							src={sr.icon}
							alt={sr.title}
							width={34}
							height={34}
							className="shrink-0"
						/>
						<h3 className="p-h2 text-base font-semibold group-hover:text-orange-600">
							{sr.title}
						</h3>
					</a>

					{/* Lista de servicios */}
					<ul className="subrubro__list ml-10 mt-2 text-sm text-gray-700 space-y-1">
						{sr.items.map(item => (
							<li key={item} className="before:content-['·'] before:mr-1">
								{item}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}
