'use client'

import CartIcon from '@/assets/icons/cart-bronze-50.svg'

import BaseModal from '../commonUI/modal/BaseModal'

import CartComponent from './CartComponent'
import CartCount from './CartCount'

import { useState } from 'react'

const HeaderCartButton = () => {
	const [isShowModal, setIsShowModal] = useState(false)
	return (
		<>
			<button
				className='w-[50px] h-[50px] relative rounded-full hover:shadow-lg hover:scale-102 duration-200'
				onClick={() => setIsShowModal(true)}
			>
				<CartIcon />
				<CartCount />
			</button>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Оформлення замовлення'
				>
					<CartComponent step={1} onClose={() => setIsShowModal(false)} />
				</BaseModal>
			)}
		</>
	)
}
export default HeaderCartButton
