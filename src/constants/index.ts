import sowsInTheWorld from '@/assets/lottie/sows-in-the-world.json'
import worldRaisedHands from '@/assets/lottie/world-raised-hands.json'

import { Category, Professional } from '../models'

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

export const ANIMATIONS = {
	'world-raised-hands': worldRaisedHands,
	'sows-in-the-world': sowsInTheWorld
}
