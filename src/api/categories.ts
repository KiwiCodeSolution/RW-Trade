import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function getCategories() {
	try {
		const res = await axios.get(`${BASE_URL}/categories`)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання категорій')
			: 'Помилка отримання категорій'
		toast.error(msg)
		throw err
	}
}
