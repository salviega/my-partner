import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { JSX } from 'react'

import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'My Partner',
	description: 'Call your trusted partner'
}

type Props = {
	children: React.ReactNode
}

export default function RootLayout(props: Props): JSX.Element {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{props.children}
			</body>
		</html>
	)
}
