'use client'

import Image from 'next/image'
import { JSX } from 'react'

import { subrubros } from '@/constants'
import { Subrubro } from '@/models'

export default function Subrubros(): JSX.Element {
	return (
		<div className="flex flex-col items-center space-y-3">
			<h3 className="text-base font-semibold text-gray-600">Services</h3>
			<div className="grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4 p-3">
				{subrubros.map((subrubro: Subrubro) => (
					<div key={subrubro.title}>
						<a
							href={subrubro.href}
							className="flex items-center gap-2 group hover:underline"
						>
							<Image
								src={subrubro.icon}
								alt={subrubro.title}
								width={60}
								height={60}
								className="shrink-0"
							/>
							{/* <h3 className="p-h2 text-base font-semibold group-hover:text-orange-600">
							{subrubro.title}
						</h3> */}
						</a>

						{/* <ul className="ml-10 mt-2 text-sm text-gray-700 space-y-1">
						{subrubro.items.map(item => (
							<li key={item} className="before:content-['·'] before:mr-1">
								{item}
							</li>
						))}
					</ul> */}
					</div>
				))}
			</div>
		</div>
	)
}
