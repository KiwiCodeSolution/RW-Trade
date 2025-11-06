'use client'

import { Minus, Plus } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const ChangeCountBtn = observer(({ product }: { product: Product }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const item = cartStore.items.find(i => i.productId === product._id)

	if (!mounted) return null

	return (
		<div className='flex gap-x-6 items-center'>
			<button
				onClick={() => cartStore.decrement(product)}
				className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'
			>
				<Minus />
			</button>
			<span className='text-xl'>{item?.quantity ?? 0}</span>

			<button
				onClick={() => cartStore.increment(product)}
				className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'
			>
				<Plus />
			</button>
			<span></span>
		</div>
	)
})
export default ChangeCountBtn
