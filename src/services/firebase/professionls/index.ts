import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where
} from 'firebase/firestore'
import { Address, checksumAddress } from 'viem'

import { Professional } from '@/models'

import { db } from '..'

const professionalCollection = collection(db, 'professionals')

export function professionalsService(): {
	getProfessionalByAddress: (address: Address) => Promise<Professional | null>
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

	const saveProfessional = async (
		professional: Professional
	): Promise<Professional> => {
		try {
			const checksummed: Address = checksumAddress(professional.address)
			professional.address = checksummed

			const professionalRef = doc(professionalCollection, checksummed)

			await setDoc(professionalRef, professional)

			return professional
		} catch (error) {
			console.error('❌ Error saving professional:', error)
			throw error
		}
	}

	return {
		getProfessionalByAddress,
		saveProfessional
	}
}
