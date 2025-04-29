import React, { useEffect, useRef, useState } from 'react'

import { useChatSocket } from '../../hooks/useSocket'

interface ChatProps {
	chatId: string
	currentUserId: string
	secondUserId: string
}

const ChatComponent: React.FC<ChatProps> = ({
	chatId,
	currentUserId,
	secondUserId
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

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<div className="w-full">
			<div className="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col">
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

			<div className="sticky bottom-0 left-0 w-full bg-base-100 border-t border-base-300 p-4">
				<div className="join w-full">
					<input
						type="text"
						placeholder="Escribe un mensaje..."
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
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
