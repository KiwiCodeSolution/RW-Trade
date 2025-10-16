'use client'

import { WHOLESALE_DISCOUNT } from '@/utils/config'

import { Locale, Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'

interface PriceComponentProps {
	price: Product['price']

	locale: Locale
}

const PriceComponent = observer(({ price, locale }: PriceComponentProps) => {
	const { exchangeRate, isWholesale } = productStore
	// const [isWholesale, setIsWholesale] = useState(false)

	// useEffect(() => {
	// 	const saved = localStorage.getItem('isWholesale')
	// 	setIsWholesale(saved === 'true')
	// }, [])

	let priceUSD = price
	if (isWholesale) priceUSD *= 1 - WHOLESALE_DISCOUNT

	const priceLocal = priceUSD * exchangeRate

	return (
		<p className='text-xl font-medium'>
			{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal.toFixed(2)}₴
		</p>
	)
})

export default PriceComponent
