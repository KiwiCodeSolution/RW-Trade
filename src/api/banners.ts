import { BASE_URL } from '@/utils/config'

import { Banner, CreateBannerDto } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'

// Отримати всі банери
export async function getAllBanners() {
	try {
		const res = await fetch(`${BASE_URL}/banners`, { cache: 'no-store' })
		if (!res.ok) throw new Error()
		return res.json() as Promise<Banner[]>
	} catch (e) {
		console.error('Помилка отримання банерів:', e)
		return []
	}
}

// Створити банер
export async function createBanner(data: CreateBannerDto & { imageFile?: File | null }) {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)
		if (data.imageFile) formData.append('image', data.imageFile)

		const res = await fetchWithAuth(`${BASE_URL}/banners`, {
			method: 'POST',
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as Banner
	} catch (e) {
		console.error('Помилка створення банера:', e)
		return null
	}
}

// Оновити банер
export async function updateBanner(data: Banner & { imageFile?: File | null }) {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)
		formData.append('isPublished', data.isPublished.toString())
		if (data.imageFile) formData.append('image', data.imageFile)

		const res = await fetchWithAuth(`${BASE_URL}/banners/${data._id}`, {
			method: 'PATCH',
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as Banner
	} catch (e) {
		console.error('Помилка оновлення банера:', e)
		return null
	}
}

// Видалити банер
export async function deleteBanner(id: string) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/banners/${id}`, {
			method: 'DELETE'
		})

		if (!res.ok) throw new Error()
		return true
	} catch (e) {
		console.error('Помилка видалення банера:', e)
		return false
	}
}
