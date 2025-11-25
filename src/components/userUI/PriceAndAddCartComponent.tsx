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

	// 🧠 Мемо рахуємо завжди, незалежно від mounted
	const priceLocal = useMemo(() => {
		const base = isWholesale ? (product.wholesalePrice ?? product.price) : product.price
		return +(base * exchangeRate).toFixed(2)
	}, [product.price, product.wholesalePrice, exchangeRate, isWholesale])

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
