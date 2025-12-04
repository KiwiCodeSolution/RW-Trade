import HeaderPage from '@/components/adminUI/HeaderPage'
import OrderPageComponent from '@/components/adminUI/OrderPageComponent'

import { Order } from '@/types/baseTypes'

import { getOrders } from '@/api/orders'

import { authOptions } from '@/lib/authOptions'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Замовлення | RW-Trade'
}

export default async function OrdersPage() {
	const session = await getServerSession(authOptions)
	const token = { token: session?.user?.accessToken }

	if (!token) return null
	if (!session?.user?.accessToken) return null

	const orders: Order[] = await getOrders(session?.user?.accessToken || '')

	return (
		<div className='w-full'>
			<HeaderPage pageName='Замовлення' />
			<OrderPageComponent orders={orders} token={session.user.accessToken} />
		</div>
	)
}
