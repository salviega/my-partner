'use client'

import { JSX, useState } from 'react'

import Layout from '@/shared/Layout'

import ChatComponent from './components/Chat'
import ChatListComponent from './components/ChatList'

export default function Chats(): JSX.Element {
	const [currentUserId, setCurrentUserId] = useState<string>('')
	const [currentChatId, setCurrentChatId] = useState<string>('')
	const [secondUserId, setSecondUserId] = useState<string>('')
	return (
		<>
			<h1 className="text-2xl font-bold mb-4">Chats</h1>
			<div className="form-control gap-2 mb-4">
				<input
					type="text"
					onChange={e => setCurrentUserId(e.target.value)}
					value={currentUserId}
					placeholder="Enter your user ID"
					className="input input-bordered w-full"
				/>
				<input
					type="text"
					onChange={e => setCurrentChatId(e.target.value)}
					value={currentChatId}
					placeholder="Enter your chat ID"
					className="input input-bordered w-full"
				/>
				<input
					type="text"
					onChange={e => setSecondUserId(e.target.value)}
					value={secondUserId}
					placeholder="Enter your second user ID"
					className="input input-bordered w-full"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div className="">
					<div className="card-body">
						<h2 className="card-title">Chat List</h2>
						<ChatListComponent
							currentUserId={currentUserId}
							onSelectChat={(chatId, secondUserId) => {
								setCurrentChatId(chatId)
								setSecondUserId(secondUserId)
							}}
						/>
					</div>
				</div>
				<div className="w-full">
					<div className="card-body">
						<h2 className="card-title">Chat Window</h2>
						{currentChatId && currentUserId && secondUserId ? (
							<ChatComponent
								chatId={currentChatId}
								currentUserId={currentUserId}
								secondUserId={secondUserId}
							/>
						) : (
							<div className="alert alert-info">
								<span>
									Selecciona un chat y completa los datos para comenzar.
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
