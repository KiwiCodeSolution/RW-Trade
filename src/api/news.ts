// api/news.ts
import { BASE_URL } from '@/utils/config'

import { CreateNewsDto, NewsArticle } from '@/types/baseTypes'

import { NewsSort } from '@/lib/sortOptions'
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
	if (!token) {
		toast.error('Ви не авторизовані')
		throw new Error('Ви не авторизовані')
	}

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
	if (!token) {
		toast.error('Ви не авторизовані')
		throw new Error('Ви не авторизовані')
	}

	try {
		const hasFiles = (files ?? []).length > 0

		let res: Response

		if (hasFiles) {
			// Якщо є файли — multipart/form-data
			const formData = new FormData()

			Object.entries(data).forEach(([key, value]) => {
				// не додаємо undefined/null
				if (value === undefined || value === null) return

				// для об'єктів — stringify
				if (typeof value === 'object') {
					formData.append(key, JSON.stringify(value))
					return
				}

				// boolean -> stringified JSON (сервер має парсити)
				if (typeof value === 'boolean') {
					formData.append(key, JSON.stringify(value))
					return
				}

				formData.append(key, String(value))
			})

			files!.forEach(file => formData.append('image', file))

			res = await fetch(`${BASE_URL}/news/${id}`, {
				method: 'PATCH',
				body: formData,
				headers: { Authorization: `Bearer ${token}` },
				credentials: 'include'
			})
		} else {
			// Якщо файлів нема — надсилаємо чистий JSON
			res = await fetch(`${BASE_URL}/news/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				credentials: 'include'
			})
		}

		if (!res.ok) {
			const msg = await res.text()
			throw new Error(`Помилка оновлення новини: ${msg}`)
		}
		console.log('res', res)
		return res.json()
	} catch (err: unknown) {
		console.error(err)
		toast.error('Не вдалося оновити новину')
		throw err
	}
}

// Отримання новин з пагінацією
export async function getNewsWithPagination(params?: {
	page?: number
	limit?: number
	sort?: NewsSort
}) {
	const q = new URLSearchParams({
		page: String(params?.page ?? 1),
		limit: String(params?.limit ?? 16),
		sort: String(params?.sort ?? 'date_desc')
	})

	const res = await fetch(`${BASE_URL}/news?${q.toString()}`)

	return res.json()
}

export async function getNewsById(id: string, token: string) {
	if (!token) {
		toast.error('Ви не авторизовані')
		throw new Error('Ви не авторизовані')
	}
	const res = await fetch(`${BASE_URL}/news/${id}`, {
		headers: {
			Authorization: `Bearer ${token ?? ''}`,
			'Content-Type': 'application/json'
		}
	})

	return res.json()
}

export async function deleteNews(id: string, token: string) {
	if (!token) {
		toast.error('Ви не авторизовані')
		throw new Error('Ви не авторизовані')
	}
	const res = await fetch(`${BASE_URL}/news/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token ?? ''}`,
			'Content-Type': 'application/json'
		}
	})

	return res.json()
}
