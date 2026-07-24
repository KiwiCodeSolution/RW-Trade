'use client'

import { useDynamicLimits } from '@/hooks/useDynamicLimits'
import { useListQuery } from '@/hooks/useListQuery'

import { ProductLimit } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import QuantityProduct from '../userUI/QuantityProduct'

import ProductWrapper from './ProductWrapper'
import { ProductSort, productSortOptions } from '@/lib/sortOptions'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const ProductComponentSortFilterAdmin = observer(
	({
		categorySlug,
		subCategorySlug,
		isShowSort = true,
		categoryId
	}: {
		categorySlug?: string
		subCategorySlug?: string
		isShowSort?: boolean
		categoryId?: string
	}) => {
		const { isLoading, adminProducts, totalAdmin } = productStore
		const locale = 'uk'

		// Динамічні ліміти для grid
		const { limits, limit: currentLimit } = useDynamicLimits({
			breakpoints: [
				{ min: 0, cols: 2 },
				{ min: 940, cols: 4 },
				{ min: 1230, cols: 5 },
				{ min: 1530, cols: 6 },
				{ min: 1840, cols: 8 }
			],
			rows: [2, 3, 4]
		})

		// обираємо стартовий limit залежно від currentLimit
		const { query, setQuery } = useListQuery({
			page: '1',
			limit: String(currentLimit), // динамічний стартовий ліміт
			sort: 'DATE_ADDED' as ProductSort
		})

		const { page, limit, sort } = query

		// Для рендеру grid (віднімемо 1 картку під Sort)

		const userLimit = limits.includes(Number(limit)) ? Number(limit) : limits[0]

		// чи рендериться картка фільтрів
		const hasFiltersCard = currentLimit > 6 // lg+

		const gridLimit = hasFiltersCard ? userLimit - 1 : userLimit
		const fetchLimit = gridLimit

		// реально фетчимо стільки, скільки вибрав користувач
		// 🔹 Завантаження продуктів
		useEffect(() => {
			productStore.fetchAdminProducts({
				lang: 'uk',
				categorySlug: categorySlug || 'all',
				subCategorySlug: subCategorySlug || 'all',
				sort,
				page: Number(page),
				limit: fetchLimit
			})
		}, [sort, page, query.limit, categorySlug, subCategorySlug, fetchLimit])

		return (
			<div className='flex flex-col justify-between'>
				{isShowSort && (
					<div className='py-6 flex items-center justify-end gap-x-2 lg:gap-x-6 relative'>
						<Sort<ProductSort>
							locale={locale}
							options={productSortOptions}
							onChange={val => setQuery({ sort: val, page: '1' })}
						/>
						<div className='hidden lg:block'>
							<QuantityProduct
								locale={locale}
								limits={limits}
								value={userLimit as ProductLimit}
								onChangeQuantityValue={val =>
									setQuery({ limit: String(val), page: '1' })
								}
							/>
						</div>
					</div>
				)}
				{isLoading ? (
					<div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-6 mb-5'>
						{Array.from({ length: fetchLimit }).map((_, i) => (
							<div
								key={i}
								className='h-[317px] w-full min-w-[162px] max-w-[162px] bg-gray-200 animate-pulse rounded-md'
							/>
						))}
					</div>
				) : (
					<ProductWrapper
						categoryId={categoryId}
						products={adminProducts.slice(0, gridLimit)}
					/>
				)}

				<Pagination
					numberOfItems={totalAdmin}
					itemsPerPage={fetchLimit}
					currentPage={Number(page)}
					onPageChange={val => setQuery({ page: String(val) })}
				/>
			</div>
		)
	}
)
export default ProductComponentSortFilterAdmin
