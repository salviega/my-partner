import cAUD from '@/assets/images/stablecoins/cAUD.svg'
import cCAD from '@/assets/images/stablecoins/cCAD.svg'
import cCHF from '@/assets/images/stablecoins/cCHF.svg'
import cCOP from '@/assets/images/stablecoins/cCOP.svg'
import cEUR from '@/assets/images/stablecoins/cEUR.svg'
import cGBP from '@/assets/images/stablecoins/cGBP.svg'
import cGHS from '@/assets/images/stablecoins/cGHS.svg'
import cJPY from '@/assets/images/stablecoins/cJPY.svg'
import cKES from '@/assets/images/stablecoins/cKES.svg'
import cNGN from '@/assets/images/stablecoins/cNGN.svg'
import cREAL from '@/assets/images/stablecoins/cREAL.svg'
import cUSD from '@/assets/images/stablecoins/cUSD.svg'
import cZAR from '@/assets/images/stablecoins/cZAR.svg'
import eXOF from '@/assets/images/stablecoins/eXOF.svg'
import PUSO from '@/assets/images/stablecoins/PUSO.svg'
import USDC from '@/assets/images/stablecoins/USDC.svg'
import USDT from '@/assets/images/stablecoins/USDT.svg'
import sowsInTheWorld from '@/assets/lottie/sows-in-the-world.json'
import worldRaisedHands from '@/assets/lottie/world-raised-hands.json'

import mentoLogo from '../assets/images/mento-logo.avif'
import minipayLogo from '../assets/images/minipay-logo.svg'
import {
	Category,
	Opinion,
	Professional,
	Stablecoin,
	Subrubro
} from '../models'

