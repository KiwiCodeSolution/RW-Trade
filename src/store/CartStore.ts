import { DeliveryInfo, OrderItem, Product } from '@/types/baseTypes'

import { makeAutoObservable, runInAction } from 'mobx'

interface OrderForm {
	fullName: string
	phone: string
	delivery: DeliveryInfo
	paymentMethod: string
	comment: string
}

class CartStore {
	items: OrderItem[] = []
	orderForm: OrderForm = {
		fullName: '',
		phone: '',
		delivery: {
			method: 'novaposhta',
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

	constructor() {
		makeAutoObservable(this)
		if (typeof window !== 'undefined') {
			this.loadFromStorage()
		}
	}

	loadFromStorage() {
		try {
			const storedItems = localStorage.getItem('cart')
			if (storedItems) runInAction(() => (this.items = JSON.parse(storedItems)))
		} catch {}
	}

	saveToStorage() {
		localStorage.setItem('cart', JSON.stringify(this.items))
	}

	addProductToCart(product: Product, quantity = 1) {
		const existing = this.items.find(i => i.productId === product._id)
		runInAction(() => {
			if (existing) {
				existing.quantity += quantity
			} else {
				this.items.push({
					productId: product._id ?? '',
					productName: product.title.uk, // або локаль
					quantity,
					price: product.price,
					categoryId: product.categoryId,
					subCategoryId: product.subCategoryId,
					sku: product.sku
				})
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

	updateOrderForm(data: Partial<OrderForm>) {
		runInAction(() => {
			this.orderForm = { ...this.orderForm, ...data }
		})
	}

	get totalPrice() {
		return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
	}

	clearCart() {
		runInAction(() => {
			this.items = []
			this.saveToStorage()
		})
	}
}

export const cartStore = new CartStore()
