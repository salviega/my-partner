'use client'

import { JSX, useEffect, useState } from 'react'
import { Address } from 'viem'

import { useStore } from '@/store'

import Home from './home/page'

export default function Root(): JSX.Element {
	const isAddressSeted = useStore(state => state.isAddressSeted)
	const setAddress = useStore(state => state.setAddress)
	const [checkingMiniPay, setCheckingMiniPay] = useState(true)
	const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

	useEffect(() => {
		async function checkMiniPay(): Promise<void> {
			if (typeof window !== 'undefined' && window.ethereum?.isMiniPay) {
				try {
					const accounts = await window.ethereum.request({
						method: 'eth_requestAccounts'
					})

					const accountList = accounts as Address[]
					setCurrentAddress(accountList[0])
					setAddress(accountList[0])
				} catch (error) {
					console.error('Error requesting accounts:', error)
				}
			}
			setCheckingMiniPay(false)
		}

		// Only check if address is not set yet
		if (!isAddressSeted) {
			checkMiniPay()
		} else {
			setCheckingMiniPay(false)
		}
	}, [isAddressSeted, setAddress])

	// Still checking MiniPay
	// if (checkingMiniPay)
	// 	return (
	// 		<div className="flex justify-center items-center w-full h-screen">
	// 			<Spinner />
	// 		</div>
	// 	)

	// Checked MiniPay, no address detected
	// if (!isAddressSeted || !currentAddress) return <Announcement />

	// Address detected
	return <Home />
}
