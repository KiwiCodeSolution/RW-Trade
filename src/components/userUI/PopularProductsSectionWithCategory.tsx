'use client'

import { Category, Locale, Product } from '@/types/baseTypes'

import { getProductsByCategoryId } from '@/api/products'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'
import CategoryControl from './CategoryControl'
import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'

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
	const [category, setCategory] = useState<Category | undefined>(undefined)

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

	if (!categories.length) return null

	const isDiscountsCategory = category?.slug === 'discounts'

	return (
		<>
			<div className='hidden lg:grid grid-rows-3 gap-9 mb-9'>
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
			<div className='lg:hidden'>
				<div className='mb-7 lg:hidden'>
					<CategoryControl setCategory={setCategory} categories={categories} />
				</div>
				<ProductComponentSortAndFilters
					locale={locale}
					categoryId={isDiscountsCategory ? undefined : category?._id}
					isDiscountMode={isDiscountsCategory}
					typeSection='home'
					isShowSotr={false}
				/>
			</div>
		</>
	)
})

export default PopularProductsSectionWithCategory
