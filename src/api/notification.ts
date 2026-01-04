import { api } from '@/utils/axios'

import { Notification } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

// Отримати всі нотифікації
export const getAllNotifications = async (): Promise<Notification[]> => {
	try {
		const { data } = await api.get('/notifications', { params: { cache: 'no-store' } })
		return data
	} catch (err) {
		console.error('Помилка отримання нотифікацій:', err)
		toast.error('Не вдалося отримати нотифікації')
		throw err
	}
}

// Тогл статусу прочитання нотифікації
export const toggleStatusNotification = async (id: string): Promise<Notification | null> => {
	try {
		const { data } = await api.patch(`/notifications/${id}/read`)
		return data
	} catch (err) {
		console.error('Помилка при оновленні статусу:', err)
		toast.error('Не вдалося оновити статус нотифікації')
		return null
	}
}
