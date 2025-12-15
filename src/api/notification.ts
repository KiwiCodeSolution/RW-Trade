import { BASE_URL } from '@/utils/config'

import { Notification } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'
import { toast } from '@/lib/toast'

// Отримати всі нотифікації
export async function getAllNotifications(): Promise<Notification[]> {
	const res = await fetchWithAuth(`${BASE_URL}/notifications`, { cache: 'no-store' })
	if (!res.ok) {
		// Тепер помилка піде до стору
		throw new Error(`HTTP ${res.status}`)
	}
	const data: Notification[] = await res.json()
	return data
}

// Тогл статусу прочитання нотифікації
export async function toggleStatusNotification(id: string): Promise<Notification | null> {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/notifications/${id}/read`, {
			method: 'PATCH'
		})
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		return (await res.json()) as Notification
	} catch (err) {
		console.error('Помилка при оновленні статусу:', err)
		toast.error('Помилка при оновленні статусу')
		return null
	}
}
