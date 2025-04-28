import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import { ChatMessage } from '../../interfaces/chat'

interface ChatProps {
	chatId: string
	currentUserId: string
	secondUserId: string
}

let socket: Socket

const ChatComponent: React.FC<ChatProps> = ({
	chatId,
	currentUserId,
	secondUserId
}) => {
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [newMessage, setNewMessage] = useState<string>('')
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!chatId || !currentUserId || !secondUserId) {
			console.warn('Faltan datos para conectarse al chat.')
			return
		}

		socket = io('http://localhost:3000', {
			query: {
				chatID: chatId,
				userID: currentUserId,
				secondIdUser: secondUserId
			}
		})

		socket.on('history', (history: ChatMessage[]) => {
			setMessages(history)
			scrollToBottom()
		})

		socket.on('receive_message', (message: ChatMessage) => {
			setMessages(prev => [...prev, message])
			scrollToBottom()
		})

		return () => {
			if (socket) socket.disconnect()
		}
	}, [chatId, currentUserId, secondUserId])

	const sendMessage = () => {
		if (newMessage.trim() === '' || !socket) return

		socket.emit('send_message', { text: newMessage })
		setNewMessage('')
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className="w-full">
			<div className="h-96 overflow-y-auto">
				{messages.map(msg => (
					<div
						key={msg.id}
						className={`chat ${msg.userId === currentUserId ? 'chat-end' : 'chat-start'}`}
					>
						<div
							className={`chat-bubble ${msg.userId === currentUserId ? 'chat-bubble-primary rounded-2xl' : 'chat-bubble-secondary rounded-2xl'}`}
						>
							{msg.message}
						</div>
					</div>
				))}
				<div ref={messagesEndRef}></div>
			</div>

			<div className="">
				<div className="join w-full">
					<input
						type="text"
						placeholder="Escribe un mensaje..."
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter') sendMessage()
						}}
						className="input input-bordered join-item w-full"
					/>
					<button onClick={sendMessage} className="btn btn-primary join-item">
						Enviar
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChatComponent
