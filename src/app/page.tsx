'use client'

import { JSX, useEffect } from 'react'
import { Address } from 'viem'

import { useStore } from '@/store'

import Home from './home/page'

export default function Root(): JSX.Element {
	const setAddress = useStore(state => state.setAddress)

	useEffect(() => {
		if (window && window.ethereum) {
			if (window.ethereum.isMiniPay) {
				window.ethereum
					.request({
						method: 'eth_requestAccounts',
						params: []
					})
					.then(accounts => {
						const accountList: Address[] = accounts as Address[]
						setAddress(accountList[0])
					})
					.catch(error => {
						console.error('Error requesting accounts:', error)
					})
			}
		}
	}, [setAddress])
	return <Home />
}
