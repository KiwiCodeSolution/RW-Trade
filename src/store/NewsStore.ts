import { CreateNewsDto, NewsArticle } from '@/types/baseTypes'

import {
	createNewsArticle,
	deleteNews,
	getAllNewsAdmin,
	getNewsWithPagination,
	updateNewsArticle
} from '@/api/news'

import { NewsSort } from '@/lib/sortOptions'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class NewsStore {
	news: NewsArticle[] = []
	isLoading = false
	total = 0

	// адмінська частина
	adminNews: NewsArticle[] = []
	adminTotal = 0
	adminLoading = false

	constructor() {
		makeAutoObservable(this)
		this.fetchNews()
	}

	// публічні новини (тільки isPublished)
	async fetchNews(params?: { page?: number; limit?: number; sort?: NewsSort }) {
		this.isLoading = true
		try {
			const res = await getNewsWithPagination({
				page: params?.page,
				limit: params?.limit,
				sort: params?.sort ?? 'date_desc'
			})

			runInAction(() => {
				this.news = res.items
				this.total = res.totalItems
			})
		} catch (error) {
			console.error('❌ Failed to fetch news:', error)
			toast.error('Не вдалося завантажити новини')
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	// адмінські новини — ВСІ стани
	async fetchAdminNews(params?: { page?: number; limit?: number; sort?: NewsSort }) {
		this.adminLoading = true
		try {
			const res = await getAllNewsAdmin({
				page: params?.page,
				limit: params?.limit,
				sort: params?.sort ?? 'date_desc'
			})

			runInAction(() => {
				this.adminNews = res.items
				this.adminTotal = res.totalItems
			})
		} catch (error) {
			console.error('❌ Failed to fetch admin news:', error)
			toast.error('Не вдалося завантажити новини для адмінки')
		} finally {
			runInAction(() => (this.adminLoading = false))
		}
	}

	async addNews({ data, files }: { data: CreateNewsDto; files?: File[] }) {
		this.isLoading = true
		try {
			const newArticle = await createNewsArticle({ data, files })
			runInAction(() => {
				this.news.unshift(newArticle)
				this.total += 1
			})

			return newArticle
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося створити новину')
			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async updateNews({ id, data, files }: { id: string; data: CreateNewsDto; files?: File[] }) {
		this.isLoading = true
		try {
			const updated = await updateNewsArticle({ id, data, files })
			runInAction(() => {
				const index = this.news.findIndex(n => n._id === id)
				if (index !== -1) this.news[index] = updated

				// синхронізація з адмінським списком
				const adminIndex = this.adminNews.findIndex(n => n._id === id)
				if (adminIndex !== -1) this.adminNews[adminIndex] = updated
			})

			return updated
		} catch (err) {
			console.error(err)
			toast.error('Не вдалося оновити новину')
			return null
		} finally {
			runInAction(() => (this.isLoading = false))
		}
	}

	async deleteNews(id: string) {
		this.isLoading = true
		try {
			await deleteNews(id)
			runInAction(() => {
				this.news = this.news.filter(n => n._id !== id)
				this.total -= 1

				this.adminNews = this.adminNews.filter(n => n._id !== id)
				this.adminTotal -= 1
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
