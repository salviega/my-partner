import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore'
import { Address, checksumAddress } from 'viem'

import { categories } from '@/constants'
import { Category, Professional, ProfessionalDto } from '@/models'

import { db } from '..'

const professionalCollection = collection(db, 'professionals')

export function professionalsService(): {
	getProfessionalByAddress: (address: Address) => Promise<Professional | null>
	getProfessionalsByCategory: (category: string) => Promise<Professional[]>
	getProfessionalById: (id: string) => Promise<Professional | null>
	saveProfessional: (user: ProfessionalDto) => Promise<Professional>
} {
	const getProfessionalByAddress = async (
		address: Address
	): Promise<Professional | null> => {
		try {
			const checksummed: Address = checksumAddress(address)

			const q = query(
				professionalCollection,
				where('address', '==', checksummed)
			)

			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				return null
			}

			const professional: Professional = mapProfessionalDto(
				querySnapshot.docs[0].data() as ProfessionalDto
			)

			return {
				...professional,
				id: querySnapshot.docs[0].id
			}
		} catch (error) {
			console.error('❌ Error fetching professional:', error)
			throw error
		}
	}

	const getProfessionalsByCategory = async (
		categoryTitle: string
	): Promise<Professional[]> => {
		try {
			const q = query(
				professionalCollection,
				where('categories', 'array-contains', categoryTitle)
			)

			const snap = await getDocs(q)

			const professionals: Professional[] = []

			snap.forEach(document => {
				professionals.push({
					...mapProfessionalDto(document.data() as ProfessionalDto),
					id: document.id
				})
			})

			return professionals
		} catch (error) {
			console.error('❌ Error fetching pros:', error)
			throw error
		}
	}

	const getProfessionalById = async (
		id: string
	): Promise<Professional | null> => {
		try {
			const ref = doc(db, 'professionals', id)
			const snap = await getDoc(ref)

			if (!snap.exists()) {
				return null
			}

			const professional: Professional = mapProfessionalDto(
				snap.data() as ProfessionalDto
			)

			return { ...professional, id: snap.id }
		} catch (error) {
			console.error('❌ Error fetching professional by ID:', error)
			throw error
		}
	}

	const saveProfessional = async (
		professionalDto: ProfessionalDto
	): Promise<Professional> => {
		try {
			const checksummed: Address = checksumAddress(professionalDto.address)
			professionalDto.address = checksummed

			const savedProfessional: Professional | null =
				await getProfessionalByAddress(checksummed)

			if (savedProfessional) {
				// throw new Error('Professional already exists')
			}

			const docRef = await addDoc(professionalCollection, professionalDto)

			const professional: Professional = mapProfessionalDto(professionalDto)

			return { ...professional, id: docRef.id }
		} catch (error) {
			console.error('❌ Error saving professional:', error)
			throw error
		}
	}

	return {
		getProfessionalByAddress,
		getProfessionalsByCategory,
		getProfessionalById,
		saveProfessional
	}
}

export function mapProfessionalDto(dto: ProfessionalDto): Professional {
	const currentCategories: Category[] = categories.filter(
		(category: Category) => dto.categories.includes(category.title)
	)

	return {
		...dto,
		categories: currentCategories
	}
}
