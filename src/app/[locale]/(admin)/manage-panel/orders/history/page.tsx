import HeaderPage from '@/components/adminUI/HeaderPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Історія замовлень | RW-Trade'
}
const HistoryPage = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Історія замовлень' />
		</div>
	)
}

export default HistoryPage
