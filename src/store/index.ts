import { Address } from 'viem'
import { create } from 'zustand'

type Store = {
	address: Address | null
	isAddressSeted: boolean
	setAddress: (address: Address) => void
}

export const useStore = create<Store>(set => ({
	address: null,

	isAddressSeted: false,

	setAddress(address: Address): void {
		return set({ address, isAddressSeted: true })
	}
}))
