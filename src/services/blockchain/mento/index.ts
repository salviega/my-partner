import {
	createPublicClient,
	createWalletClient,
	custom,
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

const walletClient = createWalletClient({
	chain: celo,
	transport: custom(window.ethereum)
})

export async function sendToken(
	stableToken: Stablecoin,
	to: string,
	amount: string
): Promise<TransactionReceipt> {
	const [account] = await walletClient.getAddresses()
	if (!account) throw new Error('Wallet not connected')

	// const amountWei = parseEther(amount)

	/* 1️⃣  Estimas el gas para la llamada transfer() */
	const gasLimit = await publicClient.estimateContractGas({
		address: stableToken.proxy,
		abi: ERC20_ABI,
		functionName: 'transfer',
		args: ['0x7Db67b92794e2569DAB6A2E38D877900F8883350', '1'],
		account
	})

	/* 2️⃣  Ejecutas writeContract con ese gasLimit */
	const hash = await walletClient.writeContract({
		address: stableToken.proxy,
		abi: ERC20_ABI,
		functionName: 'transfer',
		args: ['0x7Db67b92794e2569DAB6A2E38D877900F8883350', '1'],
		account,
		gas: gasLimit, // ← gas limit ya calculado
		feeCurrency: stableToken.proxy
	})

	/* 3️⃣  Esperas confirmación (opcional) */
	return await publicClient.waitForTransactionReceipt({ hash })
}
