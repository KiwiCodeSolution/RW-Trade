import HeaderPage from '@/components/adminUI/HeaderPage'
import StatisticPageComponent from '@/components/adminUI/StatisticPageComponent'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Статистика | RW-Trade'
}
const Statistics = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Статистика' />
			<StatisticPageComponent />
		</div>
	)
}

export default Statistics
