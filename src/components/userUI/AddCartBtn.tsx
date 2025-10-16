'use client'

import { Cart } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'

const AddCartBtn = observer(({ product }: { product: Product }) => {
	const { addProductToCart } = cartStore

	return (
		<button
			className='w-[64px] h-[64px] rounded-lg p-2 bg-bg-green cursor-pointer flex items-center justify-center hover:shadow-2xl'
			onClick={() => addProductToCart(product)}
		>
			<Cart color='#ffffff' />
		</button>
	)
})

export default AddCartBtn
