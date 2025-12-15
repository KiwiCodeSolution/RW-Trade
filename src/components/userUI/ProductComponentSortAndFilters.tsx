'use client'

import { useDynamicLimits } from '@/hooks/useDynamicLimits'
import { useListQuery } from '@/hooks/useListQuery'

import { Locale, ProductLimit } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import Spinner from '../commonUI/loader/Spinner'

import ProductCard from './ProductCard'
import QuantityProduct from './QuantityProduct'
import { ProductSort, productSortOptions } from '@/lib/sortOptions'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const ProductComponentSortAndFilters = observer(
	({
		locale,
		categoryId,
		subCategoryId,
		isDiscountMode,
		typeSection,
		isShowSotr = true
	}: {
		locale: Locale
		categoryId?: string
		subCategoryId?: string
		isDiscountMode?: boolean
		typeSection?: 'home' | 'discounts' | 'catalog'
		isShowSotr?: boolean
	}) => {
		const { products, total, isLoading } = productStore

		// 📌 useQueryParams для page, limit, sort
		const { query, setQuery } = useListQuery({
			page: '1',
			limit: '16',
			sort: 'DATE_ADDED' as ProductSort
		})

		const { page, limit, sort } = query

		// 📌 useResponsiveLimits для динамічних лімітів
		const { limits, limit: currentLimit } = useDynamicLimits({
			breakpoints: [
				{ min: 0, cols: 2 },
				{ min: 940, cols: 3 },
				{ min: 1230, cols: 4 },
				{ min: 1530, cols: 5 },
				{ min: 1840, cols: 6 }
			],
			rows: [4, 5, 6]
		})

		// 🔹 Завантаження продуктів зі стору
		useEffect(() => {
			productStore.fetchProducts({
				lang: locale,
				categoryId: categoryId || 'all',
				subCategoryId: subCategoryId || 'all',
				sort,
				page: Number(page),
				limit: Number(limit),
				discountOnly: isDiscountMode ?? false // 👈 ось
			})
		}, [locale, sort, limit, page, categoryId, subCategoryId, isDiscountMode])

		return (
			<div className='flex flex-col justify-between'>
				{isShowSotr && (
					<div className='py-6 flex items-center justify-end gap-x-6 relative'>
						<Sort<ProductSort>
							locale={locale}
							options={productSortOptions}
							onChange={val => setQuery({ sort: val, page: '1' })}
						/>

						<QuantityProduct
							locale={locale}
							limits={limits}
							value={Number(limit) as ProductLimit}
							onChangeQuantityValue={
								val => setQuery({ limit: String(val), page: '1' }) // 🔹 число -> рядок
							}
						/>
					</div>
				)}

				{isLoading ? (
					<div className='h-[100px]'>
						<Spinner />
					</div>
				) : (
					<div className='mb-7 grid max-[939px]:grid-cols-2 min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-4 lg:gap-6'>
						{products.map(item => (
							<ProductCard key={item._id} locale={locale} product={item} />
						))}
					</div>
				)}

				{typeSection === 'home' && (
					<div className='hidden'>
						<Pagination
							numberOfItems={total}
							itemsPerPage={Number(limit)}
							currentPage={Number(page)}
							onPageChange={val => setQuery({ page: String(val) })}
						/>
					</div>
				)}
				{typeSection !== 'home' && (
					<div className='mb-7'>
						<Pagination
							numberOfItems={total}
							itemsPerPage={Number(limit)}
							currentPage={Number(page)}
							onPageChange={val => setQuery({ page: String(val) })}
						/>
					</div>
				)}
			</div>
		)
	}
)

export default ProductComponentSortAndFilters
