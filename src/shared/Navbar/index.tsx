import Link from 'next/link'
import { JSX, useEffect, useState } from 'react'

export default function Navbar(): JSX.Element {
	const [isInMiniPay, setIsInMiniPay] = useState<boolean>(false)

	useEffect(() => {
		if (window && window.ethereum) {
			if (window.ethereum.isMiniPay) {
				setIsInMiniPay(true)

				window.ethereum
					.request({
						method: 'eth_requestAccounts',
						params: []
					})
					.then((accounts: string[]) => {
						console.log(accounts[0])
					})
					.catch((error: any) => {
						console.error('Error requesting accounts:', error)
					})
			}
		}
	}, [])

	return (
		<div className="navbar bg-base-100 shadow-sm">
			{/* Start de la navbar */}
			<div className="navbar-start">
				{/* Responsive menu */}
				{isInMiniPay && (
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
					</div>
				)}

				{/* Logo */}
				<Link href="/">
					<p className="btn btn-ghost bg-base-100 text-xl">My Partner 👷</p>
				</Link>
			</div>

			{/* Navbar central */}
			<div className="navbar-center"></div>

			{/* Final de la navbar */}
			<div className="navbar-end"></div>
		</div>
	)
}

type ModalProps = {
	isInMiniPay: boolean
}

// export function Modal(props: ModalProps): JSX.Element {
// 	const { isInMiniPay } = props

// 	const [url, setUrl] = useState<string>('')
// 	const modalRef = useRef<HTMLDialogElement>(null)
// 	const dropdownRef = useRef<HTMLDivElement>(null)

// 	useEffect(() => {
// 		setUrl(window.location.origin + '/register')
// 	}, [])

// 	const openModal = (): void => {
// 		modalRef.current?.showModal()
// 	}

// 	const handleQrClick = (): void => {
// 		// Cierra el modal
// 		modalRef.current?.close()

// 		// Cierra el dropdown
// 		if (dropdownRef.current) {
// 			const activeElement = document.activeElement as HTMLElement
// 			if (activeElement) {
// 				activeElement.blur() // Esto simula un "click fuera" para cerrar el menú hamburguesa
// 			}
// 		}
// 	}

// 	return (
// 		<div ref={dropdownRef}>
// 			<button className="btn btn-ghost bg-base-100 text-xl" onClick={openModal}>
// 				Register
// 			</button>
// 			<dialog id="my_modal_1" className="modal" ref={modalRef}>
// 				<div className="modal-box">
// 					<h3 className="font-bold text-lg">Hello!</h3>
// 					<div className="flex items-center py-4 space-x-1">
// 						<Image
// 							src={IMAGES['minipay-logo']}
// 							alt="Minipay Logo"
// 							width={72} // Adjust width as needed
// 							height={72} // Adjust height as needed
// 							className="rounded-sm"
// 						/>
// 						/>
// 					</div>
// 					<div className="flex flex-col items-center">
// 						<div className="flex justify-center p-3 max-w-max bg-green-100 rounded-lg">
// 							{!isInMiniPay ? (
// 								<Link
// 									to="https://aac2-186-84-90-116.ngrok-free.app/register"
// 									onClick={handleQrClick} // <<--- Agregado aquí
// 								>
// 									<QRCode value={url} />
// 								</Link>
// 							) : (
// 								<QRCode value={url} />
// 							)}
// 						</div>
// 					</div>
// 					<div className="modal-action">
// 						<form method="dialog">
// 							<button className="btn">Close</button>
// 						</form>
// 					</div>
// 				</div>
// 			</dialog>
// 		</div>
// 	)
// }
