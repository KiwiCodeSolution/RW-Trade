// api/news.ts
import { api } from '@/utils/axios'

import { CreateNewsDto, NewsArticle } from '@/types/baseTypes'

import { NewsSort } from '@/lib/sortOptions'
import { toast } from '@/lib/toast'

import { AxiosError } from 'axios'

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
	} catch (err: unknown) {
		if (err instanceof AxiosError)
			toast.error(err.response?.data?.message ?? 'Не вдалося отримати новини')
		else if (err instanceof Error) toast.error(err.message)
		else toast.error('Не вдалося отримати новини')
		throw err
	}
}

export const getAllNewsAdmin = async (params?: {
	page?: number
	limit?: number
	sort?: NewsSort
}) => {
	console.log('params', params)
	const res = await api.get('/news/admin', {
		params: {
			page: params?.page ?? 1,
			limit: params?.limit ?? 20,
			sort: String(params?.sort ?? 'date_desc')
		}
	})

	return res.data
}
// Отримати новину по id
export const getNewsById = async (id: string) => {
	try {
		const { data } = await api.get<NewsArticle>(`/news/${id}`)
		return data
	} catch (err: unknown) {
		if (typeof window !== 'undefined') {
			if (err instanceof AxiosError)
				toast.error(err.response?.data?.message ?? 'Не вдалося отримати новину')
			else if (err instanceof Error) toast.error(err.message)
			else toast.error('Не вдалося отримати новину')
		}
		throw err
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
		toast.success('Новину успішно створено')
		return res
	} catch (err: unknown) {
		if (err instanceof AxiosError)
			toast.error(err.response?.data?.message ?? 'Не вдалося створити новину')
		else if (err instanceof Error) toast.error(err.message)
		else toast.error('Не вдалося створити новину')
		throw err
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
		toast.success('Новину успішно оновлено')
		return res.data
	} catch (err: unknown) {
		if (err instanceof AxiosError)
			toast.error(err.response?.data?.message ?? 'Не вдалося оновити новину')
		else if (err instanceof Error) toast.error(err.message)
		else toast.error('Не вдалося оновити новину')
		throw err
	}
}

// Видалення новини
export const deleteNews = async (id: string) => {
	try {
		const { data } = await api.delete(`/news/${id}`)
		toast.success('Новину успішно видалено')
		return data
	} catch (err: unknown) {
		if (err instanceof AxiosError)
			toast.error(err.response?.data?.message ?? 'Не вдалося видалити новину')
		else if (err instanceof Error) toast.error(err.message)
		else toast.error('Не вдалося видалити новину')
		throw err
	}
}
