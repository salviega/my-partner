export const saveLocalStorage = <T>(key: string, value: T): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

export const getLocalStorage = <T>(key: string): T | null => {
	if (typeof window !== 'undefined') {
		const value = localStorage.getItem(key)
		return value ? JSON.parse(value) : null
	}
	return null
}
export const removeLocalStorage = (key: string): void => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key)
	}
}
export const clearLocalStorage = (): void => {
	if (typeof window !== 'undefined') {
		localStorage.clear()
	}
}
