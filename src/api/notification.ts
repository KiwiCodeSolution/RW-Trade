import { api } from '@/utils/axios'

import { ApiError } from '@/types/apiError'
import { Notification } from '@/types/baseTypes'

// Отримати всі нотифікації
export const getAllNotifications = async (): Promise<Notification[]> => {
	try {
		const { data } = await api.get('/notifications', { params: { cache: 'no-store' } })

		return data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// Тогл статусу прочитання нотифікації
export const toggleStatusNotification = async (id: string): Promise<Notification | null> => {
	try {
		const { data } = await api.patch(`/notifications/${id}/read`)
		return data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}
