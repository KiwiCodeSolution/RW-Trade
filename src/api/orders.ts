import { api } from '@/utils/axios'

import { Order, OrderStatus, OrdersResponse } from '@/types/baseTypes'

import { OrderSort } from '@/lib/sortOptions'

// -------------------- GET ORDERS --------------------
type GetOrdersParams = {
	page?: number
	limit?: number
	status?: OrderStatus
	sort?: OrderSort
}

export async function getOrders(params: GetOrdersParams = {}): Promise<OrdersResponse> {
	const query = new URLSearchParams()
	if (params.page) query.set('page', String(params.page))
	if (params.limit) query.set('limit', String(params.limit))
	if (params.status) query.set('status', params.status)
	if (params.sort) query.set('sort', params.sort)

	try {
		const { data } = await api.get<OrdersResponse>(`/orders?${query.toString()}`)
		return data
	} catch (err) {
		console.error('Помилка отримання ордерів', err)
		throw err
	}
}

// -------------------- DELETE ORDER --------------------
export async function deleteOrder(id: string): Promise<boolean> {
	try {
		await api.delete(`/orders/${id}`)
		return true
	} catch (err) {
		console.error('Помилка видалення ордеру', err)
		return false
	}
}

// -------------------- PATCH ORDER STATUS --------------------
export async function patchOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
	try {
		const { data } = await api.patch<Order>(`/orders/${id}/status`, { status })
		return data
	} catch (err) {
		console.error('Помилка оновлення статусу ордеру', err)
		return null
	}
}
