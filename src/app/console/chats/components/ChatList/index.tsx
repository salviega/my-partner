import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { io, Socket } from 'socket.io-client'

interface ChatSummary {
	id: string
	accounts: { primaryUser: string; secondaryUser: string }[]
	status: string
	updatedAt: string
}

interface ChatListProps {
	currentUserId: string
	onSelectChat: (chatId: string, secondUserId: string) => void
}

let socket: Socket

const ChatListComponent: React.FC<ChatListProps> = ({
	currentUserId,
	onSelectChat
}) => {
	const [chats, setChats] = useState<ChatSummary[]>([])

	useEffect(() => {
		if (!currentUserId) {
			console.warn('Falta userID para conectar el listado de chats')
			return
		}

		socket = io('https://krnpm9qg-3000.use.devtunnels.ms/', {
			query: { userID: currentUserId }
		})

		socket.emit('list_chats') // Pedimos la lista apenas conectamos

		socket.on('update_chats', (chats: ChatSummary[]) => {
			setChats(chats)
		})

		socket.on('refresh_chats', () => {
			socket.emit('list_chats')
		})

		return () => {
			if (socket) socket.disconnect()
		}
	}, [currentUserId])

	const getSecondUserId = (chat: ChatSummary) => {
		const account = chat.accounts[0]
		return account.primaryUser === currentUserId
			? account.secondaryUser
			: account.primaryUser
	}

	return (
		<div className="p-4 rounded-lg shadow-lg h-full">
			<h2 className="text-2xl font-bold mb-6">My Chat Clients</h2>
			{chats.length === 0 ? (
				<div className="alert alert-info">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="stroke-current shrink-0 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>No tienes chats activos.</span>
					</div>
				</div>
			) : (
				<div className="grid gap-4">
					{chats.map(chat => {
						const secondUserId = getSecondUserId(chat)
						return (
							<div
								key={chat.id}
								onClick={() => onSelectChat(chat.id, secondUserId)}
								className="card bg-base-100 hover:bg-base-200 cursor-pointer transition-colors"
							>
								<div className="card-body p-3 sm:p-4">
									<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
										<div className="avatar flex-shrink-0">
											<Blockies
												seed={secondUserId}
												size={8}
												scale={3}
												className="rounded-full"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="card-title text-base sm:text-lg truncate text-wrap">
												{secondUserId}
											</h3>
											<p className="text-xs sm:text-sm opacity-70 truncate">
												Última actualización:{' '}
												{new Date(chat.updatedAt).toLocaleString()}
											</p>
										</div>
										<div className="self-start sm:self-center mt-1 sm:mt-0">
											<div
												className={`badge ${chat.status === 'active' ? 'badge-primary' : 'badge-ghost'}`}
											>
												{chat.status}
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default ChatListComponent
