import { Address } from 'viem'
import { create } from 'zustand'

import { Professional } from '@/models'
import { professionalsService } from '@/services/firebase/professionls'

type Store = {
	address: Address | null
	isAddressSeted: boolean
	isProfessionalSeted: boolean
	professional: Professional | null
	getProfessional: (address: Address) => Promise<void>
	setAddress: (address: Address) => void
}

export const useStore = create<Store>(set => ({
	address: null,
	isAddressSeted: false,
	isProfessionalSeted: false,
	professional: null,

	setAddress(address: Address): void {
		return set({ address, isAddressSeted: true })
	},

	async getProfessional(address: Address): Promise<void> {
		const { getProfessionalByAddress } = professionalsService()

		const professional: Professional | null =
			await getProfessionalByAddress(address)

		if (professional) {
			set({ professional })
		} else {
			set({ professional: null })
		}
	}
}))
