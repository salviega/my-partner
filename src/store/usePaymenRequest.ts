import { create } from 'zustand'

export interface PaymentRequest {
	amount: string
	currency: string
	requester: string
}

type PaymentRequestStore = {
	paymentRequest: PaymentRequest | null
	setPaymentRequest: (paymentRequest: PaymentRequest) => void
	clearPaymentRequest: () => void
}

export const usePaymentRequestStore = create<PaymentRequestStore>(set => ({
	paymentRequest: null,
	setPaymentRequest: paymentRequest => set({ paymentRequest }),
	clearPaymentRequest: () => set({ paymentRequest: null })
}))
