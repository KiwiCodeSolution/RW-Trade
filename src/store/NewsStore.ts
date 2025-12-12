import { CreateNewsDto, ItemsFilterParams, NewsArticle } from '@/types/baseTypes'

import { createNewsArticle, deleteNews, getNewsWithPagination, updateNewsArticle } from '@/api/news'

import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class NewsStore {
	news: NewsArticle[] = []
	isLoading = false
	total = 0
	constructor() {
		makeAutoObservable(this)
		this.fetchNews()
	}

	async fetchNews(params?: ItemsFilterParams) {
		try {
			this.isLoading = true

			const res = await getNewsWithPagination({
				page: params?.page ?? 1,
				limit: params?.limit ?? 16,
				sort: 'DATE_ADDED',
				...params
			})

			runInAction(() => {
				this.news = res.data
				this.total = res.total ?? res.data.length
			})
		} catch (error) {
			console.error('❌ Failed to fetch news:', error)
			toast.error('Не вдалося завантажити новини')
		} finally {
			runInAction(() => {
				this.isLoading = false
			})
		}
	}

	async addNews({ data, token, files }: { data: CreateNewsDto; token: string; files?: File[] }) {
		this.isLoading = true
		try {
			const newArticle = await createNewsArticle({ data, token, files })
			runInAction(() => {
				this.news.unshift(newArticle)
				this.total += 1
			})
			toast.success('Новину успішно створено')
			return newArticle
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося створити новину')
			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async updateNews({
		id,
		data,
		token,
		files
	}: {
		id: string
		data: CreateNewsDto
		token: string
		files?: File[]
	}) {
		this.isLoading = true
		try {
			const updated = await updateNewsArticle({ id, data, token, files })
			runInAction(() => {
				const index = this.news.findIndex(n => n._id === id)
				if (index !== -1) this.news[index] = updated
			})
			toast.success('Новину успішно оновлено')
			return updated
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося оновити новину')
			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	deleteNews = async (id: string, token: string) => {
		this.isLoading = true
		try {
			await deleteNews(id, token)
			runInAction(() => {
				this.news = this.news.filter(n => n._id !== id)
				this.total -= 1
			})
			toast.success('Новину успішно видалено')
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося видалити новину')
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}
}

export const newsStore = new NewsStore()
