'use client'

import { ProductPrint } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import BaseModal from '../commonUI/modal/BaseModal'

import CartComponent from './CartComponent'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const CartButtons = observer(({ product, locale }: ProductPrint) => {
	const [isShowModal, setIsShowModal] = useState(false)

	function handleBuyInOneClick() {
		cartStore.oneStepBuy(product, 1)
		setIsShowModal(true)
	}
	return (
		<>
			<button
				onClick={() => {
					cartStore.increment(product)
					// або на сторінку форми оформлення
				}}
				className='w-full h-12 rounded-[32px] text-white text-xl font-bold flex items-center justify-center bg-bg-green hover:shadow-lg'
			>
				{locale === 'en' ? 'Add to cart' : 'Додати в кошик'}
			</button>
			<button
				onClick={() => {
					handleBuyInOneClick()
				}}
				className='w-full h-12 rounded-[32px] text-white text-xl font-bold flex items-center justify-center bg-bronze hover:shadow-lg'
			>
				{locale === 'en' ? 'Buy in 1 click' : 'Купити в 1 клік'}
			</button>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Оформлення замовлення'
				>
					<CartComponent step={2} type='oneClick' />
				</BaseModal>
			)}
		</>
	)
})
export default CartButtons
