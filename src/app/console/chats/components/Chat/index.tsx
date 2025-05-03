import React, { useEffect, useRef, useState } from 'react'

import { Stablecoin } from '@/models'

import { useChatSocket } from '../../hooks/useSocket'

interface ChatProps {
	chatId: string
	currentUserId: string
	secondUserId: string
	token?: Stablecoin
}

const ChatComponent: React.FC<ChatProps> = ({
	chatId,
	currentUserId,
	secondUserId,
	token
}) => {
	const { messages, sendMessage } = useChatSocket(
		chatId,
		currentUserId,
		secondUserId
	)
	const [newMessage, setNewMessage] = useState<string>('')
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = (): void => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value.startsWith('/gen-pay')) {
			const parts = e.target.value.split(' ')

			// If they're just typing the command, use as is
			if (parts.length === 1) {
				setNewMessage(e.target.value)
				return
			}

			// If they've entered an amount
			const amount = parts[1]

			if (!token) {
				alert('No token available for payment generation')
				setNewMessage(e.target.value)
				return
			}

			// For backend: we send the full command with stringified token
			const backendCommand = `/gen-pay ${amount} ${token.name}`

			// For frontend display: we show a nicer format with token symbol
			const displayCommand = `/gen-pay ${amount} ${token.name || 'token'}`

			// Store the backend command but display the formatted version
			setNewMessage(backendCommand)

			// Optional: you might need to implement a custom display logic
			// if you want to show a different format than what's stored
		} else {
			setNewMessage(e.target.value)
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<div className="w-full">
			<div className="lg:h-[calc(75vh-4rem)] overflow-y-auto flex flex-col p-10 h-96">
				{messages.map(msg => (
					<div
						key={msg.id}
						className={`chat ${msg.userId === currentUserId ? 'chat-end' : 'chat-start'}`}
					>
						<div
							className={`chat-bubble ${msg.userId === currentUserId ? 'chat-bubble-primary rounded-4xl' : 'chat-bubble-secondary'}`}
						>
							{msg.message}
						</div>
					</div>
				))}
				<div ref={messagesEndRef}></div>
			</div>

			<div className="sticky bottom-0 left-0 w-full border-t border-base-300 p-4">
				<div className="join w-full">
					<input
						type="text"
						placeholder="Escribe un mensaje..."
						value={
							newMessage.startsWith('/gen-pay') && token
								? `/gen-pay ${newMessage.split(' ')[1]} ${token.name || 'token'}`
								: newMessage
						}
						onChange={e => onChangeNewMessage(e)}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								sendMessage(newMessage)
								setNewMessage('')
							}
						}}
						className="input input-bordered join-item w-full"
					/>
					<button
						onClick={() => {
							sendMessage(newMessage)
							setNewMessage('')
						}}
						className="btn btn-primary join-item"
					>
						Enviar
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChatComponent
