import { Order } from '@/types/baseTypes'

import { getOrders } from '@/api/orders'

import { makeAutoObservable } from 'mobx'

class OrderStore {
	order: Order = {} as Order
	orders: Order[] = []

	constructor() {
		makeAutoObservable(this)
	}

	async fetchOrders(token: string) {
		try {
			const response = await getOrders(token)
			if (!response.ok) {
				throw new Error('Failed to fetch orders')
			}
			const data: Order[] = await response.json()
			console.log('Fetched orders:', data)
			this.setOrders(data)
		} catch (error) {
			console.error('Error fetching orders:', error)
		}
	}

	setOrders(orders: Order[]) {
		this.orders = orders
	}
}
