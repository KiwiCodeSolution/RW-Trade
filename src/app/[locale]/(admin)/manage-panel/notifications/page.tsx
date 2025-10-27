import HeaderPage from '@/components/adminUI/HeaderPage'
import Notice from '@/components/adminUI/Notice'

import { Notification } from '@/types/baseTypes'

import { getAllNotifications } from '@/api/notification'

import { authOptions } from '@/lib/authOptions'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Сповіщення | RW-Trade'
}

export default async function Notifications() {
	const session = await getServerSession(authOptions)
	const token = { token: session?.user?.accessToken }

	if (!token) return null
	if (!session?.user?.accessToken) return null

	const notifications: Notification[] = await getAllNotifications(
		session?.user?.accessToken || ''
	)

	//сортуємо по статусу (сповіщення прочитані/непрочитані) та даті
	notifications.sort((a, b) => {
		const aVal = a.status === 'unread' ? 1 : 0
		const bVal = b.status === 'unread' ? 1 : 0

		if (bVal - aVal !== 0) return bVal - aVal
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div className='w-full'>
			<HeaderPage pageName='Сповіщення' />
			<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
				{notifications.map(notification => (
					<Notice
						key={notification._id}
						notice={notification}
						token={session.user.accessToken}
					/>
				))}
			</div>
		</div>
	)
}
