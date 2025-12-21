'use client'

import { Cart } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'

const AddCartBtn = observer(
	({
		product,
		typePage,
		type = 'our'
	}: {
		product: Product
		typePage?: 'client' | 'admin'
		type?: 'our' | 'partners'
	}) => {
		// const { addProductToCart } = cartStore

		return (
			<button
				className={`${typePage === 'admin' ? 'w-11 h-11' : type === 'partners' ? 'w-11 h-11' : 'w-11 h-11 xl:w-[64px] xl:h-[64px]'} rounded-lg p-2 bg-bg-green cursor-pointer flex items-center justify-center hover:shadow-2xl`}
				onClick={() => cartStore.increment(product)}
			>
				<Cart variant='white' />
			</button>
		)
	}
)

export default AddCartBtn
