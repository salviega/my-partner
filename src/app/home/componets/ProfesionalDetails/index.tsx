'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { JSX } from 'react'

import { Professional } from '@/models'
import { useStore } from '@/store'

import OpinionsSection from '../OpinionSection'
import StarRow from '../StartRow'

type Props = {
	professional: Professional
	onBack?: (value: boolean) => void
}

export default function ProfessionalDetails(props: Props): JSX.Element {
	const { professional: selectedProfessional, onBack } = props

	// store
	const setSelectedProfessional = useStore(
		state => state.setSelectedProfessional
	)

	// hooks
	const router = useRouter()

	const quote = (): void => {
		setSelectedProfessional(selectedProfessional)
		router.push(`/console/request/${selectedProfessional.id}`)
	}

	return (
		<div className="flex flex-col items-center space-y-8 p-4 md:p-6 w-full overflow-y-auto max-w-4xl mx-auto">
			{/* Bio */}
			<div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 w-full">
				<div className="flex-shrink-0">
					<div className="avatar size-[180px] w-[180px] h-[180px] rounded-full overflow-hidden bg-gray-100">
						<Image
							src={
								selectedProfessional.photoUrl
									? selectedProfessional.photoUrl
									: `https://dummyimage.com/180x180/eee/aaa.jpg&text=${selectedProfessional.name.charAt(0).toUpperCase()}`
							}
							alt={selectedProfessional.name}
							width={180}
							height={180}
							className="rounded-full object-cover shadow-md border-2 border-gray-200"
						/>
					</div>
				</div>

				<div className="flex flex-col items-center md:items-start space-y-4 w-full">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-2">
						<h3 className="text-2xl font-semibold text-gray-800">
							{selectedProfessional.name} {selectedProfessional.lastName}
						</h3>
						<StarRow stars={selectedProfessional.stars} />
					</div>
					<p className="text-center md:text-left text-gray-600">
						{selectedProfessional.description}
					</p>
					<button
						className="btn max-w-max text-white bg-orange-500 hover:bg-orange-600 shadow-sm transition-colors"
						onClick={quote}
					>
						Quote
					</button>
				</div>
			</div>

			{/* Opinions */}
			<div className="w-full">
				<OpinionsSection professional={selectedProfessional} />
			</div>

			{onBack && (
				<div className="w-full flex justify-center md:justify-start pt-2">
					<button
						onClick={() => onBack(false)}
						className="btn text-white bg-orange-500 hover:bg-orange-600 flex items-center gap-2 transition-colors"
					>
						<span>←</span> Back
					</button>
				</div>
			)}
		</div>
	)
}
