'use client'

import Image from 'next/image'
import { JSX } from 'react'

/* ── Tipos ──────────────────────────────────────────────────────────────── */
export type SubRubro = {
	title: string
	href: string
	icon: string
	items: string[]
}

type Props = {
	coverageKm: number
}

/* ── Componente ─────────────────────────────────────────────────────────── */
export default function Coverage({ coverageKm }: Props): JSX.Element {
	return (
		<section className="flex flex-col space-y-6">
			{/* ───────── Radio de cobertura + mapa ───────── */}
			<div className="space-y-4">
				<h3 className="text-base font-semibold text-gray-600">
					Radio de cobertura: <span className="font-bold">{coverageKm} km</span>
				</h3>

				{/* Mock del mapa */}
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
