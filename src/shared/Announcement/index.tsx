'use client'

import Image from 'next/image'
import Link from 'next/link'
// import { Player } from '@lottiefiles/react-lottie-player'
import { JSX } from 'react'

import { IMAGES } from '@/constants'

export default function Announcement(): JSX.Element {
	return (
		<div className="flex justify-center place-items-center w-full h-screen overflow-hidden">
			<div className="flex flex-col justify-center items-center gap-12">
				<div className="flex items-center space-x-3">
					<p className="text-2xl">Only with</p>
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
				{/* <Player
					autoplay
					loop
					src={ANIMATIONS['world-raised-hands']}
					style={{ height: '400px', width: '400px' }}
					className="flex place-items-center"
				/> */}
			</div>
		</div>
	)
}
