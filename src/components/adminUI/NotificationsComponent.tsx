'use client'

import { notificationsStore } from '@/store/NotificationsStore'

import Notice from './Notice'
import { useRouter } from '@/i18n/navigation'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const NotificationsComponent = observer(() => {
	const { notifications, fetchNotifications } = notificationsStore
	const router = useRouter()

	useEffect(() => {
		if (notifications.length === 0) fetchNotifications(router)
	}, [])

	//сортуємо по статусу (сповіщення прочитані/непрочитані) та даті
	const sortedNotifications = notifications.slice().sort((a, b) => {
		const aVal = a.status === 'unread' ? 1 : 0
		const bVal = b.status === 'unread' ? 1 : 0

		if (bVal - aVal !== 0) return bVal - aVal
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
			{sortedNotifications.map(notification => (
				<Notice key={notification._id} notice={notification} />
			))}
		</div>
	)
})
export default NotificationsComponent
