import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { JSX } from 'react'

import Providers from '@/config/providers.config'

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

declare global {
	interface Window {
		ethereum?: {
			isMiniPay?: boolean
			request: (args: {
				method: string
				params?: unknown[]
			}) => Promise<unknown>
		}
	}
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
				<Providers>{props.children}</Providers>
			</body>
		</html>
	)
}
