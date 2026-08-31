'use client'

import { Locale, Product } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CardRow from './CardRow'
import CategoryControl from './CategoryControl'
import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'

import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'

const PopularProductsSectionWithCategoryClient = observer(
	({ initialProducts, locale }: { initialProducts: Product[][]; locale: Locale }) => {
		const { categories } = categoryStore

		const [firstProducts, secondProducts, thirdProducts] = initialProducts

		/* ---------- MOBILE ---------- */
		const [categorySlug, setCategorySlug] = useState('all')

		const activeCategory = useMemo(() => {
			if (categorySlug === 'all') return undefined
			return categories.find(c => c.slug === categorySlug)
		}, [categorySlug, categories])

		const isDiscountsCategory = activeCategory?.slug === 'discounts'

		return (
			<>
				{/* DESKTOP */}
				<div className='hidden lg:grid grid-rows-3 gap-9 mb-9'>
					{firstProducts?.length > 0 && (
						<CardRow
							category={categories[0]}
							section='popular'
							locale={locale}
							products={firstProducts}
						/>
					)}
					{secondProducts?.length > 0 && (
						<CardRow
							category={categories[1]}
							section='popular'
							locale={locale}
							products={secondProducts}
						/>
					)}
					{thirdProducts?.length > 0 && (
						<CardRow
							category={categories[2]}
							section='popular'
							locale={locale}
							products={thirdProducts}
						/>
					)}
				</div>

				{/* MOBILE */}
				<div className='lg:hidden'>
					<div className='mb-7'>
						<CategoryControl
							categories={categories}
							activeSlug={categorySlug}
							onChange={setCategorySlug}
							locale={locale}
						/>
					</div>

					<ProductComponentSortAndFilters
						locale={locale}
						categorySlug={isDiscountsCategory ? undefined : activeCategory?.slug}
						isDiscountMode={isDiscountsCategory}
						typeSection='home'
						isShowSort={false}
					/>
				</div>
			</>
		)
	}
)

export default PopularProductsSectionWithCategoryClient
