// src/store/CategoryStore.ts
import { Category } from '@/types/baseTypes'

import { getCategories } from '@/api/categories'

import { makeAutoObservable, runInAction } from 'mobx'

// interface CategoryWithSub {
// 	category: Category
// 	subcategories: Subcategory[]
// }

class CategoryStore {
	categories: Category[] = []
	loading = false

	private storageKey = 'RWT_Categories'

	constructor() {
		makeAutoObservable(this)

		if (typeof window !== 'undefined') {
			const cached = localStorage.getItem(this.storageKey)
			if (cached) {
				this.categories = JSON.parse(cached)
			} else {
				this.fetchCategories() // якщо кешу нема, робимо fetch
			}
		}
	}

	async fetchCategories() {
		if (this.categories.length) return // не перезаписуємо, якщо вже є

		this.loading = true
		try {
			const data: Category[] = await getCategories()

			runInAction(() => {
				this.categories = data
				if (typeof window !== 'undefined') {
					localStorage.setItem(this.storageKey, JSON.stringify(data))
				}
			})
		} catch (err) {
			console.error('Помилка завантаження категорій', err)
		} finally {
			runInAction(() => (this.loading = false))
		}
	}
}

export const categoryStore = new CategoryStore()
