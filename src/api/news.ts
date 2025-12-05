// api/news.ts
import { BASE_URL } from '@/utils/config'

import { CreateNewsDto, ItemsFilterParams, NewsArticle } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

// Створення новини з файлами
export async function createNewsArticle({
	data,
	token,
	files
}: {
	data: CreateNewsDto
	token: string
	files?: File[]
}): Promise<NewsArticle> {
	try {
		const formData = new FormData()

		// Додаємо всі звичайні поля
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'image') return

			if (typeof value === 'object' && value !== null) {
				formData.append(key, JSON.stringify(value))
				return
			}

			if (typeof value === 'boolean') {
				formData.append(key, JSON.stringify(value)) // ✅ boolean як JSON
				return
			}

			if (value !== undefined && value !== null) {
				formData.append(key, value.toString())
			}
		})

		// Додаємо файли окремо
		;(files ?? []).forEach(file => formData.append('image', file))

		const res = await fetch(`${BASE_URL}/news`, {
			method: 'POST',
			body: formData,
			headers: { Authorization: `Bearer ${token}` },
			credentials: 'include'
		})

		if (!res.ok) {
			const msg = await res.text()
			throw new Error(`Помилка створення новини: ${msg}`)
		}

		return res.json()
	} catch (err: unknown) {
		console.error(err)
		toast.error('Не вдалося створити новину')
		throw err
	}
}

// Оновлення новини з файлами
export async function updateNewsArticle({
	id,
	data,
	token,
	files
}: {
	id: string
	data: CreateNewsDto
	token: string
	files?: File[]
}): Promise<NewsArticle> {
	try {
		const formData = new FormData()

		// Додаємо всі звичайні поля
		Object.entries(data).forEach(([key, value]) => {
			if (key === 'image') return

			if (typeof value === 'object' && value !== null) {
				formData.append(key, JSON.stringify(value))
				return
			}

			if (typeof value === 'boolean') {
				formData.append(key, JSON.stringify(value)) // ✅ boolean як JSON
				return
			}

			if (value !== undefined && value !== null) {
				formData.append(key, value.toString())
			}
		})

		// Додаємо файли окремо
		;(files ?? []).forEach(file => formData.append('image', file))

		const res = await fetch(`${BASE_URL}/news/${id}`, {
			method: 'PATCH',
			body: formData,
			headers: { Authorization: `Bearer ${token}` },
			credentials: 'include'
		})

		if (!res.ok) {
			const msg = await res.text()
			throw new Error(`Помилка оновлення новини: ${msg}`)
		}

		return res.json()
	} catch (err: unknown) {
		console.error(err)
		toast.error('Не вдалося оновити новину')
		throw err
	}
}

// Отримання новин з пагінацією
export async function getNewsWithPagination(params: ItemsFilterParams) {
	const q = new URLSearchParams({
		page: String(params?.page ?? 1),
		limit: String(params?.limit ?? 16),
		sort: String(params?.sort ?? 'DATE_ADDED')
	})

	const res = await fetch(`${BASE_URL}/news?${q.toString()}`)
	console.log('getNewsWithPagination res: ------>', res)
	return res.json()
}
