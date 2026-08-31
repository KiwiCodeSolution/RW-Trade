import { Order, OrderStatus } from '@/types/baseTypes'

import { deleteOrder, getOrders, patchOrderStatus } from '@/api/orders'

import { authGuard } from '@/lib/authGuard'
import { OrderSort } from '@/lib/sortOptions'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class OrdersStore {
	orders: Order[] = []
	isLoading = false

	// pagination
	page = 1
	limit = 4
	total = 0
	totalPages = 1

	// filters & sorting
	status?: OrderStatus
	sortBy: 'createdAt' | 'fullName' | 'totalPrice' = 'createdAt'
	sortOrder: 'asc' | 'desc' = 'desc'
	sort: OrderSort = 'createdAt_DESC'

	// counters
	totalByStatus: Partial<Record<OrderStatus, number>> = {}

	constructor() {
		makeAutoObservable(this)
		// this.fetchOrders()
	}

	fetchOrders = async (params?: {
		page?: number
		limit?: number
		status?: OrderStatus
		sort?: OrderSort
	}) => {
		const page = params?.page ?? this.page
		const limit = params?.limit ?? this.limit
		const status = params?.status ?? this.status
		const sort = params?.sort ?? this.sort

		this.isLoading = true
		try {
			const response = await getOrders({ page, limit, status, sort })

			runInAction(() => {
				this.orders = response.data ?? []
				this.total = response.total ?? 0
				this.totalPages = response.totalPages ?? 1
				this.totalByStatus = response.totalByStatus ?? {}
			})
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося завантажити замовлення')
			}

			runInAction(() => {
				this.orders = []
				this.total = 0
			})
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	// ===== UI actions =====
	setPage(page: number) {
		this.page = page
		// this.fetchOrders()
	}

	setLimit(limit: number) {
		this.limit = limit
		this.page = 1
		// this.fetchOrders()
	}

	setStatus(status?: OrderStatus) {
		this.status = status
		this.page = 1
		// this.fetchOrders()
	}

	setSorting(sort: OrderSort) {
		this.sort = sort
		// this.fetchOrders()
	}

	// ===== mutations =====
	deleteOrder = async (id: string) => {
		this.isLoading = true
		try {
			await deleteOrder(id)
			toast.success('Замовлення успішно видалено')
			this.fetchOrders()
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося видалити замовлення')
			}
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	updateOrderStatus = async (id: string, status: OrderStatus) => {
		this.isLoading = true
		try {
			await patchOrderStatus(id, status)
			toast.success('Статус замовлення оновлено')
			this.fetchOrders() // важливо для лічильників
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося оновити статус замовлення')
			}
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}
}

export const ordersStore = new OrdersStore()
