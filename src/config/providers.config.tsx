'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JSX, ReactNode, useState } from 'react'

type Props = {
	children: ReactNode
}

export default function Providers({ children }: Props): JSX.Element {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
