'use client'

import { Locale, Product } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'

const CartButtons = observer(({ product, locale }: { product: Product; locale: Locale }) => {
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
					cartStore.oneStepBuy(product, 1)
					// або на сторінку форми оформлення
				}}
				className='w-full h-12 rounded-[32px] text-white text-xl font-bold flex items-center justify-center bg-bronze hover:shadow-lg'
			>
				{locale === 'en' ? 'Buy in 1 click' : 'Купити в 1 клік'}
			</button>
		</>
	)
})
export default CartButtons
