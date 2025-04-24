import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'

import { Professional } from '@/models'

import OpinionsSection from '../OpinionSection'
import StarRow from '../StartRow'

type Props = {
	professional: Professional
	onBack?: (value: boolean) => void
}

export default function ProfessionalDetails(props: Props): JSX.Element {
	const { professional, onBack } = props

	return (
		<div className="flex flex-col items-center space-y-12 p-6 h-96 overflow-y-auto">
			<div className="flex items-center space-x-12 text-gray-300">
				<Image
					src={`https://dummyimage.com/120x120/eee/aaa.jpg&text=${professional.name.charAt(0).toUpperCase()}`}
					alt={professional.name}
					width={250}
					height={250}
					className="rounded-full object-cover"
				/>
				<div className="flex flex-col space-y-3 w-full">
					<div className="flex items-center space-x-3">
						<h3 className="text-xl font-semibold">{professional.name}</h3>
						<StarRow stars={professional.stars} />
					</div>
					<p className="text-gray-700">{professional.description}</p>
					<Link href={`request/${professional.id}`}>
						<button className="btn max-w-max text-white bg-orange-500 hover:bg-orange-600">
							Quote
						</button>
					</Link>
				</div>
			</div>

			<OpinionsSection professionalName={professional.name} />
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
