'use client'

import { cartStore } from '@/store/CartStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const CartCount = observer(() => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const totalItems = cartStore.totalItems

	return (
		<div className='w-5 h-5 rounded-full bg-bg-green flex items-center justify-center absolute top-[0px] right-[0px]'>
			<span className='text-white text-[11px]'>{totalItems ?? 0}</span>
		</div>
	)
})
export default CartCount
