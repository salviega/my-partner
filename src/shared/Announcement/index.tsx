'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
const Player = dynamic(
	() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
	{
		ssr: false
	}
)
import { JSX } from 'react'

import { ANIMATIONS, IMAGES } from '@/constants'

type Props = {
	message?: string
}

export default function Announcement(props: Props): JSX.Element {
	const { message } = props

	return (
		<div className="flex justify-center place-items-center w-full h-screen overflow-hidden">
			<div className="flex flex-col justify-center items-center gap-12">
				<div className="flex items-center space-x-3">
					<p className="text-2xl">{message ? message : 'Only with'}</p>
					<Image
						src={IMAGES['minipay-logo']}
						alt="MiniPay"
						width={80}
						height={80}
						className="rounded-full"
						priority
					/>
				</div>
				<Link href="/">
					<button className="btn btn-soft p-6 text-3xl">Back</button>
				</Link>
				<Player
					autoplay
					loop
					src={ANIMATIONS['world-raised-hands']}
					style={{ height: '400px', width: '400px' }}
					className="flex place-items-center"
				/>
			</div>
		</div>
	)
}
