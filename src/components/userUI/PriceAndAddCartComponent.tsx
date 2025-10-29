'use client'

import { Locale, Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import AddCartBtn from './AddCartBtn'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

interface PriceComponentProps {
	product: Product
	locale: Locale
}

const PriceAndAddCartComponent = observer(({ product, locale }: PriceComponentProps) => {
	const { exchangeRate, isWholesale } = productStore

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	if (!mounted) return null

	const priceLocal = isWholesale
		? product.wholesalePrice
			? product.wholesalePrice * exchangeRate
			: product.price * exchangeRate
		: product.price * exchangeRate

	return (
		<>
			<p className='text-xl font-medium'>
				{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal.toFixed(2)}₴
			</p>
			<AddCartBtn product={product} />
		</>
	)
})

export default PriceAndAddCartComponent
