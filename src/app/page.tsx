'use client'

import Image from 'next/image'
import Link from 'next/link'
import { JSX, useState } from 'react'

import { categories, professionals } from '@/constants'
import { Category, Professional } from '@/models'
import Spinner from '@/shared/Spinner'

import Layout from '../shared/Layout'

export default function Home(): JSX.Element {
	const [isFindingPartners, setIsFindingPartners] = useState<boolean>(false)
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	)

	const handleSelectCategory = (category: Category): void => {
		setIsFindingPartners(true)
		setSelectedCategory(category)
		setTimeout(() => {
			setIsFindingPartners(false)
		}, 2000)
	}

	const StarRow = ({ stars }: { stars: number }) => (
		<ul className="flex gap-0.5 text-yellow-400">
			{[...Array(5)].map((_, i) => (
				<li key={i}>{i < stars ? '★' : '☆'}</li>
			))}
		</ul>
	)

	return (
		<Layout>
			<div>
				<div className="flex flex-col space-y-3 my-12 p-9 w-6xl rounded-lg border-2 border-gray-200 bg-white shadow-md">
					{/* Header */}
					<header className="space-y-3">
						<p className="text-xl text-orange-500 font-semibold">
							👷 What service do you need?
						</p>
						<p className="text-sm text-gray-600">
							Choose a category to find the best professionals in your area.
						</p>
					</header>

					{/* Body */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Categories */}
						<div>
							{/* categories */}
							<div className="flex flex-col space-y-1 h-96 overflow-y-auto">
								{categories.map((category: Category, index: number) => (
									<button
										key={index}
										type="button"
										onClick={() => handleSelectCategory(category)}
										className={`btn btn-ghost flex w-full items-center justify-start space-x-3 py-12 text-sm hover:bg-gray-600 transition
										${
											selectedCategory?.title === category.title
												? 'bg-orange-500 text-white hover:bg-orange-600'
												: 'bg-gray-500'
										}`}
									>
										<Image
											src={category.img}
											alt={category.label}
											width={44}
											height={44}
											className="rounded-full"
										/>
										<span className="font-bold">{category.title}</span>
									</button>
								))}
							</div>
						</div>

						<div className="min-h-96">
							{/* Spinner */}
							{isFindingPartners && (
								<div className="flex items-center justify-center h-full bg-gray-500">
									<Spinner />
								</div>
							)}
							{/*  Partners */}
							{selectedCategory && !isFindingPartners && (
								<div className="flex flex-col space-y-1 h-96 overflow-y-auto">
									<div className="flex flex-col space-y-3">
										{professionals.map(
											(professional: Professional, index: number) => (
												<article
													key={index}
													className="border-2 border-gray-200 rounded-lg p-3 bg-white shadow-md hover:bg-orange-200 hover:cursor-pointer transition"
												>
													{/* Perfil */}
													<div className="flex items-center gap-3">
														<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
															<Image
																src={`https://dummyimage.com/80x80/eee/aaa.jpg&text=${professional.name
																	.charAt(0)
																	.toUpperCase()}`}
																alt={professional.name}
																width={50}
																height={50}
																className="object-cover"
															/>
														</div>
														<div>
															<h3 className="text-sm text-gray-500 font-semibold leading-tight">
																{professional.name}
															</h3>
															<p className="text-xs text-gray-500">
																{professional.city}
															</p>
														</div>
													</div>

													{/* Rating */}
													<StarRow stars={professional.stars} />

													{/* Descripción */}
													<p className="text-sm text-gray-700 line-clamp-4">
														{professional.description}
													</p>
												</article>
											)
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

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
			</div>
		</Layout>
	)
}
