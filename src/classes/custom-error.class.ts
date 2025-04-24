export class CustomError extends Error {
	status: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	details: Record<string, any>

	constructor(
		message: string,
		status: number,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		details: Record<string, any> = {}
	) {
		super(message)
		this.name = 'CustomError'
		this.status = status
		this.details = details
	}
}
