import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function getProducts() {
	try {
		const res = await axios.get(`${BASE_URL}/products`)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання продуктів')
			: 'Помилка отримання продуктів'
		toast.error(msg)
		throw err
	}
}

export async function getExchangeRate() {
	try {
		const rate = await axios.get(`${BASE_URL}/currency/latest`)
		return rate
	} catch (error) {
		console.error('Failed to fetch exchange rate', error)
	}
}
