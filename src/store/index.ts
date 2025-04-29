import { Address } from 'viem'
import { create } from 'zustand'

import { categories } from '@/constants'
import { Category, Professional, User } from '@/models'
import { professionalsService } from '@/services/firebase/professionls'
import { usersServices } from '@/services/firebase/users'

type Store = {
	address: Address | null
	isAddressSeted: boolean
	isProfessionalSeted: boolean
	isSettingProfessional: boolean
	isSettingSelectedProfessional: boolean
	isSettingProfessionals: boolean
	isSettingUser: boolean
	professional: Professional | null
	professionalsByCategory: Record<string, Professional[]>
	selectedProfessional: Professional | null
	user: User | null
	getProfessionalByAddress: (address: Address) => Promise<void>
	getProfessionalById: (id: string) => Promise<void>

	getSelectedProfessionalByAddress: (
		address: Address
	) => Promise<Professional | null>

	getSelectedProfessionalById: (id: string) => Promise<Professional | null>
	getProfessionalsByCategory: (category: string) => Promise<void>
	getUser: (address: Address) => Promise<void>
	setAddress: (address: Address) => void
	setSelectedProfessional: (professional: Professional) => void
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
	isSettingProfessional: false,
	isSettingSelectedProfessional: false,
	isSettingProfessionals: false,
	isSettingUser: false,
	professional: null,
	professionalsByCategory: initialProfessionalsByCategory,
	selectedProfessional: null,
	user: null,

	async getProfessionalByAddress(address: Address): Promise<void> {
		const { getProfessionalByAddress } = professionalsService()

		set({ isSettingProfessional: true })

		const professional: Professional | null =
			await getProfessionalByAddress(address)

		if (professional) {
			set({ professional, isSettingProfessional: false })
		} else {
			set({ professional: null, isSettingProfessional: false })
		}
	},

	async getProfessionalById(id: string): Promise<void> {
		const { getProfessionalById } = professionalsService()

		set({ isSettingProfessional: true })

		const professional: Professional | null = await getProfessionalById(id)

		if (professional) {
			set({ professional, isSettingProfessional: false })
		} else {
			set({ professional: null, isSettingProfessional: false })
		}
	},

	async getSelectedProfessionalByAddress(
		address: Address
	): Promise<Professional | null> {
		const { getProfessionalByAddress } = professionalsService()

		const professional: Professional | null =
			await getProfessionalByAddress(address)

		if (professional) {
			set({ selectedProfessional: professional })
		} else {
			set({ selectedProfessional: null })
		}
		return professional
	},

	async getSelectedProfessionalById(id: string): Promise<Professional | null> {
		const { getProfessionalById } = professionalsService()

		const professional: Professional | null = await getProfessionalById(id)

		if (professional) {
			set({ selectedProfessional: professional })
		} else {
			set({ selectedProfessional: null })
		}

		return professional
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

	async getUser(address: Address): Promise<void> {
		const { getUserByAddress, saveUser } = usersServices()

		set({ isSettingUser: true })

		const user: User | null = await getUserByAddress(address)

		if (user) {
			set({ user, isSettingUser: false })
		} else {
			const newUser: User = await saveUser({ address })
			set({ user: newUser, isSettingUser: false })
		}
	},

	setAddress(address: Address): void {
		return set({ address, isAddressSeted: true })
	},

	setSelectedProfessional(selectedProfessional: Professional): void {
		return set({ selectedProfessional, isProfessionalSeted: true })
	}
}))
