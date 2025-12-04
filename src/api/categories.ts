import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

type SubcategoryPayload = {
	title: {
		uk: string
		en: string
	}
}

export async function getCategories() {
	try {
		const res = await axios.get(`${BASE_URL}/categories`)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання категорій')
			: 'Помилка отримання категорій'
		toast.error(msg)
		throw err
	}
}

export async function getCategoriesByID({ id, token }: { id: string; token: string }) {
	console.log('TOKEN', token)
	try {
		const res = await axios.get(`${BASE_URL}/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання категорій')
			: 'Помилка отримання категорій'

		throw err
	}
}

export async function createSubCategory({
	id,
	data,
	token
}: {
	id: string
	data: SubcategoryPayload
	token: string
}) {
	try {
		const res = await axios.post(`${BASE_URL}/categories/${id}/subcategories`, data, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка створення підкатегорій')
			: 'Помилка створення підкатегорій'
		toast.error(msg)
		throw err
	}
}

export async function updateSubCategory({
	id,
	data,
	token,
	subId
}: {
	id: string
	subId: string
	data: SubcategoryPayload
	token: string
}) {
	try {
		const res = await axios.patch(`${BASE_URL}/categories/${id}/subcategories/${subId}`, data, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка оновлення підкатегорій')
			: 'Помилка оновлення підкатегорій'
		toast.error(msg)
		throw err
	}
}

export async function deleteSubCategory({
	id,
	subId,
	token
}: {
	id: string
	subId: string
	token: string
}) {
	try {
		const res = await axios.delete(`${BASE_URL}/categories/${id}/subcategories/${subId}`, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
				'Content-Type': 'application/json'
			}
		})
		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка видалення підкатегорії')
			: 'Помилка видалення підкатегорії'
		toast.error(msg)
		throw err
	}
}
