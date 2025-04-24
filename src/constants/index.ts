import { Subrubro } from '@/app/Home/componets/Subrubros'
import sowsInTheWorld from '@/assets/lottie/sows-in-the-world.json'
import worldRaisedHands from '@/assets/lottie/world-raised-hands.json'

import { Category, Opinion, Professional } from '../models'

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
		id: 1,
		name: 'Zivilbau Ingeniería S.A.S.',
		city: 'Bogotá',
		stars: 5,
		description:
			'Empresa de ingeniería civil dedicada a proyectos desde su concepción hasta la ejecución. Experiencia en obras públicas y privadas.'
	},
	{
		id: 2,
		name: 'Proyectos Eléctricos Andina',
		city: 'Medellín',
		stars: 4,
		description:
			'Especialistas en instalaciones eléctricas residenciales e industriales con más de 10 años de trayectoria.'
	},
	{
		id: 3,
		name: 'Carpintería Madero Fino',
		city: 'Cali',
		stars: 5,
		description:
			'Fabricamos muebles a medida con maderas certificadas y diseños personalizados para hogares y oficinas.'
	}
]

export const opinions: Opinion[] = [
	{
		id: 1,
		author: 'Walter H.',
		date: '2025-04-15',
		stars: 5,
		comment:
			'Muy profesional, conoce su labor, tiene bastante detalle en su trabajo. Me cotizó un comedor. Excelente.',
		avatar:
			'https://lh3.googleusercontent.com/a/ACg8ocJ6b2eSfGBTXWv8ZJr0iTzgQdW72ESTkZCNtOHK6wCUzwbV_dwbKg=s96-c',
		verified: true
	},
	{
		id: 2,
		author: 'Sandra P.',
		date: '2025-03-22',
		stars: 4,
		comment:
			'Cumplieron con el tiempo y presupuesto. El servicio eléctrico fue seguro y bien documentado.',
		verified: true
	},
	{
		id: 3,
		author: 'Luis F.',
		date: '2025-04-02',
		stars: 5,
		comment:
			'Muebles impecables, excelente terminación. Volvería a contratarlos sin duda.',
		avatar: 'https://dummyimage.com/96x96/ddd/aaa.jpg&text=L'
	},
	{
		id: 4,
		author: 'Valentina R.',
		date: '2025-01-18',
		stars: 3,
		comment:
			'Hubo una demora en la entrega, pero el trabajo final fue aceptable.',
		verified: false
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
