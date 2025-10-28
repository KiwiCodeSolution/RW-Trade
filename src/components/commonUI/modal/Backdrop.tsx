'use client'

import { ReactNode, useEffect } from 'react'

type BackdropProps = {
	children?: ReactNode
	className?: string
	onClose?: () => void
	closeOnOverlayClick?: boolean
	closeOnEsc?: boolean
}

const Backdrop = ({
	children,
	className = '',
	onClose,
	closeOnOverlayClick = true,
	closeOnEsc = true
}: BackdropProps) => {
	useEffect(() => {
		const scrollY = window.scrollY
		const body = document.body

		body.style.position = 'fixed'
		body.style.top = `-${scrollY}px`
		body.style.left = '0'
		body.style.right = '0'
		body.style.overflow = 'hidden'
		body.style.width = '100%'

		return () => {
			const storedScrollY = body.style.top
			body.style.position = ''
			body.style.top = ''
			body.style.left = ''
			body.style.right = ''
			body.style.overflow = ''
			body.style.width = ''

			window.scrollTo(0, parseInt(storedScrollY || '0') * -1)
		}
	}, [])

	useEffect(() => {
		if (!onClose || !closeOnEsc) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [onClose, closeOnEsc])

	function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
		if (!onClose || !closeOnOverlayClick) return
		if (e.target === e.currentTarget) onClose()
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (!onClose) return
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			onClose()
		}
	}

	const interactive = Boolean(onClose)

	return (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<section
			role='dialog'
			aria-modal='true'
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={interactive ? 0 : -1}
			onKeyDown={interactive ? handleKeyDown : undefined}
			className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(203,200,194,0.76)] backdrop-blur-sm ${className}`}
			onClick={handleOverlayClick}
		>
			{children}
		</section>
	)
}

export default Backdrop
