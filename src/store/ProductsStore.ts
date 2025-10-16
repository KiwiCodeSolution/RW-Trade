import { Product } from '@/types/baseTypes'

import { getProducts } from '@/api/products'

import { makeAutoObservable, runInAction } from 'mobx'

class ProductStore {
	products: Product[] = []
	isLoading = false

	constructor() {
		makeAutoObservable(this)

		if (typeof window !== 'undefined') {
			this.fetchProducts()
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
