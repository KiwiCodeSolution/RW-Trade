import { Order, OrderStatus } from '@/types/baseTypes'

import { deleteOrder, getOrders, patchOrderStatus } from '@/api/orders'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class OrdersStore {
	order: Order = {} as Order
	orders: Order[] = []
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	async fetchOrders(token: string) {
		console.log('starting to fetch orders', token)

		try {
			const data = await getOrders(token)

			runInAction(() => {
				this.orders = Array.isArray(data) ? data : []
			})

			console.log('Orders:', this.orders)
		} catch (error) {
			console.error('Error fetching orders:', error)

			runInAction(() => {
				this.orders = []
			})
		}
	}

	setOrders(orders: Order[]) {
		this.orders = orders
	}

	deleteOrder = async (id: string, token: string) => {
		console.log(token)
		this.isLoading = true
		try {
			await deleteOrder(id, token)
			runInAction(() => {
				this.orders = this.orders.filter(n => n._id !== id)
			})
			toast.success('Замовлення успішно видалено')
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося видалити замовлення')
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	updateOrderStatus = async (id: string, status: OrderStatus, token: string) => {
		this.isLoading = true
		try {
			await patchOrderStatus(id, status, token)
			runInAction(() => {
				const order = this.orders.find(o => o._id === id)
				if (order) order.status = status
			})
			toast.success('Статус замовлення оновлено')
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося оновити статус замовлення')
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}
}

export const ordersStore = new OrdersStore()
