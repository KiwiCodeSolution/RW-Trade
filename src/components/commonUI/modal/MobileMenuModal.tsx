import { CrossGrad } from '@/assets/icons'

import Backdrop from './Backdrop'
import ModalPortal from './ModalPortal'

type MobileMenuModalProps = {
	children: React.ReactNode
	onClose?: () => void
	className?: string
	isOpen: boolean
}

const MobileMenuModal = ({ children, onClose, className, isOpen }: MobileMenuModalProps) => {
	if (!isOpen) return null

	return (
		<ModalPortal>
			<Backdrop onClose={onClose} closeOnOverlayClick closeOnEsc typeModal='menu'>
				<div
					className={`lg:hidden w-full min-h-[400px] rounded-md bg-white ${className} product-card-shadow border-2 border-sc-1`}
				>
					<div
						className={`w-full h-full rounded-md p-2 mob-menu relative flex flex-col gap-y-3 py-2.5 px-2 `}
					>
						<button
							onClick={onClose}
							className='w-8 h-8 rounded-full bg-primary p-0.5 flex items-center justify-center'
						>
							<div className='w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center bg-bg-light'>
								<CrossGrad />
							</div>
						</button>

						{children}
					</div>
				</div>
			</Backdrop>
		</ModalPortal>
	)
}
export default MobileMenuModal
