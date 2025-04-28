'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JSX, ReactNode, useEffect, useState } from 'react'
import { Address } from 'viem'

import Announcement from '@/shared/Announcement'
import Spinner from '@/shared/Spinner'
import { useStore as useStoreApp } from '@/store'

type Props = {
	children: ReactNode
}

export default function Providers({ children }: Props): JSX.Element {
	// store
	const isAddressSeted = useStoreApp(state => state.isAddressSeted)
	const setAddress = useStoreApp(state => state.setAddress)

	// hooks
	const [checkingMiniPay, setCheckingMiniPay] = useState<boolean>(true)
	const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

	const [queryClient] = useState(() => new QueryClient())

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

		if (!isAddressSeted) {
			checkMiniPay()
		} else {
			setCheckingMiniPay(false)
		}
	}, [isAddressSeted, setAddress])

	if (checkingMiniPay)
		return (
			<div className="flex justify-center items-center w-full h-screen">
				<Spinner />
			</div>
		)

	if (!isAddressSeted || !currentAddress) return <Announcement />

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
