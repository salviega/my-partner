import axios from 'axios'

import { CustomError } from '@/classes/custom-error.class'

export function ensureEnvVar(
	envVar: string | undefined,
	varName: string
): string {
	if (!envVar) {
		throw new Error(`${varName} is not defined`)
	}
	return envVar
}

export async function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader: FileReader = new FileReader()

		reader.readAsDataURL(file)

		reader.onload = (): void => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert file to Base64'))
			}
		}

		reader.onerror = (error: ProgressEvent<FileReader>): void => {
			reject(error)
		}
	})
}

export function handleError(error: unknown): never {
	if (axios.isAxiosError(error)) {
		const message =
			error.response?.data?.message || error.message || 'Unknown error'
		const status = error.response?.status || 500
		const details = error.response?.data || {}

		console.error('❌ Axios Error:', { message, status, details })
		throw new CustomError(message, status, details)
	} else if (error instanceof Error) {
		console.error('❌ General Error:', error)
		throw new CustomError(error.message, 0, {})
	} else {
		console.error('❌ Unknown Error:', error)
		throw new CustomError('An unexpected error occurred', 0, {})
	}
}
