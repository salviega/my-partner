'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { JSX, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import StarRating from '@/app/console/chats/components/StartRating'
import { DESCRIPTION_MAX } from '@/constants'
import { handleError } from '@/helpers'
import { OpinionDto, Professional, Stablecoin } from '@/models'
import { sendToken } from '@/services/blockchain/mento'
import { professionalsService } from '@/services/firebase/professionls'
import { useStore } from '@/store'

const schema = z.object({
	comment: z.string().min(10, 'Description must be at least 10 characters'),
	stars: z
		.number({ required_error: 'Select a rating' })
		.min(1, 'Select a rating')
		.max(5)
})

type Form = z.infer<typeof schema>

type Props = {
	amount: string
	selectedProfessional: Professional
	selectedStablecoin: Stablecoin
}

export default function Modal(props: Props): JSX.Element {
	const { amount, selectedProfessional, selectedStablecoin } = props

	// form
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<Form>({
		resolver: zodResolver(schema),
		defaultValues: { stars: 0, comment: '' }
	})

	const watchComment = watch('comment') || ''

	// services
	const { addOpinion } = professionalsService()

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (opinion: OpinionDto) =>
			addOpinion(selectedProfessional.id || '', opinion),

		onSuccess: (_data: Professional) => {
			toast.success('Opinion added successfully')
			router.push('/')
			reset()
			destroyStore()
		},

		onError: (error: Error) => {
			toast.error(`Error registering professional: ${handleError(error)}`)
		}
	})

	// store
	const destroyStore = useStore(state => state.destroyStore)

	// hooks
	const router = useRouter()
	const [rating, setRating] = useState<number>(selectedProfessional.stars)
	const modalRef = useRef<HTMLDialogElement>(null)
	const [sending, setSending] = useState<boolean>(false)

	const openModal = async () => {
		if (sending) return
		setSending(true)

		try {
			const receipt = await sendToken(
				selectedStablecoin,
				selectedProfessional.address,
				amount
			)

			toast.success(`Tx hash: ${receipt.transactionHash.slice(0, 10)}…`)
			modalRef.current?.showModal()
		} catch (err) {
			toast.error(handleError(err))
		} finally {
			setSending(false)
		}
	}

	const onSubmit = async (data: Form): Promise<void> => {
		try {
			const timestamp: number = Math.floor(Date.now() / 1000)

			const opinion: OpinionDto = {
				...data,
				author: selectedProfessional.address,
				createdAt: timestamp
			}

			mutateAsync(opinion)
		} catch (error) {
			toast.error(`Error: ${handleError(error)}`)
		}
	}

	return (
		<>
			<button className="btn" onClick={openModal}>
				{sending ? 'Sending...' : `Calify`}
			</button>

			{/* Attach the ref here */}
			<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<div className="flex flex-col items-center space-y-3 w-full">
						<h3 className="text-2xl font-semibold">
							{selectedProfessional.name} {selectedProfessional.lastName}
						</h3>
						<Image
							src={
								selectedProfessional.photoUrl
									? selectedProfessional.photoUrl
									: `https://dummyimage.com/80x80/eee/aaa.jpg&text=${selectedProfessional.name.charAt(0).toUpperCase()}`
							}
							alt={selectedProfessional.name}
							width={250}
							height={250}
							className="rounded-full object-cover"
						/>

						{/* Form */}
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col items-center space-y-3 w-full"
						>
							<fieldset
								disabled={isPending || isSubmitting}
								className={`
               flex flex-col items-center space-y-6 w-full mx-auto p-6
               
               ${isPending || isSubmitting ? 'bg-gray-100 opacity-50' : ''}
             `}
							>
								<StarRating
									value={rating}
									onChange={(value: number) => {
										setRating(value)
										setValue('stars', value, { shouldValidate: true }) // formulario
									}}
									size="text-4xl"
								/>

								{errors.stars && (
									<p className="text-red-500 text-sm">{errors.stars.message}</p>
								)}

								<div className="w-full">
									<textarea
										rows={4}
										placeholder="Commentary"
										{...register('comment')}
										className="textarea textarea-bordered w-full"
										disabled={isSubmitting}
									/>
									{errors.comment && (
										<p className="text-red-500 text-sm">
											{errors.comment.message}
										</p>
									)}
									<p className="mt-1 mr-1 text-right text-gray-500">
										{watchComment.length}/{DESCRIPTION_MAX}
									</p>
								</div>

								<button
									type="submit"
									className="btn bg-orange-500 text-white hover:bg-orange-600"
								>
									{isSubmitting ? 'Califying…' : 'Calify service'}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</dialog>
		</>
	)
}
