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
	oneStepBuyItem: OrderItem | null = null

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
			if (storedItems) runInAction(() => (this.items = JSON.parse(storedItems)))
		} catch (err) {
			console.log(err)
		}
	}

	// ------------------------
	// Основна логіка кошика
	// ------------------------
	addProductToCart(product: Product, quantity = 1) {
		const existing = this.items.find(i => i.productId === product._id)
		runInAction(() => {
			if (existing) {
				existing.quantity += quantity
			} else {
				this.items.push({
					productId: product._id ?? '',
					productName: product.title['uk'],
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

	increment(product: Product) {
		const item = this.items.find(i => i.productId === product._id)
		runInAction(() => {
			if (!item) this.addProductToCart(product, 1)
			else item.quantity++
			this.saveToStorage()
		})
	}

	decrement(product: Product) {
		const item = this.items.find(i => i.productId === product._id)
		if (!item) return
		runInAction(() => {
			if (item.quantity > 1) item.quantity--
			else this.items = this.items.filter(i => i.productId !== product._id)
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
		runInAction(() => {
			this.oneStepBuyItem = {
				productId: product._id ?? '',
				productName: product.title['uk'],
				quantity,
				price: product.price,
				categoryId: product.categoryId,
				subCategoryId: product.subCategoryId,
				sku: product.sku
			}
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

	// ------------------------
	// Гетери
	// ------------------------
	get totalPrice() {
		return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
	}

	get totalItems() {
		return this.items.reduce((acc, i) => acc + i.quantity, 0)
	}

	updateTotal() {
		this.totalSum = this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
	}

	saveToStorage() {
		this.updateTotal()
		localStorage.setItem('cart', JSON.stringify(this.items))
	}
}

export const cartStore = new CartStore()
