import Image from 'next/image'
import { JSX, useMemo, useState } from 'react'

import { opinions } from '@/constants'

import Coverage from '../Coverage'
import StarRow from '../StartRow'
import Subrubros from '../Subrubros'

type Props = {
	professionalName: string
}

export default function OpinionsSection(props: Props): JSX.Element {
	const { professionalName } = props
	const [showAll, setShowAll] = useState(false)

	/** ─── Estadísticas rápidas ─────────────────────────────────────────────────── */
	const { average, distribution } = useMemo(() => {
		const total = opinions.length || 1
		const sum = opinions.reduce((s, o) => s + o.stars, 0)
		const avg = +(sum / total).toFixed(1)

		// array [5, 4, 3, 2, 1] con número de opiniones por estrella
		const dist = [5, 4, 3, 2, 1].map(
			star => opinions.filter(o => o.stars === star).length
		)
		return { average: avg, distribution: dist }
	}, [opinions])

	/** Opiniones visibles: 1 si hay >1 y no se expandió */
	const visible = showAll ? opinions : opinions.slice(0, 1)

	return (
		<section className="space-y-6 w-full text-gray-600">
			<h3 className="text-lg font-semibold">Opiniones de {professionalName}</h3>
			<div className="flex justify-around items-start">
				{/* Opiniones */}
				<div className="space-y-6">
					{opinions.map(op => (
						<article key={op.id} className="space-y-3 border-b pb-4">
							{/* avatar + autor + fecha + rating */}
							<header className="flex items-start gap-3">
								<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
									<Image
										src={
											op.avatar ??
											`https://dummyimage.com/120x120/eee/aaa.jpg&text=${op.author.charAt(0).toUpperCase()}`
										}
										alt={op.author}
										width={40}
										height={40}
										className="object-cover"
									/>
								</div>
								<div className="flex-1">
									<p className="font-medium leading-tight">{op.author}</p>
									<p className="text-xs text-gray-500">{op.date}</p>
								</div>
								<StarRow stars={op.stars} />
							</header>

							{/* comentario */}
							<p className="text-sm text-gray-700">{op.comment}</p>

							{/* badge */}
							{op.verified && (
								<span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
									✅ Cliente verificado
								</span>
							)}
						</article>
					))}
				</div>

				<div className="flex flex-col items-center space-y-6">
					{/* Resumen */}
					<div className="basis-1/2 flex justify-end items-start space-x-12">
						<div className="flex flex-col items-center">
							<p className="text-3xl font-bold">{average}/5</p>
							<StarRow stars={Math.round(average)} />
						</div>

						<div className="basis-1/2">
							<ul className="space-y-1 text-sm">
								{distribution.map((qty, idx) => {
									const starValue = 5 - idx
									const pct = opinions.length
										? Math.round((qty / opinions.length) * 100)
										: 0
									return (
										<li key={starValue} className="flex items-center gap-2">
											<span className="w-4 text-yellow-400">★{starValue}</span>
											<span className="relative flex-1 h-2 bg-gray-200 rounded">
												<span
													style={{ width: `${pct}%` }}
													className="absolute left-0 top-0 h-full bg-yellow-400 rounded"
												/>
											</span>
											<span className="w-10 text-right">{qty}</span>
										</li>
									)
								})}
							</ul>
						</div>
					</div>

					{/* Coverage */}
					<Coverage coverageKm={5} />

					{/* Subrubros */}
					<Subrubros />
				</div>
			</div>
		</section>
	)
}
