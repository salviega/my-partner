import { Address } from 'viem'
import { create } from 'zustand'

import { categories } from '@/constants'
import { Category, Professional } from '@/models'
import { professionalsService } from '@/services/firebase/professionls'

type Store = {
	address: Address | null
	isAddressSeted: boolean
	isProfessionalSeted: boolean
	isSettingProfessionals: boolean
	professional: Professional | null
	professionalsByCategory: Record<string, Professional[]>
	getProfessional: (address: Address) => Promise<void>
	getProfessionalsByCategory: (category: string) => Promise<void>
	setAddress: (address: Address) => void
	setProfessional: (professional: Professional) => void
}

const initialProfessionalsByCategory: Record<string, Professional[]> =
	Object.fromEntries(
		categories.map((category: Category) => [
			category.title,
			[] as Professional[]
		])
	) as Record<string, Professional[]>

export const useStore = create<Store>(set => ({
	address: null,
	isAddressSeted: false,
	isProfessionalSeted: false,
	isSettingProfessionals: false,
	professional: null,
	professionalsByCategory: initialProfessionalsByCategory,

	async getProfessional(address: Address): Promise<void> {
		const { getProfessionalByAddress } = professionalsService()

		const professional: Professional | null =
			await getProfessionalByAddress(address)

		if (professional) {
			set({ professional })
		} else {
			set({ professional: null })
		}
	},

	async getProfessionalsByCategory(category: string): Promise<void> {
		const { getProfessionalsByCategory } = professionalsService()

		set({ isSettingProfessionals: true })

		const professionals: Professional[] =
			await getProfessionalsByCategory(category)

		set(state => ({
			professionalsByCategory: {
				...state.professionalsByCategory,
				[category]: professionals
			},
			isSettingProfessionals: false
		}))
	},

	setAddress(address: Address): void {
		return set({ address, isAddressSeted: true })
	},

	setProfessional(professional: Professional): void {
		return set({ professional, isProfessionalSeted: true })
	}
}))
