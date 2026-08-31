'use client'

import { Category, Locale, Product } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import PopularProductsSectionWithCategoryClient from './PopularProductsSectionWithCategoryClient'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type Props = {
	initialCategories: Category[]
	initialProducts: Product[][]
	locale: Locale
}

const PopularProductsClient = observer(({ initialCategories, initialProducts, locale }: Props) => {
	const [ready, setReady] = useState(false)

	useEffect(() => {
		// 1️⃣ ініціалізуємо store
		categoryStore.setCategories(initialCategories)

		setReady(true)
	}, [initialCategories])

	if (!ready) return null

	return (
		<PopularProductsSectionWithCategoryClient
			initialProducts={initialProducts}
			locale={locale}
		/>
	)
})

export default PopularProductsClient
