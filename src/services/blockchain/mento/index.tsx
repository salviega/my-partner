'use client'
import {
	createPublicClient,
	createWalletClient,
	custom,
	EIP1193Provider,
	http,
	TransactionReceipt
} from 'viem'
import { celo } from 'viem/chains'

import { ERC20_ABI } from '@/constants'
import { Stablecoin } from '@/models'

const publicClient = createPublicClient({
	chain: celo,
	transport: http()
})

// Check if ethereum provider exists
if (typeof window === 'undefined' || !window.ethereum) {
	console.error('Ethereum provider not found')
}
const walletClient = createWalletClient({
	chain: celo,
	transport: custom(window.ethereum as EIP1193Provider)
})

export async function sendToken(
	stableToken: Stablecoin,
	to: string,
	amount: string
): Promise<TransactionReceipt> {
	const [account] = await walletClient.getAddresses()
	if (!account) throw new Error('Wallet not connected')

	/* 1️⃣  Estimas el gas para la llamada transfer() */
	const gasLimit = await publicClient.estimateContractGas({
		address: stableToken.proxy,
		abi: ERC20_ABI,
		functionName: 'transfer',
		args: [to, amount],
		account
	})

	/* 2️⃣  Ejecutas writeContract con ese gasLimit */
	const hash = await walletClient.writeContract({
		address: stableToken.proxy,
		abi: ERC20_ABI,
		functionName: 'transfer',
		args: [to, amount],
		account,
		gas: gasLimit, // ← gas limit ya calculado
		feeCurrency: stableToken.proxy
	})

	/* 3️⃣  Esperas confirmación (opcional) */
	return await publicClient.waitForTransactionReceipt({ hash })
}
