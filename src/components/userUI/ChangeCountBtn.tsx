'use client'

import { Minus, Plus } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { OrderItem, cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type Props = {
	product: Product | OrderItem
}

const ChangeCountBtn = observer(({ product }: Props) => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	// визначаємо id
	const productId = '_id' in product ? product._id : product.productId
	const item = cartStore.items.find(i => i.productId === productId)

	return (
		<div className='flex gap-x-6 items-center'>
			<button
				onClick={() => cartStore.decrement(product as Product)}
				className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'
			>
				<Minus />
			</button>
			<span className='text-xl'>{item?.quantity ?? 0}</span>
			<button
				onClick={() => cartStore.increment(product as Product)}
				className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'
			>
				<Plus />
			</button>
		</div>
	)
})

export default ChangeCountBtn
