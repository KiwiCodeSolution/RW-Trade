'use client'

import { Cart, Timer } from '@/assets/icons'

import { Locale, Product, ProductStatus } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import AddCartBtn from './AddCartBtn'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

type ProductInfoComponentProps = {
	product: Product
	locale: Locale
	typePage?: 'client' | 'admin'
}

const ProductInfoComponent = observer(
	({ product, locale, typePage }: ProductInfoComponentProps) => {
		const { exchangeRate, isWholesale } = productStore
		const [mounted, setMounted] = useState(false)

		useEffect(() => setMounted(true), [])

		const priceLocal = useMemo(() => {
			const base = isWholesale
				? (product.wholesalePrice ?? 0)
				: (product.price ?? product.priceCurrency ?? 0)

			return +(
				product.priceCurrency != null && product.price == null ? base * exchangeRate : base
			).toFixed(2)
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

		const text = texts[locale]?.[product.status] ?? ''

		const showCart = product.status === ProductStatus.IN_STOCK
		const currentBgStyle = product.status === ProductStatus.EXPECTED ? 'bg-sc-3' : 'bg-sc-2'

		return showCart ? (
			// Товар в наявності — текст і кнопка в одному рядку
			<div className='w-full h-[64px] flex items-center justify-between'>
				<p
					className={`${typePage === 'admin' ? 'text-sm' : 'text-sm xl:text-xl'} font-medium`}
				>
					{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal}₴
				</p>
				<AddCartBtn product={product} typePage={typePage} />
			</div>
		) : (
			// Товар не в наявності — вертикальна колонка
			<div className='w-full h-[64px] flex items-center justify-between'>
				<div className='flex flex-col gap-y-1'>
					<p
						className={`${typePage === 'admin' ? 'text-sm' : 'text-sm xl:text-xl'} font-medium`}
					>
						{text}
					</p>
					{product.status === ProductStatus.ON_ORDER && (
						<p
							className={`${typePage === 'admin' ? 'text-sm' : 'text-sm xl:text-base'} font-medium`}
						>
							{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal}₴
						</p>
					)}
				</div>
				<div
					className={`${typePage === 'admin' ? 'w-11 h-11' : 'w-[64px] h-[64px]'} rounded-lg p-2 flex items-center justify-center ${currentBgStyle}`}
				>
					{product.status === ProductStatus.EXPECTED ? (
						<Timer color='#606975' />
					) : (
						<Cart variant='white' />
					)}
				</div>
			</div>
		)
	}
)

export default ProductInfoComponent
