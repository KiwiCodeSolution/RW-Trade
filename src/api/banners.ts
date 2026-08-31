import { api } from '@/utils/axios'

import { Banner, CreateBannerDto } from '@/types/baseTypes'

// Отримати всі банери
export const getAllBanners = async (): Promise<Banner[]> => {
	const { data } = await api.get('/banners')
	return data
}

export const getAllAdminBanners = async (): Promise<Banner[]> => {
	const { data } = await api.get('/banners')
	return data
}

// Створити банер
export const createBanner = async (
	data: CreateBannerDto & { imageFile?: File | null }
): Promise<Banner | null> => {
	const formData = new FormData()
	formData.append('link', data.link)
	formData.append('type', data.type)
	if (data.imageFile) formData.append('image', data.imageFile)

	const { data: res } = await api.post('/banners', formData)
	return res
}

// Оновити банер
export const updateBanner = async (
	data: Banner & { imageFile?: File | null }
): Promise<Banner | null> => {
	const formData = new FormData()
	formData.append('link', data.link)
	formData.append('type', data.type)
	formData.append('isPublished', String(data.isPublished))
	if (data.imageFile) formData.append('image', data.imageFile)

	const { data: res } = await api.patch(`/banners/${data._id}`, formData)
	return res
}

// Видалити банер
export const deleteBanner = async (id: string): Promise<boolean> => {
	await api.delete(`/banners/${id}`)
	return true
}
