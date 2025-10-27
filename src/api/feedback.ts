import { BASE_URL } from '@/utils/config'

import { Feedback, Message } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function sendFeedback(
	data: Omit<Feedback, '_id' | 'surname' | 'status' | 'blocked' | 'createdAt' | 'updatedAt'>
) {
	try {
		const res = await axios.post(`${BASE_URL}/feedbacks`, data)
		toast.success('Відгук успішно відправлено')
		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка надсилання відгуку')
			: 'Помилка надсилання відгуку'
		toast.error(msg)

		throw err
	}
}

export async function toggleStatusFeedback(id: string) {
	try {
		const res = await axios.patch(`${BASE_URL}/feedbacks/${id}/status`, id)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка зміни статусу')
			: 'Помилка зміни статусу'
		toast.error(msg)

		throw err
	}
}

export async function getAllMessages(token: string) {
	try {
		const res = await fetch(`${BASE_URL}/feedbacks`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			},
			cache: 'no-store'
		})

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

		const data: Message[] = await res.json()

		return data
	} catch (error) {
		console.error('Помилка при отриманні звернень:', error)
		return []
	}
}
