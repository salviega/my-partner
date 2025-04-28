import React, { useEffect, useState } from 'react'
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

		socket = io('http://localhost:3000', {
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
		<div>
			<h2 className="text-xl font-semibold mb-4">Mis Chats</h2>
			<ul className="list-none">
				{chats.map(chat => {
					const secondUserId = getSecondUserId(chat)
					return (
						<li
							key={chat.id}
							className="mb-2 cursor-pointer"
							onClick={() => onSelectChat(chat.id, secondUserId)}
						>
							<div className="p-4 rounded-lg bg-amber-50 shadow-md text-gray-800">
								<strong>Conversación con:</strong> {secondUserId} <br />
								<strong>Última actualización:</strong>{' '}
								{new Date(chat.updatedAt).toLocaleString()}
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default ChatListComponent
