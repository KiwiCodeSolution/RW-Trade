import { BASE_URL } from '@/utils/config'

import { Notification } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function toggleStatusNotification(id: string) {
	try {
		const res = await axios.patch(`${BASE_URL}/notifications/${id}/read`, id)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка зміни статусу')
			: 'Помилка зміни статусу'
		toast.error(msg)

		throw err
	}
}

export async function getAllNotifications(token: string) {
	try {
		const res = await fetch(`${BASE_URL}/notifications`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
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
