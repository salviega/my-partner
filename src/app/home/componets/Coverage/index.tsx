'use client'

import Image from 'next/image'
import { JSX } from 'react'

type Props = {
	city: string
}

export default function Coverage(props: Props): JSX.Element {
	const { city } = props

	return (
		<section className="flex flex-col space-y-6">
			<div className="space-y-4">
				<h3 className="text-base font-semibold text-gray-600">
					Partner location: <span className="font-bold">{city}</span>
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

// 'use client'

// import Image from 'next/image'
// import { JSX } from 'react'

// type Props = {
// 	city: string
// }

// export default function Coverage(props: Props): JSX.Element {
// 	const { city } = props

// 	const mapUrl = [
// 		'https://maps.googleapis.com/maps/api/staticmap',
// 		`?center=${encodeURIComponent(city)}`,
// 		'&zoom=12', // nivel de zoom
// 		'&size=600x300', // ancho x alto en píxeles
// 		'&maptype=roadmap', // roadmap, satellite, hybrid...
// 		`&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
// 	].join('')

// 	return (
// 		<section className="flex flex-col space-y-6">
// 			<div className="space-y-4">
// 				<h3 className="text-base font-semibold text-gray-600">
// 					Radio de cobertura: <span className="font-bold">{city}</span>
// 				</h3>

// 				<Image
// 					src={mapUrl}
// 					alt={`${city} map`}
// 					width={0}
// 					height={0}
// 					className="w-full object-cover rounded-lg shadow"
// 				/>
// 			</div>
// 		</section>
// 	)
// }
