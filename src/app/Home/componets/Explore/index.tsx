'use client'

import Image from 'next/image'
// import { Player } from '@lottiefiles/react-lottie-player'
import { JSX, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

import { categories, professionals } from '@/constants'
import { Category, Professional } from '@/models'
import Spinner from '@/shared/Spinner'

import ProfessionalDetails from '../ProfesionalDetails'
import StarRow from '../StartRow'

export default function Explore(): JSX.Element {
	const [isFindingPartners, setIsFindingPartners] = useState<boolean>(false)
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	)
	const [selectedPro, setSelectedPro] = useState<Professional | null>(null)
	const [flipped, setFlipped] = useState<boolean>(false)

	const handleSelectCategory = (category: Category): void => {
		setIsFindingPartners(true)
		setSelectedCategory(category)
		setTimeout(() => {
			setIsFindingPartners(false)
		}, 500)
	}

	return (
		<div className="flex flex-col space-y-3 my-12 p-9 w-6xl rounded-lg border-2 border-gray-200 bg-white shadow-md">
			<ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
				{/* Categories and Partners */}
				<div key="front">
					{/* Header */}
					<header className="space-y-3">
						<p className="text-xl text-orange-500 font-semibold">
							👷 What service do you need?
						</p>
						<p className="text-sm text-gray-600">
							Choose a category to find the best professionals in your area.
						</p>
					</header>

					{/* Container */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Left Side */}
						<div>
							{/* Categories */}
							<div className="flex flex-col space-y-1 max-h-96 overflow-y-auto">
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

						{/* Right Side */}
						<div className="flex justify-center items-center min-h-96">
							{/* GIF*/}
							{!selectedCategory && !isFindingPartners && (
								<div className="flex justify-center items-center p-3 max-w-max">
									{/* <Player
										autoplay
										loop
										src={ANIMATIONS['sows-in-the-world']}
										style={{
											height: '400px',
											width: '400px'
										}}
									/> */}
								</div>
							)}

							{/* Spinner */}
							{isFindingPartners && (
								<div className="flex mx-auto bg-gray-500">
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
													<button
														className="flex items-center gap-3"
														onClick={() => {
															setSelectedPro(professional) // guarda el partner
															setFlipped(true) // gira la carta
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

				{/* Partner Details */}
				<div key="back">
					{selectedPro && (
						<ProfessionalDetails
							professional={selectedPro}
							onBack={() => setFlipped(false)}
						/>
					)}
				</div>
			</ReactCardFlip>
		</div>
	)
}
