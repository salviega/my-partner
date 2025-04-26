import { Address } from 'viem'

export interface Category {
	title: string
	href: string
	label: string
	img: string
}

export interface Opinion {
	id: number
	author: string
	date: string // ISO o string legible
	comment: string
	avatar?: string // URL opcional
	verified?: boolean
}

export interface Professional {
	address: Address
	id?: number
	name: string
	photo?: File
	photoUrl?: string
	city: string
	stars: number
	description: string
	opinions: Opinion[]
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

export type Subrubro = {
	title: string
	href: string
	icon: string
	items: string[]
}
