import { Product } from '@/types/baseTypes'

import { OrderItem } from '@/store/CartStore'

export function createOrderItem(
	product: Product,
	quantity: number,
	exchangeRate: number,
	isWholesale: boolean
): OrderItem {
	const basePrice = isWholesale
		? (product.wholesalePrice ?? 0)
		: (product.price ?? product.priceCurrency ?? 0)
	const finalPrice =
		product.priceCurrency != null && product.price == null
			? basePrice * exchangeRate
			: basePrice

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
