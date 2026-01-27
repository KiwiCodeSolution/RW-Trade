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
	currentCreteCategory: Category | null = null

	constructor() {
		makeAutoObservable(this)
		this.fetchCategories()
	}

	async fetchCategories({ pageType }: { pageType?: 'admin' | 'user' } = { pageType: 'user' }) {
		this.loading = true
		try {
			const data: Category[] = await getCategories({ pageType })
			runInAction(() => {
				this.categories = data
			})
		} catch (err) {
			console.error('Помилка завантаження категорій:', err)
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}

	setCurrentCreateCategory(category: Category) {
		this.currentCreteCategory = category
	}
}

export const categoryStore = new CategoryStore()
