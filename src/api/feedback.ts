import { BASE_URL } from '@/utils/config'

import { Feedback, FeedbackStatus, Message } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'
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

export async function toggleStatusFeedback(id: string, status: FeedbackStatus) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/feedbacks/${id}/status`, {
			method: 'PATCH',
			body: JSON.stringify({ status }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		return res
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка зміни статусу')
			: 'Помилка зміни статусу'
		toast.error(msg)
		throw err
	}
}

export async function getAllMessages() {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/feedbacks`, { cache: 'no-store' })
		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

		const data: Message[] = await res.json()

		return data
	} catch (error) {
		console.error('Помилка при отриманні звернень:', error)
		return []
	}
}

export async function deleteMessage(id: string) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/feedbacks/${id}`, { method: 'DELETE' })

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
		return res
	} catch (error) {
		console.error('Помилка при видаленні звернення:', error)
	}
}
