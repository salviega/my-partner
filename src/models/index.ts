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
	stars: number
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
	opinions: Opinion[]
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

/*
  Hello profesional.name! 👋
  I want to quote you for a job I need done:
  reques.title
  reques.description
  I need it done by reques.starDate
  I live in reques.addressClient

  How much would it cost?
  Thanks!
---------------------------

To Do

Si el chat no ha sido respondido por el profesional aparece
un alerta de esperando respuesta


formulario all stablecoins y seleccionar el metodo de pago.


el profesional cuando pide el monto debe digitar el monto
/get-pay 200 cCOP


y al cliente se le vera una interfaz para aceptar o rechazar el pago.

el cliente puede ver el monto y el metodo de pago

*/
