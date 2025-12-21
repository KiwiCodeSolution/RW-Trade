import HeaderPage from '@/components/adminUI/HeaderPage'
import OrderPageComponent from '@/components/adminUI/OrderPageComponent'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Історія замовлень | RW-Trade'
}
const HistoryPage = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Історія замовлень' />
			<OrderPageComponent pageName='history' />
		</div>
	)
}

export default HistoryPage
