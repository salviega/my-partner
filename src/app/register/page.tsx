'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { JSX, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Address, zeroAddress } from 'viem'
import { z } from 'zod'

import {
	categories,
	DESCRIPTION_MAX,
	MAX_FILE_SIZE,
	VALID_FILE_TYPES
} from '@/constants'
import { fileToBase64, handleError } from '@/helpers'
import { Professional } from '@/models'
import { professionalsService } from '@/services/firebase/professionls'
import { storageServices } from '@/services/firebase/storage'
import { openWeatherService } from '@/services/open-weather/locations'
import { showAlert } from '@/shared/Alert'
import { useStore } from '@/store'

const schema = z.object({
	name: z.string().min(2, 'Name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	email: z.string().email('Invalid email'),
	description: z.string().min(10, 'Description must be at least 10 characters'),
	city: z.string().min(2, 'City is required'),
	categories: z
		.array(z.string().min(1, 'Category cannot be empty'))
		.min(1, 'Select at least one category'),
	photo: z
		.any()
		.refine(files => files?.length > 0, { message: 'You must upload a file' })
		.refine(
			files => {
				const file = files?.[0]
				return file && file.size <= MAX_FILE_SIZE
			},
			{ message: 'File size must be less than 5MB' }
		)
		.refine(
			files => {
				const file = files?.[0]
				return file && VALID_FILE_TYPES.includes(file.type)
			},
			{ message: 'Only .jpg, .png, .gif, .svg formats are supported' }
		)
})

type Form = z.infer<typeof schema>

export default function Register(): JSX.Element {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<Form>({
		resolver: zodResolver(schema)
	})

	const watchDescription = watch('description') || ''
	const watchPhoto = watch('photo') || null
	const { getLocation } = openWeatherService()

	// services
	const { saveProfessional } = professionalsService()
	const { uploadProfessionalPhoto } = storageServices()

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: (professional: Professional) => saveProfessional(professional)
	})

	// external hooks
	const address = useStore(state => state.address)

	// hooks
	const [loading, setLoading] = useState<boolean>(false)
	const [showDropdown, setShowDropdown] = useState<boolean>(false)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const [suggestions, setSuggestions] = useState<string[]>([])

	const selectedCategories = watch('categories') || []

	const isSelected = (value: string): boolean =>
		selectedCategories.includes(value)

	const toggleCategory = (selectedCategory: string): void => {
		const updated: string[] = isSelected(selectedCategory)
			? selectedCategories.filter(
					(category: string) => category !== selectedCategory
				)
			: [...selectedCategories, selectedCategory]

		setValue('categories', updated, { shouldValidate: true })
	}

	useEffect(() => {
		if (!watchPhoto || watchPhoto.length === 0) {
			setPreviewUrl(null)
			return
		}

		const file = watchPhoto[0]

		if (file) {
			const objectUrl = URL.createObjectURL(file)
			setPreviewUrl(objectUrl)

			return (): void => {
				URL.revokeObjectURL(objectUrl)
			}
		}
	}, [watchPhoto])

	const fetchLocations = debounce(async (query: string) => {
		if (query.length < 3) {
			setSuggestions([])
			setShowDropdown(false)
			return
		}

		setLoading(true)

		try {
			if (query.toLowerCase() === 'online') {
				const results: string = 'Online'
				setValue('city', results, { shouldValidate: true })
				setSuggestions([results])
				setShowDropdown(true)
				return
			}

			const results: string = await getLocation(query)

			if (results.length > 0) {
				setSuggestions([results])
				setShowDropdown(true)
			} else if (results === 'City not found') {
				setValue('city', results, { shouldValidate: true })
				setSuggestions([results])
				setShowDropdown(true)
			} else {
				setSuggestions([])
				setShowDropdown(false)
			}
		} catch (error) {
			setShowDropdown(false)
			setSuggestions([])
			handleError(error)
		} finally {
			setLoading(false)
		}
	}, 500)

	const handleLocationChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const query: string = event.target.value
		setValue('city', query, { shouldValidate: true })
		fetchLocations(query)
	}

	const handleSelectLocation = (location: string): void => {
		setValue('city', location, { shouldValidate: true })
		setSuggestions([])
		setShowDropdown(false)
	}

	const onSubmit = async (data: Form): Promise<void> => {
		try {
			const { photo, ...rest } = data

			const professionalAddress: Address = address
				? address
				: (zeroAddress as Address)

			const photoUrl: string = await fileToBase64(photo[0])

			const professional: Professional = {
				...rest,
				address: professionalAddress,
				photoUrl,
				stars: 5,
				opinions: []
			}

			await mutateAsync(professional)

			showAlert({
				message: 'Professional registered successfully',
				type: 'success'
			})
		} catch (error) {
			showAlert({
				message: `Error registering professional: ${handleError(error)}`,
				type: 'error'
			})
		}
	}

	if (error) {
		showAlert({
			message: `Error: ${handleError(error)}`,
			type: 'error'
		})
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 border-2 border-gray-200 bg-white p-6 rounded-lg shadow-md w-4xl mx-auto"
			>
				<h2 className="text-xl font-semibold text-orange-500">
					Professional information
				</h2>
				<div className="flex flex-col items-center space-y-3">
					<div className="flex justify-between items-center w-full">
						{/* Photo */}
						<div className="flex flex-col items-center w-full max-w-xs gap-4">
							{previewUrl ? (
								<div className="relative w-52 aspect-square rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
									<Image
										src={previewUrl}
										alt="Preview"
										fill
										className="object-cover"
									/>
								</div>
							) : (
								<div className="flex items-center justify-center w-52 h-52 rounded-full border-2 border-dashed border-gray-300 text-sm text-gray-400 text-center p-4">
									Preview
								</div>
							)}

							<label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-full">
								Upload photo
								<input
									type="file"
									accept="image/*"
									{...register('photo')}
									className="hidden"
									disabled={isPending || isSubmitting}
								/>
							</label>

							{!previewUrl && (
								<div className="text-center text-xs text-gray-500">
									<p>Max file size: 5MB</p>
									<p>Accepted formats: JPG, PNG, GIF, SVG</p>
								</div>
							)}

							{errors.photo && (
								<span className="text-red-500 text-sm text-center">
									{errors.photo.message as string}
								</span>
							)}
						</div>

						{/* Name, Last Name, Email, City, Description */}
						<div className="flex flex-col space-y-3 w-full">
							{/* Name */}
							<div>
								<input
									type="text"
									placeholder="Name"
									{...register('name')}
									className="input input-bordered w-full"
									disabled={isPending || isSubmitting}
								/>
								{errors.name && (
									<p className="text-red-500 text-sm">{errors.name.message}</p>
								)}
							</div>
							{/* Last Name */}
							<div>
								<input
									type="text"
									placeholder="Last Name"
									{...register('lastName')}
									className="input input-bordered w-full"
									disabled={isPending || isSubmitting}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm">
										{errors.lastName.message}
									</p>
								)}
							</div>
							{/* Email */}
							<div>
								<input
									type="email"
									placeholder="Email"
									{...register('email')}
									className="input input-bordered w-full"
									disabled={isPending || isSubmitting}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm">{errors.email.message}</p>
								)}
							</div>
							{/* City */}
							<div className="relative">
								<input
									type="text"
									placeholder="City"
									{...register('city', {
										onChange: handleLocationChange
									})}
									className="input input-bordered w-full"
									disabled={isPending || isSubmitting}
								/>
								{errors.city && (
									<p className="text-red-500 text-sm">{errors.city.message}</p>
								)}

								{/* Dropdown debajo del input */}
								{showDropdown && (
									<ul className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow z-10">
										{loading && (
											<li className="p-2 text-gray-500">Loading...</li>
										)}
										{suggestions.map((suggestion, index) => (
											<li
												key={index}
												onClick={() => handleSelectLocation(suggestion)}
												className="input input-bordered w-full"
											>
												{suggestion}
											</li>
										))}
									</ul>
								)}
							</div>
							{/* Description */}
							<div>
								<textarea
									rows={4}
									placeholder="Description"
									{...register('description')}
									className="textarea textarea-bordered w-full"
									disabled={isPending || isSubmitting}
								></textarea>
								{errors.description && (
									<p className="text-red-500 text-sm">
										{errors.description.message}
									</p>
								)}
								<p className="mt-1 mr-1 text-right text-base-300">
									{watchDescription.length}/{DESCRIPTION_MAX}
								</p>
							</div>
						</div>
					</div>

					{/* Categories */}
					<div>
						<h2 className="text-center text-xl font-semibold text-orange-500">
							Select Categories
						</h2>

						<div className="grid grid-cols-2 md:grid-cols-6 gap-4 h-96 overflow-y-auto">
							{categories.map(({ title, label, img, href }) => (
								<button
									type="button"
									key={href}
									onClick={() => toggleCategory(title)}
									className={`flex flex-col items-center gap-2 rounded-lg p-4 transition hover:bg-orange-100 border-2 ${
										isSelected(title)
											? 'border-orange-500 bg-orange-50'
											: 'border-transparent'
									}`}
									disabled={isPending}
								>
									<Image src={img} alt={label} width={44} height={44} />
									<span className="text-sm font-medium text-center text-gray-500">
										{label}
									</span>
								</button>
							))}
						</div>

						{errors.categories && (
							<p className="text-red-500 text-sm">
								{errors.categories.message}
							</p>
						)}
					</div>
				</div>

				<button
					type="submit"
					className="btn bg-orange-500 text-white hover:bg-orange-600"
					disabled={isPending}
				>
					{isPending ? 'Registering...' : 'Register'}
				</button>
			</form>
		</div>
	)
}
