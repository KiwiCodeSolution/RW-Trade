'use client'

import { BASE_URL } from '@/utils/config'

import { ItemsFilterParams } from '@/types/baseTypes'

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

		return res.data
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
