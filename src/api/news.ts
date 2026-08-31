// api/news.ts
import { api } from '@/utils/axios'

import { ApiError } from '@/types/apiError'
import { CreateNewsDto, NewsArticle } from '@/types/baseTypes'

import { NewsSort } from '@/lib/sortOptions'

// -------------------- PUBLIC --------------------

// Отримання новин з пагінацією
export const getNewsWithPagination = async (params?: {
	page?: number
	limit?: number
	sort?: NewsSort
}) => {
	try {
		const q = new URLSearchParams({
			page: String(params?.page ?? 1),
			limit: String(params?.limit ?? 16),
			sort: String(params?.sort ?? 'date_desc')
		})
		const { data } = await api.get<{ items: NewsArticle[]; totalItems: number }>(
			`/news?${q.toString()}`
		)

		return data
	} catch (err) {
		const error = err as ApiError
		throw error
	}
}

export const getAllNewsAdmin = async (params?: {
	page?: number
	limit?: number
	sort?: NewsSort
}) => {
	try {
		const res = await api.get('/news/admin', {
			params: {
				page: params?.page ?? 1,
				limit: params?.limit ?? 20,
				sort: String(params?.sort ?? 'date_desc')
			}
		})

		return res.data
	} catch (err) {
		const error = err as ApiError
		throw error
	}
}
// Отримати новину по id
export const getNewsById = async (id: string) => {
	try {
		const { data } = await api.get<NewsArticle>(`/news/${id}`)
		return data
	} catch (err) {
		const error = err as ApiError
		throw error
	}
}

// Створення новини
export const createNewsArticle = async ({
	data,
	files
}: {
	data: CreateNewsDto
	files?: File[]
}) => {
	try {
		const formData = new FormData()
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'image') return
			if (typeof value === 'object' && value !== null)
				formData.append(key, JSON.stringify(value))
			else if (typeof value === 'boolean') formData.append(key, JSON.stringify(value))
			else if (value !== undefined && value !== null) formData.append(key, String(value))
		})
		files?.forEach(file => formData.append('image', file))

		const { data: res } = await api.post<NewsArticle>('/news', formData)

		return res
	} catch (err) {
		const error = err as ApiError
		throw error
	}
}

// Оновлення новини
export const updateNewsArticle = async ({
	id,
	data,
	files
}: {
	id: string
	data: CreateNewsDto
	files?: File[]
}) => {
	try {
		let res
		const hasFiles = (files ?? []).length > 0
		if (hasFiles) {
			const formData = new FormData()
			Object.entries(data).forEach(([key, value]) => {
				if (value === undefined || value === null) return
				if (typeof value === 'object') formData.append(key, JSON.stringify(value))
				else if (typeof value === 'boolean') formData.append(key, JSON.stringify(value))
				else formData.append(key, String(value))
			})
			files!.forEach(file => formData.append('image', file))
			res = await api.patch<NewsArticle>(`/news/${id}`, formData)
		} else {
			res = await api.patch<NewsArticle>(`/news/${id}`, data)
		}

		return res.data
	} catch (err) {
		const error = err as ApiError
		throw error
	}
}

// Видалення новини
export const deleteNews = async (id: string) => {
	const { data } = await api.delete(`/news/${id}`)

	return data
}
