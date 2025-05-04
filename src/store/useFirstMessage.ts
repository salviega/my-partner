import { create } from 'zustand'

interface FirstMessage {
	firstMessage: string
	setFirstMessage: (firstMessage: string) => void
	clearFirstMessage: () => void
}

export const useFirstMessageStore = create<FirstMessage>(set => ({
	firstMessage: '',
	setFirstMessage: (firstMessage: string): void => set({ firstMessage }),
	clearFirstMessage: (): void => set({ firstMessage: '' })
}))
