'use client'

import { ItemsSort, Locale, ProductLimit } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'

import ProductCard from './ProductCard'
import QuantityProduct from './QuantityProduct'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const ProductComponentSortAndFilters = observer(
	({
		locale,
		categoryId,
		subCategoryId,
		isDiscountMode
	}: {
		locale: Locale
		categoryId?: string
		subCategoryId?: string
		isDiscountMode?: boolean
	}) => {
		const { products, total, isLoading } = productStore

		const [page, setPage] = useState(1)
		const [sort, setSort] = useState<ItemsSort>('DATE_ADDED')
		const [limit, setLimit] = useState<number>(16)
		const [availableLimits, setAvailableLimits] = useState<number[]>([16, 24, 32])

		// 🔹 Обчислення лімітів динамічно
		useEffect(() => {
			const calculateLimits = () => {
				const width = window.innerWidth
				let cols = 3

				if (width >= 940 && width < 1230) cols = 3
				else if (width >= 1230 && width < 1530) cols = 4
				else if (width >= 1530 && width < 1840) cols = 5
				else if (width >= 1840) cols = 6

				const newLimits = [cols * 3, cols * 4, cols * 5]
				setAvailableLimits(newLimits)
				setLimit(newLimits[0])
			}

			calculateLimits()
			window.addEventListener('resize', calculateLimits)
			return () => window.removeEventListener('resize', calculateLimits)
		}, [])

		// 🔹 Завантаження продуктів зі стору
		useEffect(() => {
			productStore.fetchProducts({
				lang: locale,
				categoryId: categoryId || 'all',
				subCategoryId: subCategoryId || 'all',
				sort,
				limit,
				page,
				discountOnly: isDiscountMode ?? false // 👈 ось
			})
		}, [locale, sort, limit, page, categoryId, subCategoryId, isDiscountMode])

		return (
			<div className='flex flex-col justify-between'>
				<div className='py-6 flex items-center justify-end gap-x-6 relative'>
					<Sort onChangeSortValue={setSort} locale={locale} pageType='product' />
					<QuantityProduct
						locale={locale}
						limits={availableLimits}
						value={limit as ProductLimit}
						onChangeQuantityValue={setLimit}
					/>
				</div>

				{isLoading ? (
					<p className='text-center text-gray-500'>Завантаження...</p>
				) : (
					<div className='mb-7 grid min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6'>
						{products.map(item => (
							<ProductCard key={item._id} locale={locale} product={item} />
						))}
					</div>
				)}

				<div className='mb-7'>
					<Pagination
						numberOfItems={total}
						itemsPerPage={limit}
						currentPage={page}
						onPageChange={setPage}
					/>
				</div>
			</div>
		)
	}
)

export default ProductComponentSortAndFilters
