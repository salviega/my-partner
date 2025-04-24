'use client'

import Image from 'next/image'
import { JSX } from 'react'

type Props = {
	coverageKm: number
}

export default function Coverage(props: Props): JSX.Element {
	const { coverageKm } = props

	return (
		<section className="flex flex-col space-y-6">
			<div className="space-y-4">
				<h3 className="text-base font-semibold text-gray-600">
					Radio de cobertura: <span className="font-bold">{coverageKm} km</span>
				</h3>

				<Image
					src="https://maps.gstatic.com/tactile/pane/default_geocode-2x.png"
					alt="Mapa de cobertura"
					width={0}
					height={0}
					className="w-full object-cover"
				/>
			</div>
		</section>
	)
}
