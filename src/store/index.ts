import { Address } from 'viem'
import { create } from 'zustand'

type Store = {
	address: Address | null
	setAddress: (address: Address) => void
}

export const useStore = create<Store>(set => ({
	address: null,

	setAddress(address: Address): void {
		return set({ address })
	}
}))
