'use client'

import { JSX, useEffect, useState } from 'react'
import { Address } from 'viem'

import Spinner from '@/shared/Spinner'
import { useStore } from '@/store'

import Home from './home/page'

export default function Root(): JSX.Element {
	// store
	const getUser = useStore(state => state.getUser)
	const getProfessionalByAddress = useStore(
		state => state.getProfessionalByAddress
	)
	const user = useStore(state => state.user)
	const isSettingProfessional = useStore(state => state.isSettingProfessional)
	const isSettingUser = useStore(state => state.isSettingUser)

	// hooks
	const [checkingMiniPay, setCheckingMiniPay] = useState(true)

	useEffect(() => {
		async function checkMiniPay(): Promise<void> {
			if (typeof window !== 'undefined' && window.ethereum?.isMiniPay) {
				if (!user) {
					try {
						const accounts = await window.ethereum.request({
							method: 'eth_requestAccounts'
						})

						const accountList = accounts as Address[]
						getUser(accountList[0])
						getProfessionalByAddress(accountList[0])
					} catch (error) {
						console.error('Error requesting accounts:', error)
					}
				}
			}

			// Hardcoded address for testing
			// getUser(zeroAddress)
			// getProfessionalByAddress(zeroAddress)

			setCheckingMiniPay(false)
		}

		// Only check if address is not set yet
		if (!user) {
			checkMiniPay()
		} else {
			setCheckingMiniPay(false)
		}
	}, [user, getProfessionalByAddress, getUser])

	// Still checking MiniPay
	if (checkingMiniPay || isSettingUser || isSettingProfessional)
		return (
			<div className="flex justify-center items-center w-full h-screen">
				<Spinner />
			</div>
		)

	// Checked MiniPay, no address detected
	// if (!isSettingUser && !user) return <Announcement />

	// Address detected
	return <Home />
}
