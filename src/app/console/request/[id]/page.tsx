'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
// crypto is not needed, we'll use window.crypto instead
import { debounce } from 'lodash'
import { JSX, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Address, zeroAddress } from 'viem'
import { z } from 'zod'

import StarRow from '@/app/home/componets/StartRow'
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
import Layout from '@/shared/Layout'
import { useStore } from '@/store'
import { saveLocalStorage } from '@/utils/store.localstorage'

import ChatComponent from '../../chats/components/Chat'
import { useChatSocket } from '../../chats/hooks/useSocket'

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

export default function Chat(): JSX.Element {
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
	const {
		/* uploadProfessionalPhoto */
	} = storageServices()

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: (professional: Professional) => saveProfessional(professional)
	})

	// external hooks
	const address = useStore(state => state.address)

	// hooks
	const [_loading, setLoading] = useState<boolean>(false)
	const [_showDropdown, setShowDropdown] = useState<boolean>(false)
	const [_previewUrl, setPreviewUrl] = useState<string | null>(null)

	const [_suggestions, setSuggestions] = useState<string[]>([])

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

	const _handleLocationChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const query: string = event.target.value
		setValue('city', query, { shouldValidate: true })
		fetchLocations(query)
	}

	const _handleSelectLocation = (location: string): void => {
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

	const professional: Professional = {
		id: 1,
		name: 'John Doe',
		city: 'New York',
		stars: 5,
		description:
			'Experienced professional offering top-quality services in the city.',
		photoUrl: 'https://dummyimage.com/600x400/000/fff&text=John+Doe',
		address: zeroAddress as Address,
		opinions: [
			{
				id: 1,
				author: 'Alice Smith',
				date: '2025-04-25',
				comment: 'Excellent service, very professional!',
				avatar: 'https://dummyimage.com/80x80/ccc/000&text=A',
				verified: true
			},
			{
				id: 2,
				author: 'Bob Johnson',
				date: '2025-04-20',
				comment: 'Highly recommended.',
				avatar: 'https://dummyimage.com/80x80/ccc/000&text=B',
				verified: false
			}
		]
	}
	const [requestChat, setRequestChat] = useState(false)
	const [chatId, setChatId] = useState('')
	const [paymentRequest, setPaymentRequest] = useState<{
		amount: string
		currency: string
		requester: string
	} | null>(null)

	const { socket } = useChatSocket(
		requestChat || chatId !== '' ? chatId : '',
		'0x1234567890abcdef1234567890abcdef12345678',
		'0xabcdef1234567890abcdef1234567890abcdef12'
	)

	useEffect(() => {
		socket?.on('payment_requested', data => {
			setPaymentRequest(data)
		})

		return () => {
			socket?.off('payment_requested')
		}
	}, [socket])

	//use effect para verificar si el chatId existe en el localStorage
	useEffect(() => {
		const storedChatId = localStorage.getItem('chatId')
		if (storedChatId) {
			setChatId(storedChatId)
			setRequestChat(true)
		}
	}, [])
	const _handleRequestChat = (): void => {
		const uuid = crypto.randomUUID()
		setChatId(uuid)
		setRequestChat(true)
		saveLocalStorage('chatId', uuid)
	}

	return (
		<Layout>
			<div className="grid grid-cols-1 md:grid-cols-2">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col space-y-4 border-2 border-gray-200 bg-white p-6 rounded-2xl shadow-md w-full h-full"
				>
					<h2 className="text-xl font-semibold text-orange-500">
						Professional information
					</h2>
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
						</div>
					</div>
					<h2 className="text-lg font-semibold text-orange-500">
						About the project
					</h2>
					<div className="flex flex-col items-center space-y-3">
						<div className="flex justify-between items-center w-full">
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
										<p className="text-red-500 text-sm">
											{errors.name.message}
										</p>
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

							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-52 overflow-y-auto">
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
						//this function is not needed, i use for test
						onClick={_handleRequestChat}
					>
						{isPending ? 'Registering...' : 'Request service'}
					</button>
				</form>
				<div className="flex-1 h-auto border-2 border-gray-200 bg-white p-6 rounded-2xl shadow-md ml-4">
					<h2 className="text-xl font-semibold text-orange-500 mb-4">
						Chat with Professional
					</h2>
					<div className="w-full h-[calc(100%-2rem)] overflow-hidden">
						{isPending ? (
							<div className="flex justify-center items-center h-full">
								<span className="loading loading-spinner loading-lg text-orange-500"></span>
							</div>
						) : (
							<>
								{!requestChat ? (
									<h2 className="text-lg font-semibold text-gray-500 mb-4">
										First request a service to start a chat with the
										professional
									</h2>
								) : (
									<>
										<ChatComponent
											chatId={chatId}
											currentUserId="0x1234567890abcdef1234567890abcdef12345678"
											secondUserId="0xabcdef1234567890abcdef1234567890abcdef12"
										/>
										{paymentRequest && (
											<div className="mt-4 bg-white p-4 rounded-2xl shadow-2xl border broder-gray-200">
												<h2 className="text-lg font-semibold text-orange-500 mb-2">
													Payment Request
												</h2>
												<p className="text-gray-700 mb-3">
													<span className="font-medium">
														{paymentRequest.requester}
													</span>{' '}
													is requesting a payment of{' '}
													<span className="font-medium">
														{paymentRequest.amount} {paymentRequest.currency}
													</span>
												</p>
												<div className="flex justify-end gap-3">
													<button
														className="btn btn-sm border-gray-300 hover:bg-gray-100"
														onClick={() => setPaymentRequest(null)}
													>
														Decline
													</button>
													<button
														onClick={
															() =>
																setPaymentRequest(
																	null
																) /* Payment processing would go here */
														}
														onClick={() => console.log('Payment accepted')}
													>
														Accept Payment
													</button>
												</div>
											</div>
										)}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}
