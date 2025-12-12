'use client'

import { ordersStore } from '@/store/OrderStore'

import OrderItemComponent from './OrderItem'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// 🔹 Маленький компонент для фетча замовлень
const OrdersFetcher = observer(({ token }: { token: string }) => {
	useEffect(() => {
		ordersStore.fetchOrders(token)
	}, [token])

	return null
})

// 🔹 Основний компонент
const OrderPageComponent = observer(() => {
	const { orders } = ordersStore
	const [highlightId, setHighlightId] = useState<string | null>(null)

	const { data: session, status } = useSession()
	const token = session?.user?.accessToken

	// 🔹 Підсвічування hash
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
		return () => el.removeEventListener('animationend', handleAnimationEnd)
	}, [highlightId])

	// 🔹 Витягуємо hash після рендера
	useEffect(() => {
		if (typeof window === 'undefined') return
		const id = window.location.hash.slice(1)
		if (id) setTimeout(() => setHighlightId(id), 0)
	}, [])

	// 🔹 Показ логів для debug
	console.log('orders', orders)

	return (
		<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
			{/* Виконуємо фетч тільки якщо токен є */}
			{token && <OrdersFetcher token={token} />}

			{orders.map(order => (
				<OrderItemComponent key={order._id} order={order} />
			))}
		</div>
	)
})

export default OrderPageComponent
