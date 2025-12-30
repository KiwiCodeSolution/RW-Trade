import { api } from '@/utils/axios'

import { Banner, CreateBannerDto } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

// Отримати всі банери
export const getAllBanners = async (): Promise<Banner[]> => {
	try {
		const { data } = await api.get('/banners')
		return data
	} catch (err: unknown) {
		console.error('Помилка отримання банерів:', err)
		toast.error('Не вдалося отримати банери')
		return []
	}
}

// Створити банер
export const createBanner = async (
	data: CreateBannerDto & { imageFile?: File | null }
): Promise<Banner | null> => {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)
		if (data.imageFile) formData.append('image', data.imageFile)

		const { data: res } = await api.post('/banners', formData)
		return res
	} catch (err: unknown) {
		console.error('Помилка створення банера:', err)
		toast.error('Не вдалося створити банер')
		return null
	}
}

// Оновити банер
export const updateBanner = async (
	data: Banner & { imageFile?: File | null }
): Promise<Banner | null> => {
	try {
		const formData = new FormData()
		formData.append('link', data.link)
		formData.append('type', data.type)
		formData.append('isPublished', String(data.isPublished))
		if (data.imageFile) formData.append('image', data.imageFile)

		const { data: res } = await api.patch(`/banners/${data._id}`, formData)
		return res
	} catch (err: unknown) {
		console.error('Помилка оновлення банера:', err)
		toast.error('Не вдалося оновити банер')
		return null
	}
}

// Видалити банер
export const deleteBanner = async (id: string): Promise<boolean> => {
	try {
		await api.delete(`/banners/${id}`)
		return true
	} catch (err: unknown) {
		console.error('Помилка видалення банера:', err)
		toast.error('Не вдалося видалити банер')
		return false
	}
}
