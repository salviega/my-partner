export interface Category {
	title: string
	href: string
	label: string
	img: string
}

export interface Professional {
	id: number
	name: string
	city: string
	stars: number
	description: string
}

export interface ProDetailsExtra {
	role: string
	yearsInMarket: number
	coverageKm: number
	tags: string[]
	gallery: string[]
	opinions: {
		id: number
		author: string
		date: string
		stars: number
		comment: string
	}[]
}

export interface Opinion {
	id: number
	author: string
	date: string // ISO o string legible
	stars: number // 1-5
	comment: string
	avatar?: string // URL opcional
	verified?: boolean
}

export type Subrubro = {
	title: string
	href: string
	icon: string
	items: string[]
}
