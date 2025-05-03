import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import { ChatMessage } from '../../chats/interfaces/chat'

export function useChatSocket(
	chatId: string,
	currentUserId: string,
	secondUserId: string
): {
	messages: ChatMessage[]
	sendMessage: (text: string) => void
	socket: Socket | null
} {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] = useState<ChatMessage[]>([])

	useEffect(() => {
		if (!chatId || !currentUserId || !secondUserId) {
			console.warn('Faltan datos para conectarse al chat.')
			return
		}

		const socketInstance = io(
			'https://hopes-kai-databases-graduation.trycloudflare.com',
			{
				query: {
					chatID: chatId,
					userID: currentUserId,
					secondIdUser: secondUserId
				}
			}
		)

		setSocket(socketInstance)

		socketInstance.on('history', (history: ChatMessage[]) => {
			setMessages(history)
		})

		socketInstance.on('receive_message', (message: ChatMessage) => {
			setMessages(prev => [...prev, message])
		})

		return (): void => {
			socketInstance.disconnect()
		}
	}, [chatId, currentUserId, secondUserId])

	const sendMessage = (text: string): void => {
		if (text.trim() === '' || !socket) return
		socket.emit('send_message', { text })
	}

	return { messages, sendMessage, socket }
}
