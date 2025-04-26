import {
	getDownloadURL,
	ref,
	StorageReference,
	uploadBytes,
	UploadResult
} from 'firebase/storage'

import { Professional } from '@/models'

import { storage } from '..'

export function storageServices(): {
	uploadProfessionalPhoto: (professional: Professional) => Promise<Professional>
} {
	const uploadProfessionalPhoto = async (
		professional: Professional
	): Promise<Professional> => {
		try {
			const fileName: string = `${professional.name}-${Date.now()}`
			const fileRef: StorageReference = ref(storage, fileName)

			if (!professional.photo) {
				throw new Error('Professional photo is undefined')
			}
			const snapshot: UploadResult = await uploadBytes(
				fileRef,
				professional.photo
			)

			const downloadURL: string = await getDownloadURL(snapshot.ref)

			professional.photo = undefined
			professional.photoUrl = downloadURL

			return professional
		} catch (error) {
			console.error('❌ Error uploading file:', error)
			throw error
		}
	}

	return {
		uploadProfessionalPhoto
	}
}
