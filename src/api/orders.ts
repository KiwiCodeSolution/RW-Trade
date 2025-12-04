import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function getOrders(token: string) {
	try {
		const res = await axios.get(`${BASE_URL}/orders`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання ордерів')
			: 'Помилка отримання ордерів'
		toast.error(msg)
		throw err
	}
}
