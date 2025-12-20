import HeaderPage from '@/components/adminUI/HeaderPage'
import OrderPageComponent from '@/components/adminUI/OrderPageComponent'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Замовлення | RW-Trade'
}

export default async function OrdersPage() {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Замовлення' />
			<OrderPageComponent pageName='all' />
		</div>
	)
}
