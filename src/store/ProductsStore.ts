import { Product } from '@/types/baseTypes'

import { getExchangeRate, getProducts } from '@/api/products'

import { makeAutoObservable, runInAction } from 'mobx'

class ProductStore {
	products: Product[] = []
	isLoading = false
	exchangeRate = 0 // Початкове значення курсу, маємо отримати з беку
	isWholesale = false

	constructor() {
		makeAutoObservable(this)

		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('isWholesale')

			// якщо ще немає ключа — створюємо зі значенням false
			if (saved === null) {
				localStorage.setItem('isWholesale', 'false')
				this.isWholesale = false
			} else {
				this.isWholesale = saved === 'true'
			}

			this.fetchExchangeRate()
			this.fetchProducts()
		}
	}

	async fetchExchangeRate() {
		try {
			this.isLoading = true
			const res = await getExchangeRate()

			if (!res) return
			runInAction(() => {
				this.exchangeRate = res.data.rate
				this.isLoading = false
			})
		} catch (error) {
			console.error('Failed to fetch exchange rate', error)
		}
	}

	async fetchProducts() {
		try {
			this.isLoading = true
			const res = await getProducts()
			const data: Product[] = await res.json()
			const favorites = this.getFavoritesFromStorage()

			runInAction(() => {
				this.products = data.map(p => ({
					...p,
					isFavorite: favorites.includes(p._id ?? '')
				}))
			})
		} catch (error) {
			console.error('Failed to fetch products', error)
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	toggleFavorite(id: string) {
		this.products = this.products.map(p =>
			p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
		)
		this.updateFavoritesStorage()
	}

	setWholesale = (isWholesale: boolean) => {
		this.isWholesale = isWholesale
		localStorage.setItem('isWholesale', String(isWholesale))
	}

	toggleWholesale = () => {
		this.setWholesale(!this.isWholesale)
	}

	getProductPrice(product: Product) {
		const base = product.price * this.exchangeRate
		return this.isWholesale ? +(base * 0.93).toFixed(2) : +base.toFixed(2)
	}

	getFavoritesFromStorage(): string[] {
		try {
			return JSON.parse(localStorage.getItem('favorites') || '[]')
		} catch {
			return []
		}
	}

	updateFavoritesStorage() {
		const favorites = this.products.filter(p => p.isFavorite).map(p => p._id ?? '')
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
}

export const productStore = new ProductStore()
