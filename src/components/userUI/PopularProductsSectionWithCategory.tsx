'use client'

import { Locale, Product } from '@/types/baseTypes'

import { getProductsByCategoryId } from '@/api/products'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'
import CategoryControl from './CategoryControl'
import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

const PopularProductsSectionWithCategory = observer(() => {
	const { categories } = categoryStore
	const locale = useLocale() as Locale

	/* ---------------- MOBILE STATE (slug-based) ---------------- */
	const [categorySlug, setCategorySlug] = useState<string>('all')

	const activeCategory = useMemo(() => {
		if (categorySlug === 'all') return undefined
		return categories.find(c => c.slug === categorySlug)
	}, [categorySlug, categories])

	const isDiscountsCategory = activeCategory?.slug === 'discounts'

	/* ---------------- DESKTOP PART (unchanged) ---------------- */
	const [firstProducts, setFirstProducts] = useState<Product[]>([])
	const [secondProducts, setSecondProducts] = useState<Product[]>([])
	const [thirdProducts, setThirdProducts] = useState<Product[]>([])
	const [ready, setReady] = useState(false)

	const buildHitProductsSet = (products: Product[], limit = 5): Product[] => {
		const hits = products.filter(p => p.isHit)
		const regular = products.filter(p => !p.isHit)

		if (hits.length >= limit) return hits.slice(0, limit)
		return [...hits, ...regular.slice(0, limit - hits.length)]
	}

	useEffect(() => {
		setReady(true)
	}, [])

	useEffect(() => {
		if (categories.length === 0) {
			categoryStore.fetchCategories()
			return
		}

		if (categories[0]?._id) {
			getProductsByCategoryId({ categoryId: categories[0]._id }).then(products =>
				setFirstProducts(buildHitProductsSet(products))
			)
		}

		if (categories[1]?._id) {
			getProductsByCategoryId({ categoryId: categories[1]._id }).then(products =>
				setSecondProducts(buildHitProductsSet(products))
			)
		}

		if (categories[2]?._id) {
			getProductsByCategoryId({ categoryId: categories[2]._id }).then(products =>
				setThirdProducts(buildHitProductsSet(products))
			)
		}
	}, [categories])

	if (!ready || !categories.length) return null

	return (
		<>
			{/* -------- DESKTOP -------- */}
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

			{/* -------- MOBILE -------- */}
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
})

export default PopularProductsSectionWithCategory
