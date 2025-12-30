import { api } from '@/utils/axios'

import { CreatePromoBannerDto, PromoBanner } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

// Отримати поточний промо-банер
export const getPromoBanner = async (): Promise<PromoBanner | null> => {
	try {
		const { data } = await api.get('/promo-banner', { params: { cache: 'no-store' } })
		return data
	} catch (err) {
		console.error('Помилка отримання промо-банера:', err)
		toast.error('Не вдалося отримати промо-банер')
		return null
	}
}

// Створити промо-банер
export const createPromoBanner = async (
	data: CreatePromoBannerDto & { imageFile: File }
): Promise<PromoBanner | null> => {
	if (!data.imageFile) {
		toast.error('Зображення обов’язкове')
		return null
	}

	try {
		const formData = new FormData()
		formData.append('title', JSON.stringify(data.title))
		formData.append('subtitle', JSON.stringify(data.subtitle))
		formData.append('firstText', JSON.stringify(data.firstText))
		formData.append('secondText', JSON.stringify(data.secondText))
		formData.append('thirdText', JSON.stringify(data.thirdText))
		formData.append('link', data.link)
		formData.append('image', data.imageFile)

		const { data: res } = await api.post('/promo-banner', formData)
		return res
	} catch (err) {
		console.error('Помилка створення промо-банера:', err)
		toast.error('Не вдалося створити промо-банер')
		return null
	}
}

// Оновити промо-банер
export const updatePromoBanner = async (
	data: PromoBanner & { imageFile?: File | null }
): Promise<PromoBanner | null> => {
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

		const { data: res } = await api.patch('/promo-banner', formData)
		return res
	} catch (err) {
		console.error('Помилка оновлення промо-банера:', err)
		toast.error('Не вдалося оновити промо-банер')
		return null
	}
}

// Видалити промо-банер
export const deletePromoBanner = async (): Promise<boolean> => {
	try {
		await api.delete('/promo-banner')
		return true
	} catch (err) {
		console.error('Помилка видалення промо-банера:', err)
		toast.error('Не вдалося видалити промо-банер')
		return false
	}
}
