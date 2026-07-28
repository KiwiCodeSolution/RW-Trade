import { CreateProductDto, ItemsFilterParams, Product, Subcategory } from '@/types/baseTypes'

import * as productApi from '@/api/products'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class ProductStore {
	products: Product[] = []
	favoritesList: Product[] = []
	adminProducts: Product[] = []
	discountProducts: Product[] = []
	discountSubcategories: Subcategory[] = []
	currentProduct: Product | null = null
	isLoading = false
	exchangeRate = 0
	isWholesale = false
	total = 0
	totalAdmin = 0
	discountTotal = 0
	shouldAskWholesale = false
	allCountries: string[] = []
	filteredCountries: string[] = []
	minPrice = 0
	maxPrice = 0

	constructor() {
		makeAutoObservable(this)

		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('isWholesale')
			this.shouldAskWholesale = saved === null
			this.isWholesale = saved === 'true'

			const savedFavorites = localStorage.getItem('favorites-RWTrade')
			if (savedFavorites) {
				try {
					const favProducts: Product[] = JSON.parse(savedFavorites)
					this.favoritesList = favProducts.map(p => ({ ...p, isFavorite: true }))
				} catch {
					console.warn('Favorites parse error')
				}
			}
		}

		this.fetchExchangeRate()
	}

	get favoriteProducts() {
		return this.favoritesList
	}

	toggleFavorite(product: Product) {
		const favIndex = this.favoritesList.findIndex(p => p._id === product._id)
		const nowFavorite = favIndex === -1

		if (nowFavorite) {
			this.favoritesList.push({ ...product, isFavorite: true })
		} else {
			this.favoritesList.splice(favIndex, 1)
		}

		const exists = this.products.find(p => p._id === product._id)
		if (exists) exists.isFavorite = nowFavorite

		this.updateFavoritesStorage()
	}

	updateFavoritesStorage() {
		localStorage.setItem('favorites-RWTrade', JSON.stringify(this.favoritesList))
	}

	getFavoritesFromStorage(): Product[] {
		try {
			return JSON.parse(localStorage.getItem('favorites-RWTrade') || '[]')
		} catch {
			return []
		}
	}

	async fetchExchangeRate() {
		this.isLoading = true
		try {
			const data = await productApi.getExchangeRate()
			runInAction(() => (this.exchangeRate = data.rate ?? 1))
		} catch {
			console.warn('Exchange rate unavailable — using fallback 1')
			runInAction(() => (this.exchangeRate = 1))
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	setExchangeRate = async (rate: number) => {
		try {
			const data = await productApi.updateExchangeRate({ rate })
			runInAction(() => (this.exchangeRate = data.rate))
			toast.success('Курс валюти оновлено')
			return data
		} catch (err: unknown) {
			console.error('Failed to update exchange rate in store', err)
			toast.error('Не вдалося оновити курс валюти')
			return null
		}
	}

	async fetchProducts(params?: Partial<ItemsFilterParams & { discountOnly?: boolean }>) {
		this.isLoading = true
		try {
			const { priceRange, countries, ...rest } = params || {}

			// ⚡ Формуємо API-параметри
			const apiParams: Partial<ItemsFilterParams & { discountOnly?: boolean }> = {
				lang: 'uk',
				categorySlug: 'all',
				subCategorySlug: 'all',
				sort: 'DATE_ADDED',
				limit: 24,
				page: 1,
				...rest,
				priceRange, // передаємо відразу, як прийшло
				countries: countries
					? Array.isArray(countries)
						? countries.join(',') // ✅ рядок для бекенду
						: countries
					: undefined
			}

			const data = await productApi.fetchFilteredProducts(apiParams)

			runInAction(() => {
				const favsFromStorage = this.getFavoritesFromStorage()

				this.products = data.items.map((p: Product) => {
					const fav = favsFromStorage.find(f => f._id === p._id)
					return fav ? { ...fav, isFavorite: true } : { ...p, isFavorite: false }
				})

				this.total = data.totalItems
				this.minPrice = data.filter.minPrice.toFixed(2)
				this.maxPrice = data.filter.maxPrice.toFixed(2)

				if (!this.allCountries.length) this.allCountries = data.filter.allCountries
				this.filteredCountries = data.filter.selectedCountries
			})
		} catch (error) {
			console.error('❌ Failed to fetch filtered products:', error)
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async fetchAdminProducts(params?: Partial<ItemsFilterParams>) {
		this.isLoading = true
		try {
			const data = await productApi.fetchFilteredAdminProducts({
				lang: 'uk',
				categorySlug: 'all',
				subCategorySlug: 'all',
				sort: 'DATE_ADDED',
				limit: 24,
				page: 1,
				...params
			})
			runInAction(() => {
				this.adminProducts = data.items
				this.totalAdmin = data.totalItems
			})
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося завантажити товари')
			}
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async fetchDiscountProducts() {
		this.isLoading = true
		try {
			const data = await productApi.fetchDiscountProductsApi()
			runInAction(() => {
				this.discountProducts = data.items
				this.discountSubcategories = data.subcategories
				this.discountTotal = data.totalItems
			})
		} catch (err) {
			console.error('❌ Failed to fetch discount products:', err)
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	getDiscountsBySubcategory(subId: string) {
		if (subId === 'any') return this.discountProducts
		return this.discountProducts.filter(p => p.subCategoryId === subId)
	}

	async createProduct({ product, files }: { product: CreateProductDto; files?: File[] }) {
		this.isLoading = true
		try {
			const data = await productApi.createProductApi(product, files)
			runInAction(() => this.products.push(data))
			toast.success('Товар успішно збережено')
			return data
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при збереженні товару')
			}

			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async updateProduct({
		id,
		product,
		files
	}: {
		id: string
		product: CreateProductDto
		files?: File[]
	}) {
		this.isLoading = true
		try {
			const data = await productApi.updateProductApi(id, product, files)
			runInAction(() => {
				this.products = this.products.map(p => (p._id === data._id ? data : p))
				if (this.currentProduct?._id === data._id) this.currentProduct = data
			})
			toast.success('Товар успішно оновлено')
			return data
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при оновленні товару')
			}

			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async fetchProductById(id: string) {
		this.isLoading = true
		try {
			const data = await productApi.getProductByIdApi(id)
			this.currentProduct = data
			return data
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при завантаженні товару')
			}

			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async removePhoto(productId: string, photoUrl: string) {
		this.isLoading = true
		try {
			await productApi.deleteProductApi(`${productId}/photos/${photoUrl}`)
			toast.success('Фото успішно видалено')
			return true
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Помилка при видаленні фото')
			}

			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
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
		const base = (product.price ?? product.priceCurrency) * this.exchangeRate
		return this.isWholesale ? +(base * 0.93).toFixed(2) : +base.toFixed(2)
	}

	async toggleVisibility(product: Product) {
		try {
			const data = await productApi.updateProductVisibility(product._id, !product.isPublished)

			runInAction(() => (product.isPublished = data.isPublished))

			toast.success('Видимість товару оновлено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося змінити видимість товару')
			}
		}
	}

	async changeStatus(product: Product, status: Product['status']) {
		try {
			const data = await productApi.updateProductStatus(product._id, status)
			runInAction(() => (product.status = data.status))
			toast.success('Статус товару оновлено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося змінити видимість товару')
			}
		}
	}

	removeProduct = async (id: string) => {
		try {
			await productApi.deleteProductApi(id)
			runInAction(() => {
				this.products = this.products.filter(p => p._id !== id)
				this.adminProducts = this.adminProducts.filter(p => p._id !== id)
				this.total -= 1
				this.totalAdmin -= 1
			})
			toast.success('Товар видалено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося змінити видимість товару')
			}
		}
	}

	setDiscountProducts(products: Product[]) {
		this.discountProducts = products
	}

	setDiscountSubcategories(subcategories: Subcategory[]) {
		this.discountSubcategories = subcategories
	}

	setDiscountTotal(total: number) {
		this.discountTotal = total
	}
}

export const productStore = new ProductStore()
