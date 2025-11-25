import { Product } from '@/types/baseTypes'

import { OrderItem } from '@/store/CartStore'

export function createOrderItem(
	product: Product,
	quantity: number,
	exchangeRate: number,
	isWholesale: boolean
): OrderItem {
	const basePrice = isWholesale ? (product.wholesalePrice ?? product.price) : product.price

	const finalPrice = +(basePrice * exchangeRate).toFixed(2)

	return {
		productId: product._id ?? '',
		productName: product.title,
		quantity,
		basePrice, // оригінальна ціна з бекенду
		finalPrice, // з урахуванням курсу
		categoryId: product.categoryId,
		subCategoryId: product.subCategoryId,
		sku: product.sku,
		isWholesale
	}
}
