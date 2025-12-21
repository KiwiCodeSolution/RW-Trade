import { BASE_URL } from '@/utils/config'

import { CreatePromoBannerDto, PromoBanner } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'

// Отримати поточний промо-банер
export async function getPromoBanner(): Promise<PromoBanner | null> {
	try {
		const res = await fetch(`${BASE_URL}/promo-banner`, { cache: 'no-store' })
		if (!res.ok) throw new Error()
		return (await res.json()) as PromoBanner
	} catch (e) {
		console.error('Помилка отримання промо-банера:', e)
		return null
	}
}

// Створити промо-банер
export async function createPromoBanner(
	data: CreatePromoBannerDto & { imageFile: File }
): Promise<PromoBanner | null> {
	try {
		const formData = new FormData()
		formData.append('title', JSON.stringify(data.title))
		formData.append('subtitle', JSON.stringify(data.subtitle))
		formData.append('firstText', JSON.stringify(data.firstText))
		formData.append('secondText', JSON.stringify(data.secondText))
		formData.append('thirdText', JSON.stringify(data.thirdText))
		formData.append('link', data.link)
		formData.append('image', data.imageFile) // обов'язково

		const res = await fetchWithAuth(`${BASE_URL}/promo-banner`, {
			method: 'POST',
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as PromoBanner
	} catch (e) {
		console.error('Помилка створення промо-банера:', e)
		return null
	}
}

// Оновити промо-банер
export async function updatePromoBanner(
	data: PromoBanner & { imageFile?: File | null }
): Promise<PromoBanner | null> {
	try {
		const formData = new FormData()
		formData.append('title', JSON.stringify(data.title))
		formData.append('subtitle', JSON.stringify(data.subtitle))
		formData.append('firstText', JSON.stringify(data.firstText))
		formData.append('secondText', JSON.stringify(data.secondText))
		formData.append('thirdText', JSON.stringify(data.thirdText))
		formData.append('link', data.link)
		formData.append('isPublished', data.isPublished.toString())
		if (data.imageFile) formData.append('image', data.imageFile)

		const res = await fetchWithAuth(`${BASE_URL}/promo-banner`, {
			method: 'PATCH',
			body: formData
		})

		if (!res.ok) throw new Error()
		return (await res.json()) as PromoBanner
	} catch (e) {
		console.error('Помилка оновлення промо-банера:', e)
		return null
	}
}

// Видалити промо-банер
export async function deletePromoBanner(): Promise<boolean> {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/promo-banner`, {
			method: 'DELETE'
		})
		if (!res.ok) throw new Error()
		return true
	} catch (e) {
		console.error('Помилка видалення промо-банера:', e)
		return false
	}
}
