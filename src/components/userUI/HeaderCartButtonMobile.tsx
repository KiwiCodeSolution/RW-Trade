'use client'

import { CartIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import BaseModal from '../commonUI/modal/BaseModal'

import CartComponent from './CartComponent'
import CartCount from './CartCount'

import { useState } from 'react'

const HeaderCartButtonMobile = ({ locale }: { locale: Locale }) => {
	const [isShowModal, setIsShowModal] = useState(false)
	return (
		<>
			<button
				className='w-10 h-10 relative rounded-full'
				onClick={() => setIsShowModal(true)}
			>
				<CartIcon />
				<CartCount />
			</button>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title={locale === 'uk' ? 'Оформлення замовлення' : 'Order'}
				>
					<CartComponent step={1} onClose={() => setIsShowModal(false)} />
				</BaseModal>
			)}
		</>
	)
}
export default HeaderCartButtonMobile
