import HeaderPage from '@/components/adminUI/HeaderPage'
import NotificationsComponent from '@/components/adminUI/NotificationsComponent'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Сповіщення | RW-Trade'
}

export default async function Notifications() {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Сповіщення' />
			<NotificationsComponent />
		</div>
	)
}
