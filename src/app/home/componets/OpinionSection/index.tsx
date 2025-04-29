import { JSX, useMemo } from 'react'
import Blockies from 'react-blockies'

import { Opinion, Professional } from '@/models'

import Coverage from '../Coverage'
import StarRow from '../StartRow'
import Subrubros from '../Subrubros'

type Props = {
	professional: Professional
}

export default function OpinionsSection(props: Props): JSX.Element {
	const { professional } = props

	const { average, distribution } = useMemo(() => {
		const total: number = professional.opinions.length || 1
		const sum: number = professional.opinions.reduce(
			(starts: number, opinion: Opinion) => starts + opinion.stars,
			0
		)
		const avg: number = +(sum / total).toFixed(1)

		const dist: number[] = [5, 4, 3, 2, 1].map(
			(star: number) =>
				professional.opinions.filter(
					(opinion: Opinion) => opinion.stars === star
				).length
		)

		return { average: avg, distribution: dist }
	}, [])

	return (
		<section className="flex flex-col space-y-6 w-full text-gray-600">
			<h3 className="text-center text-lg font-semibold">
				{professional.name}&#39;s opinions
			</h3>
			<div
				className={`flex flex-col sm:flex-row items-start space-y-12 ${professional.opinions.length === 0 ? 'sm:flex-col' : 'sm:flex-row'}`}
			>
				{/* Opinions */}
				<div
					className={`w-full sm:max-h-max overflow-y-auto space-y-6 ${professional.opinions.length === 0 ? 'h-0' : 'h-64'} `}
				>
					{professional.opinions.map((opinion: Opinion) => (
						<article
							key={opinion.id}
							className="space-y-3 border-b pb-4 w-full"
						>
							{/* avatar + autor + fecha + rating */}
							<header className="flex items-start gap-3 w-full">
								<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
									{/* <Image
										src={
											opinion.avatar ??
											`https://dummyimage.com/120x120/eee/aaa.jpg&text=${opinion.author.charAt(0).toUpperCase()}`
										}
										alt={opinion.author}
										width={40}
										height={40}
										className="object-cover"
									/> */}
									<Blockies
										seed={opinion.author}
										size={12}
										scale={3}
										className="rounded-full"
									/>
								</div>
								<div className="flex-1">
									<div className="">
										<a
											href={`https://alfajores.celoscan.io/address/${opinion.author}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-gray-700 hover:text-orange-500 transition-colors"
										>
											<p className="font-medium">
												{`${opinion.author.slice(0, 6)}…${opinion.author.slice(-6)}`}
											</p>
										</a>
										<p className="text-xs text-gray-500">{opinion.createdAt}</p>
									</div>
									<StarRow stars={opinion.stars} />
								</div>
							</header>

							{/* Comment */}
							<p className="text-sm text-gray-700">{opinion.comment}</p>

							{/* Badge */}
							{opinion.verified && (
								<span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
									✅ Cliente verificado
								</span>
							)}
						</article>
					))}
				</div>

				{/* Resumen */}
				<div className="flex flex-col items-center space-y-6 w-full sm:max-w-min">
					<div className="flex space-x-6 w-full">
						{/* Rating */}
						<div className="flex flex-col items-center">
							<p className="text-3xl font-bold">{average}/5</p>
							<StarRow stars={Math.round(average)} />
						</div>

						{/* Distribution */}
						<div className="w-full">
							<ul className="space-y-1 text-sm">
								{distribution.map((dist: number, index: number) => {
									const starValue: number = 5 - index
									const percentage: number = professional.opinions.length
										? Math.round((dist / professional.opinions.length) * 100)
										: 0
									return (
										<li key={starValue} className="flex items-center gap-2">
											<span className="w-4 text-yellow-400">★{starValue}</span>
											<span className="relative flex-1 h-2 bg-gray-200 rounded">
												<span
													style={{ width: `${percentage}%` }}
													className="absolute left-0 top-0 h-full bg-yellow-400 rounded"
												/>
											</span>
											<span className="w-10 text-right">{dist}</span>
										</li>
									)
								})}
							</ul>
						</div>
					</div>

					{/* Coverage */}
					<Coverage city={professional.city} />

					{/* Subrubros */}
					<Subrubros subrubros={professional.categories} />
				</div>
			</div>
		</section>
	)
}
