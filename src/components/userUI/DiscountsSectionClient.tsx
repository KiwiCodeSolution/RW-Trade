'use client'

import { Locale } from '@/types/baseTypes'

import { DiscountProductsResponse } from '@/api/api-fetch/discountProducts'

import { productStore } from '@/store/ProductsStore'

import DiscountsSection from './DiscountsSection'

import { useEffect } from 'react'

const DiscountsSectionClient = ({
	data,
	title,
	btn,
	locale
}: {
	data: DiscountProductsResponse
	title: string
	btn: string
	locale: Locale
}) => {
	useEffect(() => {
		productStore.setDiscountProducts(data.items)
		productStore.setDiscountSubcategories(data.subcategories)
		productStore.setDiscountTotal(data.totalItems)
	}, [data])

	return <DiscountsSection title={title} btn={btn} locale={locale} />
}

export default DiscountsSectionClient
