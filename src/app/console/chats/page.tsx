'use client'

import Image from 'next/image'
import { JSX, useEffect, useState } from 'react'
import { Address, zeroAddress } from 'viem'

import { stablecoins } from '@/constants'
import { Stablecoin } from '@/models'
import Announcement from '@/shared/Announcement'
import Spinner from '@/shared/Spinner'
import { useStore } from '@/store'

import ChatComponent from './components/Chat'
import ChatListComponent from './components/ChatList'

export default function Chats(): JSX.Element {
	const [selectedToken, setSelectedToken] = useState<Stablecoin | null>(null)

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
	const [checkingMiniPay, setCheckingMiniPay] = useState<boolean>(true)
	const [currentChatId, setCurrentChatId] = useState<string>('')
	const [currentUserId, setCurrentUserId] = useState<string>('')
	const [secondUserId, setSecondUserId] = useState<string>('')

	useEffect(() => {
		if (user?.address) {
			setCurrentUserId(user.address)
		}
	}, [user?.address])

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

	if (checkingMiniPay || isSettingUser || isSettingProfessional)
		return (
			<div className="flex justify-center items-center w-full h-screen">
				<Spinner />
			</div>
		)

	const handleSelectToken = (token: Stablecoin): void => {
		setSelectedToken(token)
		// if (
		// 	typeof document !== 'undefined' &&
		// 	document.activeElement instanceof HTMLElement
		// ) {
		// 	document.activeElement.blur()
		// }
	}

	if (!isSettingUser && !user) return <Announcement />

	if (!isSettingProfessional && !professional)
		return <Announcement message="Aren't a partner" />

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			{/* Header with user setup */}
			<div className="p-4 shadow-md bg-white rounded-2xl">
				<h1 className="text-2xl font-bold flex items-center">
					<span className="text-primary mr-2">💬</span>
					Chat Application
					{user?.address && (
						<span className="text-sm text-gray-500 ml-2">
							{`(${user?.address.slice(0, 6)}...${user?.address.slice(-4)})`}
						</span>
					)}
				</h1>
				{!user?.address && (
					<div className="mt-3 p-2 bg-yellow-50 rounded-lg text-amber-700 text-sm">
						Waiting for user address...
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1 mt-4">
				{user?.address && (
					<ChatListComponent
						currentUserId={user.address}
						onSelectChat={(chatId, secondUserId) => {
							setCurrentChatId(chatId)
							setSecondUserId(secondUserId)
						}}
					/>
				)}
				<div className="bg-white shadow-md rounded-2xl p-4 flex-1">
					<>
						<div className="dropdown dropdown-bottom">
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
												onClick={() =>
													!disabled && handleSelectToken(stablecoin)
												}
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
						</div>
					</>

					{currentChatId && currentUserId && secondUserId ? (
						<ChatComponent
							chatId={currentChatId}
							currentUserId={currentUserId}
							secondUserId={secondUserId}
							token={selectedToken || undefined}
						/>
					) : (
						<div className="flex items-center justify-center h-full">
							<div className="text-center p-6 bg-base-200 rounded-lg max-w-md">
								<span className="text-4xl text-primary mb-4">💬</span>
								<h3 className="font-bold text-lg mb-2">
									No conversation selected
								</h3>
								<p className="text-base-content/70">
									Select a chat from the list or start a new conversation to
									begin messaging.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
