'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Player } from '@lottiefiles/react-lottie-player'
import { JSX, useRef, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

import { ANIMATIONS, categories, professionals } from '@/constants'
import { Category, Professional } from '@/models'
import Spinner from '@/shared/Spinner'

import ProfessionalDetails from '../ProfesionalDetails'
import StarRow from '../StartRow'

export default function Explore(): JSX.Element {
	const professionalsRef = useRef<HTMLDivElement | null>(null)

	const [flipped, setFlipped] = useState<boolean>(false)
	const [isFindingPartners, setIsFindingPartners] = useState<boolean>(false)

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	)

	const [selectedProfessional, setSelectedProfessional] =
		useState<Professional | null>(null)

	const handleSelectCategory = (category: Category): void => {
		setIsFindingPartners(true)
		setSelectedCategory(category)
		setTimeout(() => {
			setIsFindingPartners(false)

			if (window.innerWidth < 640 && professionalsRef.current) {
				professionalsRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}, 500)
	}

	return (
		<div className="flex flex-col space-y-3 sm:my-12 p-3 sm:p-9 w-full sm:w-6xl rounded-lg border-2 border-gray-200 bg-white shadow-md">
			<ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
				{/* Categories and Partners */}
				<div key="front" className="flex flex-col space-y-6">
					{/* Header */}
					<header className="flex flex-col items-center text-center space-y-3">
						<Link href="/register">
							<p className="text-xl text-orange-500 font-semibold">
								👷 What service do you need?
							</p>
						</Link>
						<p className="text-sm text-gray-600">
							Choose a category to find the best professionals in your area.
						</p>
					</header>

					{/* Container */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Left Side */}
						<div>
							{/* Categories */}
							<div className="flex flex-col space-y-1 p-3 sm:p-0 max-h-96 overflow-y-auto">
								{categories.map((category: Category, index: number) => (
									<button
										key={index}
										type="button"
										onClick={() => handleSelectCategory(category)}
										className={`btn btn-ghost flex w-full items-center justify-start space-x-3 py-12 text-sm hover:bg-gray-300 transition
                    ${
											selectedCategory?.title === category.title
												? 'bg-orange-500 text-white hover:bg-orange-600'
												: 'bg-gray-200'
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

						{/* Right Side */}
						<div className="flex justify-center items-center min-h-96">
							<div
								ref={professionalsRef}
								className="flex flex-col space-y-1 h-96 overflow-y-auto"
							>
								{/* GIF*/}
								{!selectedCategory && !isFindingPartners && (
									<div className="flex justify-center items-center p-3 max-w-max rounded-lg border-2 border-gray-200 bg-white shadow-md">
										<Player
											autoplay
											loop
											src={ANIMATIONS['sows-in-the-world']}
										/>
									</div>
								)}

								{/* Spinner */}
								{isFindingPartners && (
									<div className="flex justify-center items-center w-full h-full">
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
														className="p-3 rounded-lg border-2 border-gray-200 bg-white shadow-md hover:bg-orange-200 hover:cursor-pointer transition"
													>
														{/* Perfil */}
														<button
															className="flex items-center gap-3"
															onClick={() => {
																setSelectedProfessional(professional)
																setFlipped(true)
															}}
														>
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
														</button>

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
				</div>

				{/* Partner Details */}
				<div key="back" className={flipped ? 'flex' : 'hidden'}>
					{selectedProfessional && (
						<ProfessionalDetails
							professional={selectedProfessional}
							onBack={() => setFlipped(false)}
						/>
					)}
				</div>
			</ReactCardFlip>
		</div>
	)
}
