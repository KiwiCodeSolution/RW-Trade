'use client'

import { Locale, Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'

interface PriceComponentProps {
	price: Product['price']
	wholesalePrice: Product['wholesalePrice']
	locale: Locale
}

const PriceComponent = observer(({ price, wholesalePrice, locale }: PriceComponentProps) => {
	const { exchangeRate, isWholesale } = productStore

	const priceLocal = isWholesale
		? wholesalePrice
			? wholesalePrice * exchangeRate
			: price * exchangeRate
		: price * exchangeRate

	return (
		<p className='text-xl font-medium'>
			{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal.toFixed(2)}₴
		</p>
	)
})

export default PriceComponent
