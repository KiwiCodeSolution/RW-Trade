import { Cart, Timer } from '@/assets/icons'

import { Locale, Product, ProductStatus } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

type Props = {
	locale: Locale
	status: Product['status']
	typePage?: 'client' | 'admin'
	product: Product
}

const OtherStatusesProductBtnComponents = observer(
	({ product, locale, status, typePage }: Props) => {
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
		}, [
			isWholesale,
			product.wholesalePrice,
			product.price,
			product.priceCurrency,
			exchangeRate
		])

		if (!mounted) return null
		const texts = {
			en: {
				expected: 'Expected',
				on_order: 'On order',
				in_stock: 'In stock'
			},
			uk: {
				expected: 'Очікується',
				on_order: 'Під замовлення',
				in_stock: 'В наявності'
			}
		}

		const text = texts[locale]?.[status] ?? ''

		if (status === ProductStatus.IN_STOCK) return null

		const currentBgStyle = status === ProductStatus.EXPECTED ? 'bg-sc-3' : 'bg-sc-2'

		return (
			<>
				<div className='flex flex-col gap-y-1'>
					<p className={`${typePage === 'admin' ? 'text-sm' : 'text-xl'} font-medium`}>
						{text}
					</p>
					{status === ProductStatus.ON_ORDER && (
						<p
							className={`${typePage === 'admin' ? 'text-sm' : 'text-base'} font-medium`}
						>
							{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal}₴
						</p>
					)}
				</div>
				<div
					className={`${typePage === 'admin' ? 'w-11 h-11' : 'w-[64px] h-[64px]'} rounded-lg p-2 flex items-center justify-center ${currentBgStyle}`}
				>
					{status === ProductStatus.EXPECTED ? (
						<Timer color='#606975' />
					) : (
						<Cart variant='white' />
					)}
				</div>
			</>
		)
	}
)

export default OtherStatusesProductBtnComponents
