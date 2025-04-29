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
		<div className="flex flex-col items-center space-y-8 p-6 w-full sm:h-96 overflow-y-auto">
			{/* Bio */}
			<div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-x-12 text-gray-300">
				<Image
					src={
						selectedProfessional.photoUrl
							? selectedProfessional.photoUrl
							: `https://dummyimage.com/80x80/eee/aaa.jpg&text=${selectedProfessional.name.charAt(0).toUpperCase()}`
					}
					alt={selectedProfessional.name}
					width={250}
					height={250}
					className="rounded-full object-cover"
				/>
				<div className="flex flex-col items-center space-y-3 w-full">
					<div className="flex flex-col sm:flex-row items-center sm:space-x-3">
						<h3 className="text-xl font-semibold">
							{selectedProfessional.name} {selectedProfessional.lastName}
						</h3>
						<StarRow stars={selectedProfessional.stars} />
					</div>
					<p className="text-center sm:text-start text-gray-700">
						{selectedProfessional.description}
					</p>
					<button
						className="btn max-w-max text-white bg-orange-500 hover:bg-orange-600"
						onClick={quote}
					>
						Quote
					</button>
				</div>
			</div>

			{/* Opinions */}
			<OpinionsSection professional={selectedProfessional} />
			{onBack && (
				<button
					onClick={() => onBack(false)}
					className="btn text-white bg-orange-500  hover:bg-orange-600"
				>
					← Back
				</button>
			)}
		</div>
	)
}
