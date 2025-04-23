'use client'

import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { JSX, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { categories, professionals } from '@/constants'
import { Category } from '@/models'

import Layout from '../shared/Layout'

const subCategorias = [
	{ id: '5e7cd0099c2b3f053dac2093', label: 'Entrenador personal' },
	{ id: '5e7cd1489c2b3f053dac2094', label: 'Asesor de nutrición' },
	{ id: '5e7cdca59c2b3f053dac2095', label: 'Mindfulness' }
]

const schema = z.object({
	categoria: z.string().min(1, 'Selecciona una categoría'),
	subCategoria: z.string().min(1, 'Selecciona una sub‑categoría'),
	titulo: z.string().min(4, 'Mínimo 4 caracteres'),
	descripcion: z.string().min(10, 'Mínimo 10 caracteres'),
	ubicacion: z.string().min(3, 'Indica la ubicación')
})

type FormData = z.infer<typeof schema>

export default function Home(): JSX.Element {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	})

	const [fotos, setFotos] = useState<File[]>([])
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	)

	const onSubmit = (data: FormData): void => {
		console.log(data, fotos)
		reset()
		setFotos([])
	}

	const handleSelectCategory = (category: Category): void => {
		setSelectedCategory(category)
		console.log('Selected category:', category)
	}

	const StarRow = ({ stars }: { stars: number }) => (
		<ul className="flex gap-0.5 text-yellow-400">
			{[...Array(5)].map((_, i) => (
				<li key={i}>{i < stars ? '★' : '☆'}</li>
			))}
		</ul>
	)

	return (
		<Layout>
			<div className="h-full">
				<article
					id="formulario-solicitud"
					className="flex flex-col gap-8 w-xl h-full border-2 border-gray-200 rounded-lg p-6 mx-auto my-10 bg-white shadow-md"
				>
					{/* ---------- Cabecera ---------- */}
					<header className="space-y-2">
						<p className="text-xl font-semibold">
							👷 ¿Qué servicio necesitas?‍
						</p>
						<p className="text-sm text-gray-600">
							¡Chatea con 3 profesionales al momento y consigue tu presupuesto
							ideal! No compartimos tu dirección ni teléfono con nadie.
						</p>
					</header>

					{/* ---------- Formulario ---------- */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
						noValidate
					>
						{/* Categoría + sub‑categoría */}
						<p className="text-sm text-gray-600">
							Select a category that best fits your needs
						</p>
						<div className="flex flex-col space-y-1 h-96 overflow-y-auto">
							{/* Categoría */}
							{categories.map((category: Category, index: number) => (
								<button
									key={index}
									type="button"
									onClick={() => handleSelectCategory(category)}
									className={`btn btn-ghost flex w-full items-center justify-start space-x-3 py-12 text-sm
										${
											selectedCategory?.title === category.title
												? 'bg-orange-500 text-white hover:bg-orange-600'
												: 'bg-base-100'
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

							{/* Subcategoría */}
							<div className="flex flex-col gap-1">
								<label htmlFor="subCategoria" className="font-medium">
									Subcategoría
								</label>
								<select
									id="subCategoria"
									{...register('subCategoria')}
									className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
								>
									<option value="">— Selecciona —</option>
									{subCategorias.map(sc => (
										<option key={sc.id} value={sc.id}>
											{sc.label}
										</option>
									))}
								</select>
								{errors.subCategoria && (
									<span className="text-red-500 text-xs">
										{errors.subCategoria.message}
									</span>
								)}
							</div>
						</div>

						{/* Título */}
						<div className="flex flex-col gap-1">
							<label htmlFor="titulo" className="font-medium">
								Título
							</label>
							<input
								id="titulo"
								type="text"
								placeholder="Ej. Filtraciones en la cocina"
								{...register('titulo')}
								className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							{errors.titulo && (
								<span className="text-red-500 text-xs">
									{errors.titulo.message}
								</span>
							)}
						</div>

						{/* Descripción + fotos */}
						<div className="flex flex-col gap-2">
							<label htmlFor="descripcion" className="font-medium">
								Descripción de servicio
							</label>
							<textarea
								id="descripcion"
								rows={3}
								placeholder="Ej. Tengo una filtración en la cocina que necesito reparar..."
								{...register('descripcion')}
								className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
							/>
							{errors.descripcion && (
								<span className="text-red-500 text-xs">
									{errors.descripcion.message}
								</span>
							)}

							{/* Selector de fotos */}
							<label className="inline-flex items-center gap-2 cursor-pointer text-primary-600 hover:underline">
								Añadir fotos
								<input
									type="file"
									multiple
									hidden
									onChange={e => setFotos(Array.from(e.target.files ?? []))}
								/>
								{fotos.length > 0 && (
									<span className="text-sm text-gray-500">
										({fotos.length})
									</span>
								)}
							</label>
						</div>

						{/* Ubicación */}
						<div className="flex flex-col gap-1">
							<label htmlFor="ubicacion" className="font-medium">
								Ubicación
							</label>
							<input
								id="ubicacion"
								type="text"
								placeholder="Ej. ubicación del trabajo a realizar"
								{...register('ubicacion')}
								className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							{errors.ubicacion && (
								<span className="text-red-500 text-xs">
									{errors.ubicacion.message}
								</span>
							)}
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full bg-primary-600 hover:bg-primary-700 text-indigo-300 font-medium py-2 rounded-md transition-colors"
						>
							Pedir presupuesto&nbsp;➝
						</button>
					</form>
				</article>

				<section className="container mx-auto px-4 py-10">
					<h2 className="mb-8 text-center text-2xl font-semibold">
						Search your partner
					</h2>

					<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
						{categories.map(({ title, href, label, img }) => (
							<Link
								key={href}
								href={href}
								title={title}
								className="flex flex-col items-center gap-2 rounded-lg p-4 transition hover:bg-gray-100"
							>
								<Image src={img} alt={label} width={44} height={44} />
								<span className="text-sm font-medium">{label}</span>
							</Link>
						))}
					</div>
				</section>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{professionals.map(p => (
						<article
							key={p.id}
							className="border-2 border-gray-200 rounded-lg p-6 mx-auto my-10 bg-white shadow-md"
						>
							{/* Perfil */}
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
									<Image
										src={`https://dummyimage.com/80x80/eee/aaa.jpg&text=${p.name
											.charAt(0)
											.toUpperCase()}`}
										alt={p.name}
										width={50}
										height={50}
										className="object-cover"
									/>
								</div>
								<div>
									<h3 className="font-semibold text-sm leading-tight">
										{p.name}
									</h3>
									<p className="text-xs text-gray-500">{p.city}</p>
								</div>
							</div>

							{/* Rating */}
							<StarRow stars={p.stars} />

							{/* Descripción */}
							<p className="text-sm text-gray-700 line-clamp-4">
								{p.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</Layout>
	)
}
