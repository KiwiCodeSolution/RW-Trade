import { BASE_URL } from '@/utils/config'

import { CreateProduct, Product, ProductFilterParams, Subcategory } from '@/types/baseTypes'

import { fetchFilteredProducts, getExchangeRate } from '@/api/products'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class ProductStore {
	products: Product[] = []
	discountProducts: Product[] = [] // 👈 окремо
	discountSubcategories: Subcategory[] = []
	currentProduct: Product | null = null
	isLoading = false
	exchangeRate = 41.5
	isWholesale = false
	total = 0
	discountTotal = 0
	shouldAskWholesale = false

	constructor() {
		makeAutoObservable(this)

		this.products = []
		this.discountProducts = []
		this.discountSubcategories = []

		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('isWholesale')
			if (saved === null) {
				this.shouldAskWholesale = true
			} else {
				this.isWholesale = saved === 'true'
			}
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

	async fetchProducts(params?: Partial<ProductFilterParams & { discountOnly?: boolean }>) {
		try {
			this.isLoading = true

			const data = await fetchFilteredProducts({
				lang: 'uk',
				categoryId: 'all',
				subCategoryId: 'all',
				sort: 'DATE_ADDED',
				limit: 24,
				page: 1,
				...params // дозволяє перевизначати фільтри
			})

			const favorites = this.getFavoritesFromStorage()

			runInAction(() => {
				this.products = data.items.map((p: Product) => ({
					...p,
					isFavorite: favorites.includes(p._id ?? '')
				}))
				this.total = data.totalItems
			})
		} catch (error) {
			console.error('❌ Failed to fetch filtered products:', error)
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async fetchDiscountProducts() {
		this.isLoading = true
		try {
			const res = await fetch(`${BASE_URL}/products/discounts`)
			if (!res.ok) throw new Error('Помилка запиту /products/discounts')
			const data = await res.json()

			runInAction(() => {
				this.discountProducts = data.items
				this.discountSubcategories = data.subcategories
				this.discountTotal = data.totalItems
			})
		} catch (err) {
			console.error('❌ Failed to fetch discount products:', err)
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	getDiscountsBySubcategory(subId: string) {
		if (subId === 'any') return this.discountProducts
		return this.discountProducts.filter(p => p.subCategoryId === subId)
	}

	async createProduct({
		product,
		token,
		files
	}: {
		product: CreateProduct
		token: string
		files?: File[]
	}) {
		this.isLoading = true
		try {
			const formData = new FormData()

			// 1) звичайні поля → JSON/рядок
			Object.entries(product).forEach(([key, value]) => {
				if (key === 'images') return // важливо: пропускаємо!
				if (
					typeof value === 'boolean' ||
					Array.isArray(value) ||
					(typeof value === 'object' && value !== null)
				) {
					formData.append(key, JSON.stringify(value))
				} else if (value !== undefined && value !== null) {
					formData.append(key, String(value))
				}
			})

			// 2) файли — тільки реальні File
			;(files ?? []).forEach(file => {
				formData.append('images', file) // ключ має бути рівно 'images'
			})

			const res = await fetch(`${BASE_URL}/products`, {
				method: 'POST',
				body: formData,
				credentials: 'include',
				headers: { Authorization: `Bearer ${token}` }
			})

			if (res.status === 401) {
				toast.error('Сесія завершена. Увійди знову.')
				window.location.href = '/uk/signin'
				return null
			}

			if (!res.ok) {
				const msg = await res.text()
				throw new Error(`Помилка створення продукту: ${msg}`)
			}

			const created = await res.json()
			runInAction(() => this.products.push(created))
			toast.success('Товар успішно збережено')
			return created
		} catch (err: unknown) {
			console.error('Create product error:', err)

			let msg = 'Помилка при збереженні товару'

			if (err instanceof Error) {
				try {
					const clean = err.message.replace('Помилка створення продукту: ', '')
					const parsed = JSON.parse(clean)
					if (parsed?.message) msg = parsed.message
					else msg = err.message
				} catch {
					msg = err.message
				}
			}

			toast.error(msg)
			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async updateProduct({
		id,
		product,
		token,
		files
	}: {
		id: string
		product: CreateProduct
		token: string
		files?: File[]
	}) {
		this.isLoading = true
		try {
			const formData = new FormData()

			// 1️⃣ Серіалізуємо звичайні поля, без _id / slug / timestamps
			Object.entries(product).forEach(([key, value]) => {
				if (['_id', 'slugUk', 'slugEn', 'createdAt', 'updatedAt', '__v'].includes(key))
					return
				if (key === 'images') return // окремо обробляємо нижче

				if (
					typeof value === 'boolean' ||
					Array.isArray(value) ||
					(typeof value === 'object' && value !== null)
				) {
					formData.append(key, JSON.stringify(value))
				} else if (value !== undefined && value !== null) {
					formData.append(key, String(value))
				}
			})

			// 2️⃣ Файли — лише нові (реальні File)
			;(files ?? []).forEach(file => {
				formData.append('images', file)
			})

			// 3️⃣ Відправляємо PATCH (оновлення)
			const res = await fetch(`${BASE_URL}/products/${id}`, {
				method: 'PATCH',
				body: formData,
				headers: { Authorization: `Bearer ${token}` },
				credentials: 'include'
			})

			if (res.status === 401) {
				toast.error('Сесія завершена. Увійди знову.')
				window.location.href = '/uk/signin'
				return null
			}

			if (!res.ok) {
				const msg = await res.text()
				throw new Error(`Помилка оновлення продукту: ${msg}`)
			}

			const updated = await res.json()

			runInAction(() => {
				this.products = this.products.map(p => (p._id === updated._id ? updated : p))
				if (this.currentProduct?._id === updated._id) this.currentProduct = updated
			})

			toast.success('Товар успішно оновлено')
			return updated
		} catch (err: unknown) {
			console.error('Update product error:', err)

			let msg = 'Помилка при оновленні товару'

			if (err instanceof Error) {
				try {
					const clean = err.message.replace('Помилка оновлення продукту: ', '')
					const parsed = JSON.parse(clean)
					if (parsed?.message) msg = parsed.message
					else msg = err.message
				} catch {
					msg = err.message
				}
			}

			toast.error(msg)
			return null
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async fetchProductById(id: string, token: string) {
		this.isLoading = true
		try {
			const res = await fetch(`${BASE_URL}/products/${id}`, {
				method: 'GET',
				credentials: 'include',
				headers: { Authorization: `Bearer ${token}` }
			})

			if (res.status === 401) {
				toast.error('Сесія завершена. Увійди знову.')
				window.location.href = '/uk/signin'
				return null
			}

			if (!res.ok) {
				const msg = await res.text()
				throw new Error(`Помилка завантаження продукту: ${msg}`)
			}

			const product = await res.json()
			this.currentProduct = product
			return product
		} catch (err: unknown) {
			console.error('Fetch product by ID error:', err)

			let msg = 'Помилка при завантаженні товару'

			if (err instanceof Error) {
				try {
					const clean = err.message.replace('Помилка завантаження продукту: ', '')
					const parsed = JSON.parse(clean)
					if (parsed?.message) msg = parsed.message
					else msg = err.message
				} catch {
					msg = err.message
				}
			}

			toast.error(msg)
			return null
		} finally {
			this.isLoading = false
		}
	}

	async removePhoto(productId: string, photoUrl: string, token: string) {
		this.isLoading = true
		try {
			const res = await fetch(`${BASE_URL}/products/${productId}/photos/${photoUrl}`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { Authorization: `Bearer ${token}` }
			})

			if (res.status === 401) {
				toast.error('Сесія завершена. Увійди знову.')
				window.location.href = '/uk/signin'
				return false
			}

			if (!res.ok) {
				const msg = await res.text()
				throw new Error(`Помилка видалення фото: ${msg}`)
			}

			toast.success('Фото успішно видалено')
			return true
		} catch (err: unknown) {
			console.error('Remove photo error:', err)

			let msg = 'Помилка при видаленні фото'

			if (err instanceof Error) {
				try {
					const clean = err.message.replace('Помилка видалення фото: ', '')
					const parsed = JSON.parse(clean)
					if (parsed?.message) msg = parsed.message
					else msg = err.message
				} catch {
					msg = err.message
				}
			}

			toast.error(msg)
			return null
		} finally {
			this.isLoading = false
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
		this.shouldAskWholesale = false
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
