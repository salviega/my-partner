'use client'

import { JSX, useEffect, useState } from 'react'
import { Address, zeroAddress } from 'viem'

import Announcement from '@/shared/Announcement'
import Spinner from '@/shared/Spinner'
import { useStore } from '@/store'

import ChatComponent from './components/Chat'
import ChatListComponent from './components/ChatList'

export default function Chats(): JSX.Element {
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
		async function checkMiniPay(): Promise<void> {
			if (typeof window !== 'undefined' && window.ethereum?.isMiniPay) {
				if (!user) {
					try {
						const accounts = await window.ethereum.request({
							method: 'eth_requestAccounts'
						})

						const accountList = accounts as Address[]
						getUser(accountList[0])
						getProfessional(zeroAddress)
					} catch (error) {
						console.error('Error requesting accounts:', error)
					}
				}

				if (user && !professional) {
					getProfessional(user.address)
				}
			}

			// Hardcoded address for testing
			getUser(zeroAddress)
			getProfessional(zeroAddress)

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

	// if (!isSettingUser && !user) return <Announcement />

	if (!isSettingProfessional && !professional)
		return <Announcement message="Aren't a partner" />

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			{/* Header with user setup */}
			<div className=" p-4 shadow-md bg-white rounded-2xl">
				<h1 className="text-2xl font-bold flex items-center">
					<span className="text-primary mr-2">💬</span>
					Chat Application
				</h1>
				<div className="flex flex-wrap gap-2 mt-3">
					<input
						type="text"
						onChange={e => setCurrentUserId(e.target.value)}
						value={currentUserId}
						placeholder="Your user ID"
						className="input input-sm input-bordered flex-1 min-w-[200px]"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1 mt-4">
				<ChatListComponent
					currentUserId={currentUserId}
					onSelectChat={(chatId, secondUserId) => {
						setCurrentChatId(chatId)
						setSecondUserId(secondUserId)
					}}
				/>

				<div className="bg-white shadow-md rounded-2xl p-4 flex-1">
					{currentChatId && currentUserId && secondUserId ? (
						<ChatComponent
							chatId={currentChatId}
							currentUserId={currentUserId}
							secondUserId={secondUserId}
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
