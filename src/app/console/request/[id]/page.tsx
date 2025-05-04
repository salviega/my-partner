'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { JSX, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Address } from 'viem'
import { z } from 'zod'

import StarRow from '@/app/home/componets/StartRow'
import { DESCRIPTION_MAX, IMAGES, stablecoins } from '@/constants'
import { handleError } from '@/helpers'
import { Stablecoin } from '@/models'
import Announcement from '@/shared/Announcement'
import Layout from '@/shared/Layout'
import Modal from '@/shared/Modal'
import Spinner from '@/shared/Spinner'
import { useStore } from '@/store'
import { usePaymentRequestStore } from '@/store/usePaymenRequest'

import ChatComponent from '../../chats/components/Chat'
import { useChatSocket } from '../../chats/hooks/useSocket'

const schema = z.object({
	projectTitle: z.string().min(2, 'Project title is required'),
	projectDescription: z
		.string()
		.min(10, 'Description must be at least 10 characters'),
	category: z.string().min(1, 'Category is required')
})

type Form = z.infer<typeof schema>

export default function Chat(): JSX.Element {
	const { paymentRequest, clearPaymentRequest } = usePaymentRequestStore()
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<Form>({
		resolver: zodResolver(schema)
	})

	const watchDescription = watch('projectDescription') || ''
	const selectedCategory = watch('category') || ''

	// store
	const isSettingProfessional = useStore(state => state.isSettingProfessional)

	const isSettingSelectedProfessional = useStore(
		state => state.isSettingSelectedProfessional
	)

	const isSettingUser = useStore(state => state.isSettingUser)
	const professional = useStore(state => state.professional)
	const selectedProfessional = useStore(state => state.selectedProfessional)
	const user = useStore(state => state.user)

	const getUser = useStore(state => state.getUser)
	const getProfessional = useStore(state => state.getProfessionalByAddress)
	const getSelectedProfessionalById = useStore(
		state => state.getSelectedProfessionalById
	)

	// hooks
	const { id } = useParams()
	const [chatId, setChatId] = useState<string>('')
	const [checkingMiniPay, setCheckingMiniPay] = useState<boolean>(true)
	const [requestChat, setRequestChat] = useState<boolean>(false)
	const [selectedToken, setSelectedToken] = useState<Stablecoin | null>(null)

	const isSelected = (value: string): boolean => selectedCategory === value

	const handleSelectCategory = (value: string): void => {
		setValue('category', value, { shouldValidate: true })
	}
	const socketReady =
		requestChat && chatId && selectedProfessional?.address && user?.address

	const { sendMessage, socket } = useChatSocket(
		socketReady ? chatId : '',
		socketReady ? selectedProfessional?.address : '',
		socketReady ? user?.address : ''
	)

	useEffect(() => {
		async function checkMiniPay(): Promise<void> {
			if (typeof window !== 'undefined' && window.ethereum?.isMiniPay) {
				if (!user) {
					try {
						const accounts = await window.ethereum.request({
							method: 'eth_requestAccounts'
						})

						const accountList = accounts as Address[]
						getUser(accountList[0])
						// alert(`accountList[0]: ${accountList[0]}`)
						console.log('accountList', accountList[0])
						getProfessional(accountList[0])
					} catch (error) {
						console.error('Error requesting accounts:', error)
					}
				}

				if (user && !professional) {
					getProfessional(user.address)
				}
			}

			// Hardcoded address for testing
			// getUser(zeroAddress)
			// getProfessional(zeroAddress)

			setCheckingMiniPay(false)
		}

		// Only check if address is not set yet
		if (!user) {
			checkMiniPay()
		} else {
			setCheckingMiniPay(false)
		}
	}, [professional, user, getProfessional, getUser])

	useEffect(() => {
		// If socket connection fails, clear localStorage and reset state
		if (requestChat && socket === null && chatId !== '') {
			const connectionTimeout = setTimeout(() => {
				console.log(
					'Failed to establish chat connection, clearing localStorage'
				)
				localStorage.removeItem('chatId')
				setChatId('')
				setRequestChat(false)
				toast.error('Could not connect to chat. Please try again.')
			}, 5000) // Give it 5 seconds to connect

			return (): void => clearTimeout(connectionTimeout)
		}
	}, [requestChat, socket, chatId])

	// You can also add this helper function somewhere in your component
	const handleDeleteChat = () => {
		// const chatId = `${selectedProfessional?.address}-${user?.address}`
		// if (!chatId) {
		// 	toast.error('No chat ID found in localStorage')
		// 	return
		// }
		// deleteChatService(chatId as string)
		// 	.then(() => {
		// 		toast.success('Chat deleted successfully')
		// 		localStorage.removeItem('chatId')
		// 		setChatId('')
		// 		setRequestChat(false)
		// 	})
		// 	.catch(error => {
		// 		toast.error('Error deleting chat')
		// 		// Handle error if needed
		// 	})
		// localStorage.removeItem('chatId')
		// setChatId('')
		// setRequestChat(false)
	}

	useEffect(() => {
		if (!selectedProfessional && id && typeof id === 'string') {
			getSelectedProfessionalById(id)
		}
	}, [id, selectedProfessional, getSelectedProfessionalById])

	//use effect para verificar si el chatId existe en el localStorage
	// useEffect(() => {
	// 	const storedChatId = localStorage.getItem('chatId')
	// 	if (storedChatId) {
	// 		setChatId(storedChatId)
	// 		setRequestChat(true)
	// 	}
	// }, [])
	// alert(`user address${user?.address}`)
	// alert(`professional address${professional?.address}`)

	// useEffect(() => {
	// 	if (!socket) return

	// 	const handlePaymentRequest = (data: {
	// 		amount: string
	// 		currency: string
	// 		requester: string
	// 	}): void => {
	// 		console.log('🔔 Pago solicitado recibido:', data)
	// 		setPaymentRequest(data)
	// 	}

	// 	socket.on('payment_requested', handlePaymentRequest)

	// 	return (): void => {
	// 		socket.off('payment_requested', handlePaymentRequest)
	// 	}
	// }, [socket])
	useEffect(() => {
		setSelectedToken(
			stablecoins.find(
				stablecoin => stablecoin.name === paymentRequest?.currency
			) || null
		)
	}, [paymentRequest])

	const [projectDetails, setProjectDetails] = useState<Form | null>(null)

	const onSubmit = async (data: Form): Promise<void> => {
		try {
			// obtener la info
			if (!user || !selectedProfessional) {
				toast.error('User or professional information missing')
				return
			}
			setRequestChat(true)

			setProjectDetails(data)
		} catch (error) {
			toast.error(`Error: ${handleError(error)}`)
		}
	}

	useEffect(() => {
		if (projectDetails && socket && requestChat) {
			const initialMessage = `
      Hello ${professional?.name}! 👋
      I want to quote you for a job I need done:

      Project: ${projectDetails.projectTitle}
      Description: ${projectDetails.projectDescription}
      Category: ${projectDetails.category}

      How much would it cost?
      Thanks!
      `.trim()
			setTimeout(() => {
				sendMessage(initialMessage)
			}, 5000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectDetails, socket, requestChat, socketReady])

	if (
		checkingMiniPay ||
		isSettingUser ||
		isSettingProfessional ||
		isSettingSelectedProfessional
	)
		return (
			<div className="flex justify-center items-center w-full h-screen">
				<Spinner />
			</div>
		)

	// const handleSelectToken = (token: Stablecoin): void => {
	// 	setSelectedToken(token)
	// }

	if (!isSettingUser && !user) return <Announcement />

	if (!isSettingSelectedProfessional && !selectedProfessional)
		return <Announcement message="My partner isn't already mine" />

	return (
		<Layout>
			<div
				className={`w-full ${!requestChat && 'grid grid-cols-1 lg:grid-cols-2'} gap-10`}
			>
				{!requestChat && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col space-y-4 border-2 border-gray-200 bg-white p-6 rounded-2xl shadow-md w-full h-full"
					>
						{/* Profesional info */}

						{selectedProfessional && (
							<div className="flex flex-col items-center space-y-5 w-full bg-orange-50 p-6 rounded-xl">
								<h2 className="text-xl font-semibold text-orange-500">
									Professional information
								</h2>
								<div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
									<div className="avatar">
										<div className="w-32 md:w-40 h-32 md:h-40 rounded-full ring ring-orange-200 ring-offset-2 shadow-md overflow-hidden">
											<Image
												src={
													selectedProfessional.photoUrl
														? selectedProfessional.photoUrl
														: `https://dummyimage.com/200x200/eee/aaa.jpg&text=${selectedProfessional.name.charAt(0).toUpperCase()}`
												}
												alt={selectedProfessional.name}
												width={200}
												height={200}
												className="object-cover w-full h-full"
											/>
										</div>
									</div>
									<div className="flex flex-col space-y-3 w-full">
										<div className="flex flex-col sm:flex-row sm:items-center gap-2">
											<h3 className="text-xl font-semibold text-center md:text-left">
												{selectedProfessional.name}{' '}
												{selectedProfessional.lastName}
											</h3>
											<div className="w-full flex justify-center items-center">
												<StarRow stars={selectedProfessional.stars} />
											</div>
										</div>
										<p className="text-gray-700 text-sm md:text-base text-center md:text-left">
											{selectedProfessional.description}
										</p>
									</div>
								</div>
								<h2 className="text-lg font-semibold text-orange-500 pt-2 border-t border-orange-200 w-full text-center md:text-left">
									About the project
								</h2>
							</div>
						)}

						{/* Form */}
						<div className="flex flex-col items-center space-y-3">
							<div className="flex justify-between items-center w-full">
								{/* Name, Last Name, Email, City, Description */}
								<div className="flex flex-col space-y-3 w-full">
									{/* Name */}
									<div>
										<input
											type="text"
											placeholder="Project title"
											{...register('projectTitle')}
											className="input input-bordered w-full"
											disabled={isSubmitting}
										/>
										{errors.projectTitle && (
											<p className="text-red-500 text-sm">
												{errors.projectTitle.message}
											</p>
										)}
									</div>

									{/* Description */}
									<div>
										<textarea
											rows={4}
											placeholder="Project description"
											{...register('projectDescription')}
											className="textarea textarea-bordered w-full"
											disabled={isSubmitting}
										></textarea>
										{errors.projectDescription && (
											<p className="text-red-500 text-sm">
												{errors.projectDescription.message}
											</p>
										)}
										<p className="mt-1 mr-1 text-right text-gray-500">
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

								{selectedProfessional && (
									<div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-52 overflow-y-auto">
										{selectedProfessional.categories.map(
											({ title, label, img, href }) => (
												<button
													type="button"
													key={href}
													onClick={() => handleSelectCategory(title)}
													className={`flex flex-col items-center gap-2 rounded-lg p-4 transition hover:bg-orange-100 border-2 ${
														isSelected(title)
															? 'border-orange-500 bg-orange-50'
															: 'border-transparent'
													}`}
												>
													<Image src={img} alt={label} width={44} height={44} />
													<span className="text-sm font-medium text-center text-gray-500">
														{label}
													</span>
												</button>
											)
										)}
									</div>
								)}

								{errors.category && (
									<p className="text-red-500 text-sm">
										{errors.category.message}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="btn bg-orange-500 text-white hover:bg-orange-600"
						>
							{isSubmitting ? 'Registering...' : 'Request service'}
						</button>
					</form>
				)}
				{requestChat && (
					<div className="flex-1 h-auto border-2 border-gray-200 bg-white p-6 rounded-2xl shadow-md">
						<div className="flex justify-between items-center mb-4 w-full">
							<h2 className="text-xl font-semibold text-orange-500">
								Chat with Professional
							</h2>
							<a href="https://app.mento.org/" target="_blank" rel="noreferrer">
								<Image
									src={IMAGES['mentoLogo']}
									alt="Mento"
									width={50}
									height={50}
								/>
							</a>
						</div>

						{/* <div className="dropdown dropdown-bottom">
						<div tabIndex={0} role="button" className="btn flex items-center">
							{selectedToken ? (
								<>
									<Image
										src={selectedToken.icon}
										alt={selectedToken.name}
										width={24}
										height={24}
									/>
									{selectedToken.name}
								</>
							) : (
								'Select coin ⬇️'
							)}
						</div>

						<ul
							tabIndex={0}
							className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-80 overflow-y-auto"
						>
							{stablecoins.map((stablecoin: Stablecoin, index: number) => {
								const disabled: boolean = stablecoin.proxy === zeroAddress
								return (
									<li key={index}>
										<a
											onClick={() => !disabled && handleSelectToken(stablecoin)}
											className={`${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
											tabIndex={disabled ? -1 : 0}
										>
											<Image
												src={stablecoin.icon}
												alt={stablecoin.name}
												width={24}
												height={24}
											/>
											{stablecoin.name}
										</a>
									</li>
								)
							})}
						</ul>
					</div> */}
						<div className="w-full h-[calc(100%-2rem)] overflow-hidden">
							{isSubmitting ? (
								<div className="flex items-center justify-center h-full">
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
												chatId={
													chatId ||
													`${selectedProfessional?.address}-${user?.address}`
												}
												currentUserId={user?.address as string}
												secondUserId={selectedProfessional?.address as string}
											/>

											{paymentRequest && (
												<div className="mt-4 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-gray-200">
													<h2 className="text-lg font-semibold text-orange-500 mb-2">
														Payment Request
													</h2>
													<p className="text-sm sm:text-base text-gray-700 mb-3">
														<span className="font-medium">
															{paymentRequest.requester}
														</span>{' '}
														is requesting a payment of{' '}
														<span className="font-medium">
															{paymentRequest.amount} {paymentRequest.currency}
														</span>
													</p>
													<div className="flex flex-col xs:flex-row justify-end gap-2 sm:gap-3">
														<button
															className="btn btn-sm border-gray-300 hover:bg-gray-100 w-full xs:w-auto"
															onClick={() => clearPaymentRequest()}
														>
															Decline
														</button>
														{selectedProfessional && selectedToken && (
															<Modal
																amount={
																	paymentRequest?.amount.toString() as string
																}
																selectedStablecoin={selectedToken}
																selectedProfessional={selectedProfessional}
															/>
														)}
													</div>
												</div>
											)}

											{/* <button
												onClick={handleDeleteChat}
												className="btn btn-sm btn-secondary mt-4"
											>
												Cancel Chat
											</button> */}
										</>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}
