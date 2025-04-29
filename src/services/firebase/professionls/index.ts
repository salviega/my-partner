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

import { Professional } from '@/models'

import { db } from '..'

const professionalCollection = collection(db, 'professionals')

export function professionalsService(): {
	getProfessionalByAddress: (address: Address) => Promise<Professional | null>
	getProfessionalsByCategory: (category: string) => Promise<Professional[]>
	getProfessionalById: (id: string) => Promise<Professional | null>
	saveProfessional: (user: Professional) => Promise<Professional>
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

			const professional: Professional =
				querySnapshot.docs[0].data() as Professional
			return professional
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
					...(document.data() as Professional),
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

			return { ...(snap.data() as Professional), id: snap.id }
		} catch (error) {
			console.error('❌ Error fetching professional by ID:', error)
			throw error
		}
	}

	const saveProfessional = async (
		professional: Professional
	): Promise<Professional> => {
		try {
			const checksummed: Address = checksumAddress(professional.address)
			professional.address = checksummed

			const savedProfessional: Professional | null =
				await getProfessionalByAddress(checksummed)

			if (savedProfessional) {
				// throw new Error('Professional already exists')
			}

			const docRef = await addDoc(professionalCollection, professional)

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
