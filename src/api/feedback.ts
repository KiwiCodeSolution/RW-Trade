import { api } from '@/utils/axios'

import { ApiError } from '@/types/apiError'
import { Feedback, FeedbackStatus, Message } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

import { AxiosError } from 'axios'

// Відправка нового відгуку
export const sendFeedback = async (
	data: Omit<Feedback, '_id' | 'surname' | 'status' | 'blocked' | 'createdAt' | 'updatedAt'>
): Promise<Feedback> => {
	try {
		const { data: res } = await api.post<Feedback>('/feedbacks', data)
		toast.success('Відгук успішно відправлено')
		return res
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			toast.error(err.response?.data?.message ?? 'Помилка надсилання відгуку')
		} else if (err instanceof Error) {
			toast.error(err.message)
		} else {
			toast.error('Помилка надсилання відгуку')
		}
		throw err
	}
}

// Зміна статусу відгуку
export const toggleStatusFeedback = async (
	id: string,
	status: FeedbackStatus
): Promise<Message> => {
	try {
		const { data } = await api.patch<Message>(`/feedbacks/${id}/status`, { status })
		return data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// Отримати всі звернення
export const getAllMessages = async (): Promise<Message[]> => {
	try {
		const { data } = await api.get<Message[]>('/feedbacks', { params: { cache: 'no-store' } })

		return data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// Видалити звернення
export const deleteMessage = async (id: string): Promise<boolean> => {
	try {
		await api.delete(`/feedbacks/${id}`)
		return true
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}
