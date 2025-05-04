'use client'
import { JSX } from 'react'

export default function Footer(): JSX.Element {
	return (
		<footer className="footer flex justify-between sm:footer-horizontal bg-base-100 items-center p-4 text-gray-600">
			{/* Sección izquierda: Logo + texto */}
			<aside className="flex flex-col items-start">
				<p>Made with love ❤️</p>
			</aside>

			{/* Sección derecha: Iconos sociales */}
			<nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
				<a href="https://github.com/salviega/my-partner" aria-label="GitHub">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="fill-current"
					>
						<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.73 1.26 3.4.96.1-.76.4-1.26.72-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.18-3.08-.12-.3-.5-1.52.1-3.17 0 0 .97-.3 3.2 1.18a11.1 11.1 0 0 1 5.8 0c2.22-1.48 3.18-1.18 3.18-1.18.6 1.65.22 2.87.1 3.17.74.8 1.18 1.82 1.18 3.08 0 4.43-2.7 5.4-5.26 5.7.42.36.8 1.06.8 2.14v3.17c0 .3.2.65.8.54A10.99 10.99 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"></path>
					</svg>
				</a>
				<a href="https://youtu.be/gA3t5vE-xxM" aria-label="YouTube">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="fill-current"
					>
						<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
					</svg>
				</a>
			</nav>
		</footer>
	)
}
