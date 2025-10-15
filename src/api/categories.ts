import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios from 'axios'

export async function getCategories() {
	try {
		const res = await axios.get(`${BASE_URL}/categories`)

		return res.data
	} catch (err: any) {
		toast.error(err.response?.data?.message || 'Помилка отримання категорій')
		throw err
	}
}
