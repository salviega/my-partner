import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import { usePaymentRequestStore } from '@/store/usePaymenRequest'

import { ChatMessage } from '../../chats/interfaces/chat'

interface PaymentRequest {
	amount: string
	currency: string
	requester: string
}

export function useChatSocket(
	chatId: string,
	currentUserId: string,
	secondUserId: string
): {
	messages: ChatMessage[]
	sendMessage: (text: string) => void
	deleteChat: () => void
	socket: Socket | null
} {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const { setPaymentRequest } = usePaymentRequestStore.getState()

	useEffect(() => {
		if (!chatId || !currentUserId || !secondUserId) {
			console.warn('Faltan datos para conectarse al chat.')
			return
		}

		const socketInstance = io(
			'https://hopes-kai-databases-graduation.trycloudflare.com/',
			{
				extraHeaders: {
					'ngrok-skip-browser-warning': 'true'
				},
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

		socketInstance.on('payment_requested', (data: PaymentRequest) => {
			console.log('📥 Recibido payment_requested:', data)
			setPaymentRequest(data)
		})

		return (): void => {
			socketInstance.disconnect()
		}
	}, [chatId, currentUserId, secondUserId])
	useEffect(() => {
		if (!socket) return

		// alert('🎧 Registrando listeners adicionales para eventos secundarios ')

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handlePaymentRequest = (data: any) => {
			// alert('📥 payment_requested recibido')

			setPaymentRequest(data)
		}

		// SOLO una vez, bien definido
		socket.on('payment_requested', handlePaymentRequest)

		return () => {
			socket.off('payment_requested', handlePaymentRequest)
		}
	}, [socket])

	const sendMessage = (text: string): void => {
		if (text.trim() === '' || !socket) return
		socket.emit('send_message', { text })
	}

	const deleteChat = (): void => {
		if (!socket) return
		socket.emit('delete_chat')
	}

	return {
		messages,
		sendMessage,
		deleteChat,
		socket
	}
}
