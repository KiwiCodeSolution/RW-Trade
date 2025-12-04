'use client'

import { Locale, Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import AddCartBtn from './AddCartBtn'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

interface PriceComponentProps {
	product: Product
	locale: Locale
	typePage?: 'client' | 'admin'
}

const PriceAndAddCartComponent = observer(({ product, locale, typePage }: PriceComponentProps) => {
	const { exchangeRate, isWholesale } = productStore

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const priceLocal = useMemo(() => {
		// базова ціна
		const base = isWholesale
			? (product.wholesalePrice ?? 0)
			: (product.price ?? product.priceCurrency ?? 0)

		// множимо на курс, лише якщо це priceCurrency
		const finalPrice =
			product.priceCurrency != null && product.price == null ? base * exchangeRate : base

		return +finalPrice.toFixed(2)
	}, [isWholesale, product.wholesalePrice, product.price, product.priceCurrency, exchangeRate])

	if (!mounted) return null

	return (
		<>
			<p className={`${typePage === 'admin' ? 'text-sm' : 'text-xl'} font-medium`}>
				{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal}₴
			</p>
			<AddCartBtn product={product} typePage={typePage} />
		</>
	)
})

export default PriceAndAddCartComponent
