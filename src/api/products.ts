'use client'

import { BASE_URL } from '@/utils/config'

import { ItemsFilterParams } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'
import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'

export async function getProducts() {
	try {
		const res = await axios.get(`${BASE_URL}/products`)

		return res.data
	} catch (err: unknown) {
		const msg = isAxiosError(err)
			? (err.response?.data?.message ?? 'Помилка отримання продуктів')
			: 'Помилка отримання продуктів'
		toast.error(msg)
		throw err
	}
}

export async function getProductsByCategoryId({ categoryId }: { categoryId: string }) {
	try {
		const res = await axios.get(`${BASE_URL}/products/by-category/${categoryId}`)
		const products = res.data

		// Сортування по статусу
		const statusOrder: Record<string, number> = { in_stock: 0, expect: 1, on_order: 2 }
		const sortedProducts = products.sort(
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

export async function getExchangeRate() {
	try {
		const rate = await axios.get(`${BASE_URL}/currency/latest`)
		return rate
	} catch (error) {
		console.error('Failed to fetch exchange rate', error)
	}
}

export async function fetchFilteredProducts(params: ItemsFilterParams) {
	const {
		lang,
		categoryId,
		subCategoryId,
		priceRange,
		country,
		sort,
		limit = 16,
		page = 1
	} = params

	const q = new URLSearchParams()
	if (lang) q.append('lang', lang)

	if (categoryId && categoryId !== 'all') q.append('categoryId', categoryId)
	if (subCategoryId && subCategoryId !== 'all') q.append('subCategoryId', subCategoryId)
	if (priceRange?.length === 2) q.append('priceRange', `${priceRange[0]},${priceRange[1]}`)
	if (country?.length) q.append('country', country.join(','))
	if (sort) q.append('sort', sort)
	q.append('limit', String(limit))
	q.append('page', String(page))

	const url = `${BASE_URL}/products/filter?${q.toString()}`
	const { data } = await axios.get(url)
	return data
}

export async function fetchFilteredAdminProducts(params: ItemsFilterParams) {
	const {
		lang,
		categoryId,
		subCategoryId,
		priceRange,
		country,
		sort,
		limit = 16,
		page = 1
	} = params

	const q = new URLSearchParams()
	if (lang) q.append('lang', lang)

	if (categoryId && categoryId !== 'all') q.append('categoryId', categoryId)
	if (subCategoryId && subCategoryId !== 'all') q.append('subCategoryId', subCategoryId)
	if (priceRange?.length === 2) q.append('priceRange', `${priceRange[0]},${priceRange[1]}`)
	if (country?.length) q.append('country', country.join(','))
	if (sort) q.append('sort', sort)
	q.append('limit', String(limit))
	q.append('page', String(page))

	const url = `${BASE_URL}/products/filter/admin?${q.toString()}`
	const { data } = await axios.get(url)
	return data
}

export async function updateProductVisibility(id: string, isPublished: boolean) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/products/${id}/visibility`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ isPublished })
		})

		return await res.json()
	} catch {
		toast.error('Не вдалося змінити видимість товару')
		throw new Error()
	}
}

export async function updateProductStatus(
	id: string,
	status: 'in_stock' | 'expected' | 'on_order'
) {
	try {
		const res = await fetchWithAuth(`${BASE_URL}/products/${id}/status`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status })
		})

		return await res.json()
	} catch {
		toast.error('Не вдалося змінити статус товару')
		throw new Error()
	}
}

export async function deleteProduct(id: string) {
	try {
		await fetchWithAuth(`${BASE_URL}/products/${id}`, {
			method: 'DELETE'
		})
	} catch {
		toast.error('Не вдалося видалити товар')
		throw new Error()
	}
}
