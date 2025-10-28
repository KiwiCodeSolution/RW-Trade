import { CrossGrad } from '@/assets/icons'

import Backdrop from './Backdrop'
import ModalPortal from './ModalPortal'
import ModalTitle from './ModalTitle'

import React from 'react'

type ModalProps = {
	children: React.ReactNode
	title?: string
	onClose?: () => void
	className?: string
	isShowLogo?: boolean
	isOpen: boolean
}

const BaseModal = ({
	children,
	title,
	onClose,
	className,
	isShowLogo = false,
	isOpen
}: ModalProps) => {
	if (!isOpen) return null

	return (
		<ModalPortal>
			<Backdrop onClose={onClose} closeOnOverlayClick closeOnEsc>
				<div
					className={`min-w-[720px] min-h-[400px] xl:min-w-[720px] xl:min-h-[400px] rounded-3xl p-2 bg-bg-light relative ${className}`}
				>
					{title && <ModalTitle title={title} isShowLogo={isShowLogo} />}
					{children}
					<button
						onClick={onClose}
						className='w-8 h-8 rounded-full bg-primary p-0.5 flex items-center justify-center absolute top-2 right-2'
					>
						<div className='w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center bg-bg-light'>
							<CrossGrad />
						</div>
					</button>
				</div>
			</Backdrop>
		</ModalPortal>
	)
}

export default BaseModal
