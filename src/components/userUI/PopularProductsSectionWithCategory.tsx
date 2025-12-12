'use client'

import { Locale, Product } from '@/types/baseTypes'

import { getProductsByCategoryId } from '@/api/products'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const PopularProductsSectionWithCategory = observer(() => {
	const categories = categoryStore.categories
	const locale = useLocale() as Locale

	const [firstProducts, setFirstProducts] = useState<Product[]>([])
	const [secondProducts, setSecondProducts] = useState<Product[]>([])
	const [thirdProducts, setThirdProducts] = useState<Product[]>([])
	const [ready, setReady] = useState(false)

	useEffect(() => {
		setReady(true)
	}, [])

	useEffect(() => {
		if (categories.length === 0) {
			categoryStore.fetchCategories()
			return
		}

		if (categories[0]?._id) {
			getProductsByCategoryId({ categoryId: categories[0]._id }).then(setFirstProducts)
		}
		if (categories[1]?._id) {
			getProductsByCategoryId({ categoryId: categories[1]._id }).then(setSecondProducts)
		}
		if (categories[2]?._id) {
			getProductsByCategoryId({ categoryId: categories[2]._id }).then(setThirdProducts)
		}
	}, [categories])

	if (!ready) return null

	if (categories.length < 3) return null

	return (
		<div className='grid grid-rows-3 gap-9 mb-9'>
			{firstProducts.length > 0 && (
				<CardRow
					category={categories[0]}
					section='popular'
					locale={locale}
					products={firstProducts}
				/>
			)}
			{secondProducts.length > 0 && (
				<CardRow
					category={categories[1]}
					section='popular'
					locale={locale}
					products={secondProducts}
				/>
			)}
			{thirdProducts.length > 0 && (
				<CardRow
					category={categories[2]}
					section='popular'
					locale={locale}
					products={thirdProducts}
				/>
			)}
		</div>
	)
})

export default PopularProductsSectionWithCategory
