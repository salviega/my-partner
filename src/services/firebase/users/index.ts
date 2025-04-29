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

import { User } from '@/models'

import { db } from '..'

const usersCollection = collection(db, 'users')

export function usersServices(): {
	getUserByAddress: (address: Address) => Promise<User | null>
	getUserById: (id: string) => Promise<User | null>
	saveUser: (user: User) => Promise<User>
} {
	const getUserByAddress = async (address: Address): Promise<User | null> => {
		try {
			const checksummed: Address = checksumAddress(address)

			const q = query(usersCollection, where('address', '==', checksummed))

			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				return null
			}

			const user: User = querySnapshot.docs[0].data() as User

			return user
		} catch (error) {
			console.error('❌ Error fetching professional:', error)
			throw error
		}
	}

	const getUserById = async (id: string): Promise<User | null> => {
		try {
			const ref = doc(db, 'users', id)
			const snap = await getDoc(ref)

			if (!snap.exists()) {
				return null
			}

			return { ...(snap.data() as User), id: snap.id }
		} catch (error) {
			console.error('❌ Error fetching professional by ID:', error)
			throw error
		}
	}

	const saveUser = async (professional: User): Promise<User> => {
		try {
			const checksummed: Address = checksumAddress(professional.address)
			professional.address = checksummed

			const savedUser: User | null = await getUserByAddress(checksummed)

			if (savedUser) {
				// throw new Error('Professional already exists')
			}

			const docRef = await addDoc(usersCollection, professional)

			return { ...professional, id: docRef.id }
		} catch (error) {
			console.error('❌ Error saving professional:', error)
			throw error
		}
	}

	return {
		getUserByAddress,
		getUserById,
		saveUser
	}
}
