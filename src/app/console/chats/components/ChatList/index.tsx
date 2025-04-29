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
		<div className="p-4 lg:p-10 rounded-2xl shadow-lg h-full bg-white">
			<h2 className="text-2xl font-bold mb-6">My Chat Clients</h2>
			{chats.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-8">
					<div className="flex flex-col items-center text-center p-3">
						<h3 className="font-bold text-lg">No Active Chats</h3>
						<p className="text-sm opacity-80">
							Your chat list is empty. Conversations will appear here when
							clients connect with you.
						</p>
					</div>
				</div>
			) : (
				<div className="space-y-4">
					{chats.map(chat => {
						const secondUserId = getSecondUserId(chat)
						return (
							<div
								key={chat.id}
								onClick={() => onSelectChat(chat.id, secondUserId)}
								className=" bg-base-100 hover:bg-base-200 cursor-pointer transition-colors w-full rounded-2xl"
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
											<h3 className="card-title text-base sm:text-lg truncate w-full">
												{secondUserId}
											</h3>
											<p className="text-xs sm:text-sm opacity-70 truncate">
												Última actualización:{' '}
												{new Date(chat.updatedAt).toLocaleString()}
											</p>
										</div>
										<div className="">
											<div
												className={`badge ${chat.status === 'active' ? 'badge-primary' : 'badge-ghost'}`}
											>
												<div className="inline-grid *:[grid-area:1/1]">
													<div className="status status-success animate-ping"></div>
													<div className="status status-success"></div>
												</div>
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
