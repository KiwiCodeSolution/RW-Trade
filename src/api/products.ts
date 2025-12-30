import { api } from '@/utils/axios'

import { CreateProductDto, ItemsFilterParams } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

import { isAxiosError } from 'axios'

// -------------------- PUBLIC --------------------

// список продуктів (публічний)
export const getProducts = async () => {
	try {
		const { data } = await api.get('/products')
		return data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання продуктів')
			: 'Помилка отримання продуктів'
		toast.error(msg)
		throw err
	}
}

// отримати продукти по категорії (публічний)
export const getProductsByCategoryId = async ({ categoryId }: { categoryId: string }) => {
	try {
		const { data } = await api.get(`/products/by-category/${categoryId}`)

		const statusOrder: Record<string, number> = { in_stock: 0, expect: 1, on_order: 2 }
		const sortedProducts = data.sort(
			(a: { status: string }, b: { status: string }) =>
				(statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
		)

		return sortedProducts
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання продуктів')
			: 'Помилка отримання продуктів'
		toast.error(msg)
		throw err
	}
}

// отримати курс (публічний)
export const getExchangeRate = async () => {
	try {
		const { data } = await api.get('/currency/latest')
		return data
	} catch (err: unknown) {
		toast.error('Не вдалося отримати курс')
		throw err
	}
}

// знижки (публічний)
export const fetchDiscountProductsApi = async () => {
	try {
		const { data } = await api.get('/products/discounts')
		return data
	} catch (err: unknown) {
		toast.error('Не вдалося отримати знижки')
		throw err
	}
}

// фільтрація (публічна)
export const fetchFilteredProducts = async (params: ItemsFilterParams) => {
	const { data } = await api.get('/products/filter', { params })
	return data
}

export const createProductApi = async (dto: CreateProductDto, files?: File[]) => {
	const form = new FormData()

	Object.entries(dto).forEach(([key, value]) => {
		if (key === 'images') {
			form.append('images', JSON.stringify(value ?? []))
			return
		}

		if (typeof value === 'object') form.append(key, JSON.stringify(value))
		else if (value !== undefined && value !== null) form.append(key, String(value))
	})

	files?.forEach(f => form.append('images', f))

	const { data } = await api.post('/products', form)
	return data
}

export const updateProductApi = async (id: string, dto: CreateProductDto, files?: File[]) => {
	const form = new FormData()

	Object.entries(dto).forEach(([key, value]) => {
		// пропускаємо системні поля, але НЕ images
		if (['_id', 'slugUk', 'slugEn', 'createdAt', 'updatedAt', '__v'].includes(key)) return

		if (key === 'images') {
			// ✅ надсилаємо масив URL/плейсхолдерів як JSON
			form.append('images', JSON.stringify(value ?? []))
			return
		}

		if (typeof value === 'object') form.append(key, JSON.stringify(value))
		else if (value !== undefined && value !== null) form.append(key, String(value))
	})

	// ✅ файли лишаємо як є (те саме поле images для multer)
	files?.forEach(f => form.append('images', f))

	const { data } = await api.patch(`/products/${id}`, form)
	return data
}

// отримати продукт за id
export const getProductByIdApi = async (id: string) => {
	const { data } = await api.get(`/products/${id}`)
	return data
}

// видалення
export const deleteProductApi = async (id: string) => {
	const { data } = await api.delete(`/products/${id}`)
	return data
}

// зміна видимості
export const updateProductVisibility = async (id: string, isPublished: boolean) => {
	const { data } = await api.patch(`/products/${id}/visibility`, { isPublished })

	return data
}

// зміна статусу
export const updateProductStatus = async (id: string, status: string) => {
	const { data } = await api.patch(`/products/${id}/status`, { status })
	return data
}

// редагування курсу (для адміна, через інтерсептор)
export const updateExchangeRate = async (body: { rate: number }) => {
	const { data } = await api.patch('/currency', body)
	return data
}

// фільтрація для адміна (тільки через інтерсептор, якщо треба)
export const fetchFilteredAdminProducts = async (params: ItemsFilterParams) => {
	const { data } = await api.get('/products/filter/admin', { params })
	return data
}
