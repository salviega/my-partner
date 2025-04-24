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
