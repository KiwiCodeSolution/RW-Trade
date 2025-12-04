'use client'

import { Order } from '@/types/baseTypes'

import OrderItemComponent from './OrderItem'

import { useEffect, useState } from 'react'

const OrderPageComponent = ({ orders, token }: { orders: Order[]; token: string }) => {
	const [highlightId, setHighlightId] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const id = window.location.hash.slice(1)
			if (id) setTimeout(() => setHighlightId(id), 0)
		}
	}, [])

	useEffect(() => {
		if (!highlightId) return

		const el = document.getElementById(`title-${highlightId}`)
		if (!el) return

		el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		el.classList.add('blink-blue')

		const handleAnimationEnd = () => {
			el.classList.remove('blink-blue')
		}

		el.addEventListener('animationend', handleAnimationEnd)

		return () => {
			el.removeEventListener('animationend', handleAnimationEnd)
		}
	}, [highlightId])

	return (
		<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
			{orders.map(order => (
				<OrderItemComponent key={order._id} order={order} token={token} />
			))}
		</div>
	)
}

export default OrderPageComponent
