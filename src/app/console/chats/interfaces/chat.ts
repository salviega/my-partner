// src/interfaces/chat.ts

export interface ChatMessage {
	id: string
	userId: string
	message: string
	timestamp: Date
}

export interface Accounts {
	primaryUser: string
	secondaryUser: string
}

export type StatusChat = 'active' | 'inactive' | 'archived'

export interface Chat {
	id: string
	accounts: Accounts[]
	status: StatusChat
	chatMessages: ChatMessage[]
	createdAt: Date
	updatedAt: Date
}
