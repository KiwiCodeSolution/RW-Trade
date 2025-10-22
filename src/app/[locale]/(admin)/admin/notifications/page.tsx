import Notice from '@/components/adminUI/Notice'

import { BASE_URL } from '@/utils/config'

import { Notification } from '@/types/baseTypes'

export async function getAllNotifications() {
	try {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGI4NDVjMDZlMzk0N2U4ZWMxNmYzMzEiLCJlbWFpbCI6InN1cGVyYWRtaW4xQHRlc3QuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3NjExMzY1MDgsImV4cCI6MTc2MTIyMjkwOH0.KSgCuI9nw_XQJTQL20pOxlYt-KPBu-wUwMCeAvopQps'

		const res = await fetch(`${BASE_URL}/notifications`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? `Bearer ${token}` : ''
			},
			cache: 'no-store'
		})

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

		const data: Notification[] = await res.json()
		return data
	} catch (error) {
		console.error('Помилка при отриманні нотифікацій:', error)
		return []
	}
}

export const fakeNotifications: Notification[] = [
	{
		_id: '672f1a8b4a1d9a001c3f1a01',
		type: 'order',
		refId: '672f1a8b4a1d9a001c3f1a11',
		name: 'Олена Коваль',
		amount: 1450,
		date: '2025-10-20T14:23:00.000Z',
		status: 'unread',
		createdAt: '2025-10-20T14:23:00.000Z',
		updatedAt: '2025-10-20T14:23:00.000Z'
	},
	{
		_id: '672f1a8b4a1d9a001c3f1a02',
		type: 'feedback',
		refId: '672f1a8b4a1d9a001c3f1a12',
		name: 'Ігор Сидоренко',
		date: '2025-10-21T09:10:00.000Z',
		status: 'read',
		createdAt: '2025-10-21T09:10:00.000Z',
		updatedAt: '2025-10-21T10:45:00.000Z'
	},
	{
		_id: '672f1a8b4a1d9a001c3f1a03',
		type: 'order',
		refId: '672f1a8b4a1d9a001c3f1a13',
		name: 'Марія Гончар',
		amount: 870,
		date: '2025-10-22T07:35:00.000Z',
		status: 'read',
		createdAt: '2025-10-22T07:35:00.000Z',
		updatedAt: '2025-10-22T08:00:00.000Z'
	},
	{
		_id: '672f1a8b4a1d9a001c3f1a04',
		type: 'feedback',
		refId: '672f1a8b4a1d9a001c3f1a14',
		name: 'Тетяна Романюк',
		date: '2025-10-22T11:50:00.000Z',
		status: 'unread',
		createdAt: '2025-10-22T11:50:00.000Z',
		updatedAt: '2025-10-22T11:50:00.000Z'
	}
]

export default async function Notifications() {
	const notifications = await getAllNotifications()

	//сортуємо по статусу (сповіщення прочитані/непрочитані) та даті
	notifications.sort((a, b) => {
		const aVal = a.status === 'unread' ? 1 : 0
		const bVal = b.status === 'unread' ? 1 : 0

		if (bVal - aVal !== 0) return bVal - aVal
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div className='w-full'>
			<h1 className='text-center text-2xl font-bold'>Сповіщення</h1>
			<div className='h-0.5 w-full bg-primary' />
			<div className='flex flex-col gap-y-[14px] mt-3 max-h-[87vh] overflow-y-auto pb-3'>
				{notifications.map(notification => (
					<Notice key={notification._id} notice={notification} />
				))}
			</div>
		</div>
	)
}