export const stablecoins: Stablecoin[] = [
	{
		icon: cAUD,
		name: 'Celo Australian Dollar (cAUD)',
		proxy: '0x7175504C455076F15c04A2F90a8e352281F492F9',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cCAD,
		name: 'Celo Canadian Dollar (cCAD)',
		proxy: '0xff4Ab19391af240c311c54200a492233052B6325',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cCHF,
		name: 'Celo Swiss Franc (cCHF)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	},
	{
		icon: cCOP,
		name: 'Celo Colombian Peso (cCOP)',
		proxy: '0x8a567e2ae79ca692bd748ab832081c45de4041ea',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cEUR,
		name: 'Celo Euro (cEUR)',
		proxy: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cGBP,
		name: 'Celo British Pound (cGBP)',
		proxy: '0xCCF663b1fF11028f0b19058d0f7B674004a40746',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cGHS,
		name: 'Celo Ghanaian Cedi (cGHS)',
		proxy: '0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cJPY,
		name: 'Celo Japanese Yen (cJPY)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	},
	{
		icon: cKES,
		name: 'Celo Kenyan Shilling (cKES)',
		proxy: '0x456a3D042C0DbD3db53D5489e98dFb038553B0d0',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cNGN,
		name: 'Celo Nigerian Naira (cNGN)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	},
	{
		icon: cREAL,
		name: 'Celo Brazilian Real (cREAL)',
		proxy: '0xe8537a3d056da446677b9e9d6c5db704eaab4787',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: cUSD,
		name: 'Celo Dollar (cUSD)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	},
	{
		icon: cZAR,
		name: 'Celo South African Rand (cZAR)',
		proxy: '0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: eXOF,
		name: 'Celo CFA Franc BCEAO (eXOF)',
		proxy: '0x73F93dcc49cB8A239e2032663e9475dd5ef29A08',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: PUSO,
		name: 'Celo Philippine Peso (PUSO)',
		proxy: '0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B',
		implementation: '0x434563B0604BE100F04B7Ae485BcafE3c9D8850E'
	},
	{
		icon: USDC,
		name: 'USD Coin (USDC)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	},
	{
		icon: USDT,
		name: 'Tether USD (USDT)',
		proxy: '0x0000000000000000000000000000000000000000',
		implementation: '0x0000000000000000000000000000000000000000'
	}
]

export const categories: Category[] = [
	{
		title: 'Air Conditioning',
		href: '/aires-acondicionados/bogota',
		label: 'A/C',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_aireacondicionado_thumb.svg'
	},
	{
		title: 'Bricklayers at Home',
		href: '/albanil/bogota',
		label: 'Bricklayer',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_albanil_thumb.svg'
	},
	{
		title: 'Architects at Home',
		href: '/arquitecto/bogota',
		label: 'Architect',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_arquitecto_thumb.svg'
	},
	{
		title: 'Car Services',
		href: '/automoviles/bogota',
		label: 'Cars',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_automocion_thumb.svg'
	},
	{
		title: 'Beauty Professionals',
		href: '/belleza/bogota',
		label: 'Beauty',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_belleza_thumb.svg'
	},
	{
		title: 'Wellness',
		href: '/bienestar/bogota',
		label: 'Wellness',
		img: 'https://s3.amazonaws.com/timbrit-produccion/images/uploads/icono_bienestar_602x602_thumb.svg'
	},
	{
		title: 'Carpenters at Home',
		href: '/carpintero/bogota',
		label: 'Carpenter',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_carpintero_thumb.svg'
	},
	{
		title: 'Locksmiths at Home',
		href: '/cerrajero/bogota',
		label: 'Locksmith',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_cerrajero_thumb.svg'
	},
	{
		title: 'Pest Control',
		href: '/control-de-plagas/bogota',
		label: 'Pest Control',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_controldeplagas_thumb.svg'
	},
	{
		title: 'Caregivers at Home',
		href: '/cuidadores/bogota',
		label: 'Caregivers',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_cuidadopersonas_thumb.svg'
	},
	{
		title: 'Interior Designers',
		href: '/decorador/bogota',
		label: 'Designer',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_decorador_thumb.svg'
	},
	{
		title: 'Electricians at Home',
		href: '/electricista/bogota',
		label: 'Electrician',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_electricista_thumb.svg'
	},
	{
		title: 'Events and Parties',
		href: '/eventos-y-fiestas/bogota',
		label: 'Events',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_eventos_thumb.svg'
	},
	{
		title: 'Gas Fitters at Home',
		href: '/gas/bogota',
		label: 'Gas',
		img: 'https://test-timbrit.s3.amazonaws.com/41a8f4e6f8c80285d249e7aee5f8057afa5ff18d_thumb.svg'
	},
	{
		title: 'Blacksmiths at Home',
		href: '/herrero/bogota',
		label: 'Blacksmith',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_herrero_thumb.svg'
	},
	{
		title: 'Installers at Home',
		href: '/instalador/bogota',
		label: 'Installer',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_instalador_thumb.svg'
	},
	{
		title: 'Gardeners at Home',
		href: '/jardinero/bogota',
		label: 'Gardener',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_jardinero_thumb.svg'
	},
	{
		title: 'Cleaning Services',
		href: '/limpieza/bogota',
		label: 'Cleaning',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_limpieza_thumb.svg'
	},
	{
		title: 'Pet Care at Home',
		href: '/mascotas/bogota',
		label: 'Pets',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_mascotas_thumb.svg'
	},
	{
		title: 'Moving Companies',
		href: '/mudanzas/bogota',
		label: 'Moving',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_mudanzas_thumb.svg'
	},
	{
		title: 'Painters at Home',
		href: '/pintor/bogota',
		label: 'Painter',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_pintor_thumb.svg'
	},
	{
		title: 'Pool Services',
		href: '/piscinas/bogota',
		label: 'Pools',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_piscinas_thumb.svg'
	},
	{
		title: 'Plumbing at Home',
		href: '/plomero/bogota',
		label: 'Plumber',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_plomero_thumb.svg'
	},
	{
		title: 'Affordable Renovations',
		href: '/reformas/bogota',
		label: 'Renovations',
		img: 'https://timbrit-produccion.s3.amazonaws.com/reformas_ico5_thumb.svg'
	},
	{
		title: 'Security Companies',
		href: '/seguridad/bogota',
		label: 'Security',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_seguridad_thumb.svg'
	},
	{
		title: 'Upholsterers at Home',
		href: '/tapicero/bogota',
		label: 'Upholsterer',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_tapicero_thumb.svg'
	},
	{
		title: 'Technical Service',
		href: '/tecnico/bogota',
		label: 'Technician',
		img: 'https://s3.amazonaws.com/timbrit-produccion/icono_tecnico_thumb.svg'
	}
]

export const professionals: Professional[] = [
	{
		id: '1',
		name: 'Zivilbau Ingeniería S.A.S.',
		city: 'Bogotá',
		stars: 5,
		description:
			'Empresa de ingeniería civil dedicada a proyectos desde su concepción hasta la ejecución. Experiencia en obras públicas y privadas.',
		photoUrl: 'https://dummyimage.com/80x80/eee/aaa.jpg&text=Zivilbau',
		address: '0x1234567890abcdef1234567890abcdef12345678',
		lastName: '',
		categories: [],
		opinions: []
	},
	{
		id: '2',
		name: 'Proyectos Eléctricos Andina',
		city: 'Medellín',
		stars: 4,
		description:
			'Especialistas en instalaciones eléctricas residenciales e industriales con más de 10 años de trayectoria.',
		address: '0xabcdef1234567890abcdef1234567890abcdef12',
		lastName: '',
		categories: [],
		opinions: []
	},
	{
		id: '3',
		name: 'Carpintería Madero Fino',
		city: 'Cali',
		stars: 5,
		description:
			'Fabricamos muebles a medida con maderas certificadas y diseños personalizados para hogares y oficinas.',
		address: '0x7890abcdef1234567890abcdef1234567890abcd',
		lastName: '',
		categories: [],
		opinions: []
	}
]

export const opinions: Opinion[] = [
	{
		id: '1',
		author: 'Walter H.',
		date: '2025-04-15',
		stars: 5,
		comment:
			'Very professional, knows his craft, and pays great attention to detail. He quoted me for a dining set. Excellent.',
		avatar:
			'https://lh3.googleusercontent.com/a/ACg8ocJ6b2eSfGBTXWv8ZJr0iTzgQdW72ESTkZCNtOHK6wCUzwbV_dwbKg=s96-c',
		verified: true,
		createdAt: ''
	},
	{
		id: '2',
		author: 'Sandra P.',
		date: '2025-03-22',
		stars: 4,
		comment:
			'They delivered on time and within budget. The electrical service was safe and well documented.',
		verified: true,
		createdAt: ''
	},
	{
		id: '3',
		author: 'Luis F.',
		date: '2025-04-02',
		stars: 5,
		comment:
			'Impeccable furniture, excellent finish. I would definitely hire them again.',
		avatar: 'https://dummyimage.com/96x96/ddd/aaa.jpg&text=L',
		createdAt: ''
	},
	{
		id: '4',
		author: 'Valentina R.',
		date: '2025-01-18',
		stars: 3,
		comment:
			'There was a delay in delivery, but the final work was acceptable.',
		verified: false,
		createdAt: ''
	}
]

export const subrubros: Subrubro[] = [
	{
		title: 'Carpintero',
		href: '/carpintero/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_carpintero.png',
		items: [
			'Aberturas de madera',
			'Carpintería general',
			'Machimbre',
			'Muebles',
			'Ebanistería',
			'Aluminio'
		]
	},
	{
		title: 'Decorador',
		href: '/decorador/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_decorador.png',
		items: ['Tapicería', 'Decoración general', 'Interiores']
	},
	{
		title: 'Instalador',
		href: '/instalador/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_instalador.png',
		items: [
			'Muebles de cocina',
			'Cuadros',
			'Armado de muebles',
			'Cortinas',
			'Instalaciones generales'
		]
	},
	{
		title: 'Electricista',
		href: '/electricista/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_electricista_thumb.svg',
		items: [
			'Instalación domiciliaria',
			'Tableros y breakers',
			'Iluminación LED',
			'Certificación RETIE'
		]
	},
	{
		title: 'Plomero',
		href: '/plomero/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_plomero_thumb.svg',
		items: [
			'Destape y mantenimiento',
			'Filtraciones',
			'Cámaras de inspección',
			'Redes sanitarias'
		]
	},
	{
		title: 'Jardinero',
		href: '/jardinero/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_jardinero_thumb.svg',
		items: [
			'Podas',
			'Diseño paisajístico',
			'Sistemas de riego',
			'Fertilización'
		]
	},
	{
		title: 'Pintor',
		href: '/pintor/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_pintor_thumb.svg',
		items: [
			'Interiores y exteriores',
			'Estuco y enchape',
			'Sellado de humedad',
			'Texturizados'
		]
	},
	{
		title: 'Gasista',
		href: '/gas/bogota',
		icon: 'https://test-timbrit.s3.amazonaws.com/41a8f4e6f8c80285d249e7aee5f8057afa5ff18d_thumb.svg',
		items: [
			'Instalaciones residenciales',
			'Conversión de estufas',
			'Mantenimiento preventivo'
		]
	},
	{
		title: 'Cerrajero',
		href: '/cerrajero/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_cerrajero_thumb.svg',
		items: [
			'Apertura de puertas',
			'Cambio de guardas',
			'Copia de llaves',
			'Cerraduras inteligentes'
		]
	},
	{
		title: 'Tapicero',
		href: '/tapicero/bogota',
		icon: 'https://s3.amazonaws.com/timbrit-produccion/icono_tapicero_thumb.svg',
		items: [
			'Restauración de muebles',
			'Tapizado cuero/tela',
			'Espumas y rellenos',
			'Cortes a medida'
		]
	}
]

export const ANIMATIONS = {
	'world-raised-hands': worldRaisedHands,
	'sows-in-the-world': sowsInTheWorld
}

export const IMAGES = {
	'minipay-logo': minipayLogo,
	mentoLogo: mentoLogo
}

// Form constants

export const NAME_MAX: number = 100
export const WEBSITE_MAX: number = 100
export const DESCRIPTION_MAX: number = 500
export const PROGRAM_REQUIREMENTS_MAX: number = 100
export const MAX_FILE_SIZE: number = 5 * 1024 * 1024 // 5 MB
export const VALID_FILE_TYPES: string[] = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/svg+xml'
]

export const ERC20_ABI = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_spender',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_from',
				type: 'address'
			},
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				name: '',
				type: 'uint8'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				name: 'balance',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			},
			{
				name: '_spender',
				type: 'address'
			}
		],
		name: 'allowance',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		payable: true,
		stateMutability: 'payable',
		type: 'fallback'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				name: 'spender',
				type: 'address'
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				name: 'to',
				type: 'address'
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	}
]
