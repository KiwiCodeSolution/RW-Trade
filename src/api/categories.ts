import { api } from '@/utils/axios'

import { ApiError } from '@/types/apiError'

import { toast } from '@/lib/toast'

type SubcategoryPayload = {
	title: {
		uk: string
		en: string
	}
}

// ---------------- GET ALL CATEGORIES ----------------
export async function getCategories(
	{ pageType }: { pageType?: 'admin' | 'user' } = { pageType: 'user' }
) {
	try {
		const res = await api.get('/categories')
		return res.data
	} catch (err: unknown) {
		console.error('Помилка отримання категорій:', err)
		if (pageType === 'admin') {
			toast.error('Не вдалося отримати категорії')
		}

		throw err
	}
}

// ---------------- GET CATEGORY BY ID ----------------
export async function getCategoriesByID({ id }: { id: string }) {
	try {
		const res = await api.get(`/categories/${id}`)
		return res.data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// ---------------- CREATE SUBCATEGORY ----------------
export async function createSubCategory({ id, data }: { id: string; data: SubcategoryPayload }) {
	try {
		const res = await api.post(`/categories/${id}/subcategories`, data)
		return res.data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// ---------------- UPDATE SUBCATEGORY ----------------
export async function updateSubCategory({
	id,
	subId,
	data
}: {
	id: string
	subId: string
	data: SubcategoryPayload
}) {
	try {
		const res = await api.patch(`/categories/${id}/subcategories/${subId}`, data)
		return res.data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}

// ---------------- DELETE SUBCATEGORY ----------------
export async function deleteSubCategory({ id, subId }: { id: string; subId: string }) {
	try {
		const res = await api.delete(`/categories/${id}/subcategories/${subId}`)
		return res.data
	} catch (err) {
		const error = err as ApiError

		if (error.isAuthError) {
			throw error
		}

		throw error
	}
}
