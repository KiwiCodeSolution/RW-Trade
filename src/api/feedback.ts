import { api } from '@/utils/axios'

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
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			toast.error(err.response?.data?.message ?? 'Помилка зміни статусу')
		} else if (err instanceof Error) {
			toast.error(err.message)
		} else {
			toast.error('Помилка зміни статусу')
		}
		throw err
	}
}

// Отримати всі звернення
export const getAllMessages = async (): Promise<Message[]> => {
	try {
		const { data } = await api.get<Message[]>('/feedbacks', { params: { cache: 'no-store' } })
		return data
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			toast.error(err.response?.data?.message ?? 'Не вдалося завантажити звернення')
		} else if (err instanceof Error) {
			toast.error(err.message)
		} else {
			toast.error('Не вдалося завантажити звернення')
		}
		console.error('Помилка при отриманні звернень:', err)
		return []
	}
}

// Видалити звернення
export const deleteMessage = async (id: string): Promise<boolean> => {
	try {
		await api.delete(`/feedbacks/${id}`)
		return true
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			toast.error(err.response?.data?.message ?? 'Не вдалося видалити звернення')
		} else if (err instanceof Error) {
			toast.error(err.message)
		} else {
			toast.error('Не вдалося видалити звернення')
		}
		console.error('Помилка при видаленні звернення:', err)
		return false
	}
}
