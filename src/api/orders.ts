import { BASE_URL } from '@/utils/config'

import { Order, OrderStatus, OrdersResponse } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'

type GetOrdersParams = {
	page?: number
	limit?: number
	status?: OrderStatus
	sortBy?: 'createdAt' | 'fullName' | 'totalPrice'
	sortOrder?: 'asc' | 'desc'
}
export async function getOrders(params: GetOrdersParams = {}): Promise<OrdersResponse> {
	const query = new URLSearchParams()

	if (params.page) query.set('page', String(params.page))
	if (params.limit) query.set('limit', String(params.limit))
	if (params.status) query.set('status', params.status)
	if (params.sortBy) query.set('sortBy', params.sortBy)
	if (params.sortOrder) query.set('sortOrder', params.sortOrder)

	try {
		const res = await fetchWithAuth(`${BASE_URL}/orders?${query.toString()}`, {
			cache: 'no-store'
		})

		if (!res.ok) throw new Error('Помилка отримання ордерів')

		return await res.json()
	} catch (err) {
		console.error(err)
		return {
			data: [],
			total: 0,
			page: 1,
			limit: params.limit ?? 8,
			totalPages: 1,
			totalByStatus: {}
		}
	}
}

// Видалити замовлення
export async function deleteOrder(id: string) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/orders/${id}`, { method: 'DELETE' })
		if (!res.ok) throw new Error('Помилка видалення ордеру')
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

// Оновити статус замовлення
export async function patchOrderStatus(id: string, status: OrderStatus) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/orders/${id}/status`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status })
		})
		if (!res.ok) throw new Error('Помилка оновлення статусу')
		return (await res.json()) as Order
	} catch (err) {
		console.error(err)
		return null
	}
}
