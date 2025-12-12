import { BASE_URL } from '@/utils/config'

import { OrderStatus } from '@/types/baseTypes'

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
		console.log(res.data)
		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання ордерів')
			: 'Помилка отримання ордерів'
		toast.error(msg)
		throw err
	}
}

export async function deleteOrder(id: string, token: string) {
	try {
		const res = await axios.delete(`${BASE_URL}/orders/${id}`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка видалення ордеру')
			: 'Помилка видалення ордеру'
		toast.error(msg)
		throw err
	}
}

export async function patchOrderStatus(id: string, status: OrderStatus, token: string) {
	try {
		const res = await axios.patch(
			`${BASE_URL}/orders/${id}/status`,
			{ status },
			{
				headers: {
					Authorization: `Bearer ${token ?? ''}`,
					'Content-Type': 'application/json'
				}
			}
		)
		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка оновлення статусу')
			: 'Помилка оновлення статусу'
		toast.error(msg)
		throw err
	}
}
