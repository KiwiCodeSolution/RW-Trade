import { createOrderItem } from '@/helpers/createOrderItem'

import { BASE_URL } from '@/utils/config'

import { CreateOrderResult, OrderForm, OrderPayload, Product } from '@/types/baseTypes'

import { productStore } from './ProductsStore'

import { makeAutoObservable, runInAction } from 'mobx'

export interface OrderItem {
	productId: string
	productName: Product['title']
	quantity: number
	basePrice: number // ціна з бекенду
	finalPrice: number // порахована з курсом
	categoryId: string
	subCategoryId?: string
	sku?: string
	isWholesale: boolean
}

class CartStore {
	items: OrderItem[] = []
	oneStepBuyItem: OrderItem | null = null

	orderForm: OrderForm = {
		fullName: '',
		phone: '',
		delivery: {
			method: 'nova_poshta',
			city: '',
			novaposhta: {},
			ukrposhta: {},
			meest: {},
			payer: 'recipient',
			comment: '',
			address: '',
			branch: ''
		},
		paymentMethod: 'card_privatbank',
		comment: ''
	}
	totalSum = 0

	constructor() {
		makeAutoObservable(this)
		if (typeof window !== 'undefined') this.loadFromStorage()
	}

	// ------------------------
	// Local Storage
	// ------------------------
	loadFromStorage() {
		try {
			const storedItems = localStorage.getItem('cart')
			if (storedItems) {
				runInAction(() => {
					this.items = JSON.parse(storedItems)
					this.updateTotal()
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	private getId(item: Product | OrderItem) {
		return '_id' in item ? item._id : item.productId
	}

	// ------------------------
	// Основна логіка кошика
	// ------------------------
	addProductToCart(product: Product, quantity = 1) {
		const existing = this.items.find(i => i.productId === product._id)
		const { exchangeRate, isWholesale } = productStore

		runInAction(() => {
			if (existing) {
				existing.quantity += quantity
			} else {
				const newItem = createOrderItem(product, quantity, exchangeRate, isWholesale)
				this.items.push(newItem)
			}
			this.saveToStorage()
		})
	}

	increment(item: Product | OrderItem) {
		const id = '_id' in item ? item._id : item.productId
		const found = this.items.find(i => i.productId === id)

		runInAction(() => {
			if (found) {
				found.quantity++
			} else if ('title' in item) {
				// item — це Product
				const isWholesale = productStore.isWholesale
				const basePrice = isWholesale ? (item.wholesalePrice ?? item.price) : item.price
				const finalPrice = basePrice * productStore.exchangeRate

				this.items.push({
					productId: item._id ?? '',
					productName: item.title,
					quantity: 1,
					basePrice,
					finalPrice,
					isWholesale,
					categoryId: item.categoryId,
					subCategoryId: item.subCategoryId,
					sku: item.sku
				})
			}
			this.saveToStorage()
		})
	}

	decrement(item: Product | OrderItem) {
		const id = this.getId(item)
		const found = this.items.find(i => i.productId === id)
		if (!found) return

		runInAction(() => {
			if (found.quantity > 1) {
				found.quantity--
			} else {
				this.items = this.items.filter(i => i.productId !== id)
			}
			this.saveToStorage()
		})
	}

	removeProduct(productId: string) {
		runInAction(() => {
			this.items = this.items.filter(i => i.productId !== productId)
			this.saveToStorage()
		})
	}

	clearCart() {
		runInAction(() => {
			this.items = []
			this.saveToStorage()
		})
	}

	// ------------------------
	// One Step Buy
	// ------------------------

	oneStepBuy(product: Product, quantity = 1) {
		const { exchangeRate, isWholesale } = productStore

		runInAction(() => {
			this.oneStepBuyItem = createOrderItem(product, quantity, exchangeRate, isWholesale)
		})
	}

	clearOneStepBuy() {
		runInAction(() => {
			this.oneStepBuyItem = null
		})
	}

	// ------------------------
	// Order form
	// ------------------------
	updateOrderForm(data: Partial<OrderForm>) {
		runInAction(() => {
			this.orderForm = { ...this.orderForm, ...data }
		})
	}

	async createOrder(payload: OrderPayload): Promise<CreateOrderResult> {
		try {
			const response = await fetch(`${BASE_URL}/orders`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			if (!response.ok) {
				const errorData = await response.json()
				return {
					success: false,
					error: errorData?.message || 'Unknown error'
				}
			}

			const data = await response.json()

			// очистка кошика
			this.items = []
			this.totalSum = 0

			return {
				success: true,
				data
			}
		} catch (e: unknown) {
			let message = 'Network error'
			if (e instanceof Error) {
				message = e.message
			} else if (typeof e === 'string') {
				message = e
			} else {
				try {
					message = JSON.stringify(e)
				} catch {
					// keep default message
				}
			}
			return {
				success: false,
				error: message
			}
		}
	}

	// ------------------------
	// Гетери
	// ------------------------
	get totalPrice() {
		return this.items.reduce((acc, i) => acc + i.finalPrice * i.quantity, 0)
	}

	get totalItems() {
		return this.items.reduce((acc, i) => acc + i.quantity, 0)
	}

	updateTotal() {
		this.totalSum = this.items.reduce((acc, i) => acc + i.finalPrice * i.quantity, 0)
	}

	saveToStorage() {
		this.updateTotal()
		localStorage.setItem('cart', JSON.stringify(this.items))
	}
}

export const cartStore = new CartStore()
