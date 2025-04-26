'use client'

import { JSX, useEffect, useState } from 'react'

type AlertType = 'success' | 'warning' | 'error'

type AlertPosition =
	| 'top'
	| 'bottom'
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'

type Props = {
	message: string
	type?: AlertType
	position?: AlertPosition
	duration?: number
}

// Este es el estado global interno

export default function Alert(): JSX.Element | null {
	const [alert, setAlert] = useState<Props | null>(null)
	const [visible, setVisible] = useState<boolean>(false)

	useEffect(() => {
		showAlertInternal = (props: Props): void => {
			setAlert(props)
			setVisible(true)
			setTimeout(() => setVisible(false), props.duration || 3000)
		}
	}, [])

	if (!visible || !alert) return null

	const { message, type = 'success', position = 'top' } = alert

	const typeClasses = {
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	}

	const positionClasses = {
		top: 'top-4 left-1/2 transform -translate-x-1/2',
		bottom: 'bottom-4 left-1/2 transform -translate-x-1/2',
		'top-left': 'top-4 left-4',
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'bottom-right': 'bottom-4 right-4'
	}

	const icon = {
		success: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M5 13l4 4L19 7"
				/>
			</svg>
		),
		warning: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		),
		error: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		)
	}

	return (
		<div
			role="alert"
			className={`alert ${typeClasses[type]} fixed ${positionClasses[position]} transition-all duration-500 ease-in-out animate-fade-in-out`}
		>
			{icon[type]}
			<span>{message}</span>
		</div>
	)
}

let showAlertInternal: ((props: Props) => void) | null = null

export function showAlert(props: Props): void {
	if (showAlertInternal) {
		showAlertInternal(props)
	} else {
		console.warn('⚠️ Alert system not ready yet')
	}
}
