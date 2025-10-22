import { BASE_URL } from '@/utils/config'

import { Feedback } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

import axios from 'axios'

export async function sendFeedback(
	data: Omit<Feedback, '_id' | 'surname' | 'status' | 'blocked' | 'createdAt' | 'updatedAt'>
) {
	try {
		const res = await axios.post(`${BASE_URL}/feedbacks`, data)
		toast.success('Відгук успішно відправлено')
		return res.data
	} catch (err: any) {
		toast.error(err.response?.data?.message || 'Помилка надсилання відгуку')
		throw err
	}
}

export async function toggleStatusFeedback(id: string) {
	try {
		const res = await axios.patch(`${BASE_URL}/feedbacks/${id}/status`, id)

		return res.data
	} catch (err: any) {
		toast.error(err.response?.data?.message)
		throw err
	}
}
