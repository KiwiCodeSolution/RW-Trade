import { BASE_URL } from '@/utils/config'

import { Banner, CreateBannerDto } from '@/types/baseTypes'

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

export async function createBanner({
	data,
	token
}: {
	data: CreateBannerDto & { imageFile?: File | null }
	token: string
}) {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)

		if (data.imageFile) formData.append('image', data.imageFile)

		const res = await fetch(`${BASE_URL}/banners`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as Banner
	} catch (e) {
		console.error('Помилка створення банера:', e)
		return null
	}
}

export async function updateBanner({
	id,
	data,
	token
}: {
	id: string
	data: Banner & { imageFile?: File | null }
	token: string
}) {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)
		formData.append('isPublished', data.isPublished.toString())

		if (data.imageFile) formData.append('image', data.imageFile)

		const res = await fetch(`${BASE_URL}/banners/${id}`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${token}` },
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as Banner
	} catch (e) {
		console.error('Помилка оновлення банера:', e)
		return null
	}
}

export async function deleteBanner(id: string, token: string) {
	try {
		const res = await fetch(`${BASE_URL}/banners/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` }
		})

		if (!res.ok) throw new Error()
		return true
	} catch (e) {
		console.error('Помилка видалення банера:', e)
		return false
	}
}
