import { Product, Subcategory } from '@/types/baseTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export type DiscountProductsResponse = {
	items: Product[]
	subcategories: Subcategory[]
	totalItems: number
}

export const fetchDiscountProductsCached = async (): Promise<DiscountProductsResponse> => {
	const res = await fetch(`${API_URL}/products/discounts`, {
		next: {
			revalidate: 60 // кеш 1 хв
		}
	})

	if (!res.ok) {
		throw new Error('Failed to fetch discount products')
	}

	return res.json()
}
