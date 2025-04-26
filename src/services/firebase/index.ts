import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage' // <-- añadido

import { ensureEnvVar } from '@/helpers'

type FirebaseConfig = {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
}

const firebaseConfig: FirebaseConfig = {
	apiKey: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		'process.env.NEXT_PUBLIC_FIREBASE_API_KEY'
	),
	authDomain: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		'process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'
	),
	projectId: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		'process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID'
	),
	storageBucket: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		'process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'
	),
	messagingSenderId: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		'process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
	),
	appId: ensureEnvVar(
		process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		'process.env.NEXT_PUBLIC_FIREBASE_APP_ID'
	)
}

export const app: FirebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
