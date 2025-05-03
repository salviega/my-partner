import { Address } from 'viem'

export interface Stablecoin {
	icon: string
	name: string
	proxy: Address
	implementation: Address
}

export interface Category {
	title: string
	href: string
	label: string
	img: string
}

export interface OpinionDto {
	author: string
	date?: string // ISO o string legible
	createdAt: number // ISO o string legible
	comment: string
	avatar?: string // URL opcional
	verified?: boolean
	stars: number
}

export interface Opinion {
	id?: string
	author: string
	createdAt: string // ISO o string legible
	comment: string
	avatar?: string // URL opcional
	verified?: boolean
	stars: number
	date: string
}

export interface ProfessionalDto {
	address: Address
	name: string
	lastName: string
	photo?: File
	categories: string[]
	photoUrl?: string
	city: string
	stars: number
	description: string
	opinions: OpinionDto[]
}

export interface Professional {
	id?: string
	address: Address
	name: string
	lastName: string
	photo?: File
	categories: Category[]
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

export interface RequestForm {
	addressClient: string
	title: string
	description: string
	category: string
	starDate: string
}

export interface User {
	id?: string
	address: Address
}
