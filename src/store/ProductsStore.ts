// import { Product } from '@/types/baseTypes'
// import { getExchangeRate, getProducts } from '@/api/products'
// import { makeAutoObservable, runInAction } from 'mobx'
// class ProductStore {
// 	products: Product[] = []
// 	isLoading = false
// 	exchangeRate = 0 // Початкове значення курсу, маємо отримати з беку
// 	isWholesale = false
// 	constructor() {
// 		makeAutoObservable(this)
// 		if (typeof window !== 'undefined') {
// 			const saved = localStorage.getItem('isWholesale')
// 			// якщо ще немає ключа — створюємо зі значенням false
// 			if (saved === null) {
// 				localStorage.setItem('isWholesale', 'false')
// 				this.isWholesale = false
// 			} else {
// 				this.isWholesale = saved === 'true'
// 			}
// 			this.fetchExchangeRate()
// 			this.fetchProducts()
// 		}
// 	}
// 	async fetchExchangeRate() {
// 		try {
// 			this.isLoading = true
// 			const res = await getExchangeRate()
// 			if (!res) return
// 			runInAction(() => {
// 				this.exchangeRate = res.data.rate
// 				this.isLoading = false
// 			})
// 		} catch (error) {
// 			console.error('Failed to fetch exchange rate', error)
// 		}
// 	}
// 	async fetchProducts() {
// 		try {
// 			this.isLoading = true
// 			const res = await getProducts()
// 			const data: Product[] = await res.json()
// 			const favorites = this.getFavoritesFromStorage()
// 			runInAction(() => {
// 				this.products = data.map(p => ({
// 					...p,
// 					isFavorite: favorites.includes(p._id ?? '')
// 				}))
// 			})
// 		} catch (error) {
// 			console.error('Failed to fetch products', error)
// 		} finally {
// 			runInAction(() => {
// 				this.isLoading = false
// 			})
// 		}
// 	}
// 	toggleFavorite(id: string) {
// 		this.products = this.products.map(p =>
// 			p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
// 		)
// 		this.updateFavoritesStorage()
// 	}
// 	setWholesale = (isWholesale: boolean) => {
// 		this.isWholesale = isWholesale
// 		localStorage.setItem('isWholesale', String(isWholesale))
// 	}
// 	toggleWholesale = () => {
// 		this.setWholesale(!this.isWholesale)
// 	}
// 	getProductPrice(product: Product) {
// 		const base = product.price * this.exchangeRate
// 		return this.isWholesale ? +(base * 0.93).toFixed(2) : +base.toFixed(2)
// 	}
// 	getFavoritesFromStorage(): string[] {
// 		try {
// 			return JSON.parse(localStorage.getItem('favorites') || '[]')
// 		} catch {
// 			return []
// 		}
// 	}
// 	updateFavoritesStorage() {
// 		const favorites = this.products.filter(p => p.isFavorite).map(p => p._id ?? '')
// 		localStorage.setItem('favorites', JSON.stringify(favorites))
// 	}
// 	get favoriteProducts() {
// 		return this.products.filter(p => p.isFavorite)
// 	}
// }
// export const productStore = new ProductStore()
import { Product, ProductStatus } from '@/types/baseTypes'

import { getExchangeRate, getProducts } from '@/api/products'

import { makeAutoObservable, runInAction } from 'mobx'

class ProductStore {
	products: Product[] = []
	isLoading = false
	exchangeRate = 0
	isWholesale = false

	constructor() {
		makeAutoObservable(this)

		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('isWholesale')
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
			if (!res || !res.data) throw new Error('No data')
			runInAction(() => {
				this.exchangeRate = res.data.rate
			})
		} catch {
			console.warn('Exchange rate unavailable — using fallback 1')
			runInAction(() => {
				this.exchangeRate = 1
			})
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async fetchProducts() {
		try {
			this.isLoading = true
			const res = await getProducts()

			let data: Product[] = []
			try {
				// Якщо це Response
				if (res && typeof res.json === 'function') {
					data = await res.json()
				}
				// Якщо це вже масив або звичайний об'єкт
				else if (Array.isArray(res)) {
					data = res
				}
				// fallback-заглушка
				else {
					throw new Error('Invalid response')
				}
			} catch {
				console.warn('Products fetch failed — using stub data')

				data = [
					{
						_id: '661731f8fd97a46b6a99dc29',
						title: { uk: 'Автомобільний зарядний пристрій', en: 'Car Charger' },
						description: {
							uk: 'Швидкий зарядний пристрій для автомобіля з підтримкою QC 3.0',
							en: 'Fast car charger supporting QC 3.0'
						},
						price: 500,
						wholesalePrice: 465,
						inStock: 150,
						sku: '123456',
						images: [
							'/images/products/car-charger-1.jpg',
							'/images/products/car-charger-2.jpg'
						],
						categoryId: '68b87a81073dae082670402f',
						subCategoryId: '68b87a81073dae0826704030',
						newArrival: true,
						isHit: true,
						showDiscountBlock: true,
						showOfferBlock: false,
						videoUrl: 'https://www.youtube.com/watch?v=example',
						characteristics: {
							country: 'China',
							brand: 'Xiaomi',
							priceFrom: 450,
							priceTo: 500
						},
						compatibility: ['iPhone', 'Android'],
						kit: 'Charger + USB Cable',
						deliveryTerms: '1–2 business days',
						initialRatingSum: 45,
						initialRatingCount: 10,
						isPublished: true,
						seo: {
							title: {
								uk: 'Купити автомобільний зарядний пристрій',
								en: 'Buy Car Charger'
							},
							description: {
								uk: 'Якісний швидкий зарядний пристрій для автомобіля',
								en: 'High-quality fast car charger for your car'
							},
							keywords: { uk: 'зарядний, авто, гаджет', en: 'charger, car, gadget' }
						},
						slugUk: 'avtomobilnyi-zaryadnyi-prystriy',
						slugEn: 'car-charger',
						isFavorite: false,
						status: ProductStatus.IN_STOCK
					} as Product
				]
			}

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

	get favoriteProducts() {
		return this.products.filter(p => p.isFavorite)
	}
}

export const productStore = new ProductStore()
