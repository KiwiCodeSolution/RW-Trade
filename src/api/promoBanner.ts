import { api } from '@/utils/axios'

import { CreatePromoBannerDto, PromoBanner } from '@/types/baseTypes'

// Отримати поточний промо-банер
export const getPromoBanner = async (): Promise<PromoBanner | null> => {
	const { data } = await api.get('/promo-banner', { params: { cache: 'no-store' } })

	return data
}

// Створити промо-банер
export const createPromoBanner = async (
	data: CreatePromoBannerDto & { imageFile: File }
): Promise<PromoBanner | null> => {
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
}

// Оновити промо-банер
export const updatePromoBanner = async (
	data: PromoBanner & { imageFile?: File | null }
): Promise<PromoBanner | null> => {
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
}

// Видалити промо-банер
export const deletePromoBanner = async (): Promise<boolean> => {
	await api.delete('/promo-banner')
	return true
}
