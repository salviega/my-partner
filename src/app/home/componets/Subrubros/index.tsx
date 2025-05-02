'use client'

import Image from 'next/image'
import { JSX } from 'react'

import { categories } from '@/constants'
import { Category } from '@/models'

type Props = {
	subrubros: Category[]
}

export default function Subrubros(props: Props): JSX.Element {
	const { subrubros } = props

	const selectedCategory: (Category | undefined)[] = subrubros.map(
		(subrubro: Category) => {
			const category = categories.find(
				(category: { title: string }) => category.title === subrubro.title
			)
			return category
		}
	)

	return (
		<div className="flex flex-col items-center space-y-3">
			<h3 className="text-base font-semibold text-gray-600">Services</h3>
			<div className="grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4 p-3">
				{selectedCategory.map((category, index: number) =>
					category ? (
						<div key={index}>
							<a
								href={category.href}
								className="flex items-center gap-2 group hover:underline"
							>
								<Image
									src={category.img}
									alt={category.title}
									width={60}
									height={60}
									className="shrink-0"
								/>
								{/* <h3 className="p-h2 text-base font-semibold group-hover:text-orange-600">
								{category.title}
							</h3> */}
							</a>

							{/* <ul className="ml-10 mt-2 text-sm text-gray-700 space-y-1">
							{category.items.map(item => (
								<li key={item} className="before:content-['·'] before:mr-1">
									{item}
								</li>
							))}
						</ul> */}
						</div>
					) : null
				)}
			</div>
		</div>
	)
}
