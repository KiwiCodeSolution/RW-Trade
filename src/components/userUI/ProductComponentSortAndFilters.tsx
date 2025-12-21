'use client'

import { Filter } from '@/assets/icons'

import { useDynamicLimits } from '@/hooks/useDynamicLimits'
import { useListQuery } from '@/hooks/useListQuery'

import { Locale, ProductLimit } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import Spinner from '../commonUI/loader/Spinner'

import Filters from './Filters'
import ProductCard from './ProductCard'
import QuantityProduct from './QuantityProduct'
import { ProductSort, productSortOptions } from '@/lib/sortOptions'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const ProductComponentSortAndFilters = observer(
	({
		locale,
		categorySlug,
		subCategorySlug,
		isDiscountMode,
		typeSection = 'catalog',
		isShowSort = true
	}: {
		locale: Locale
		categorySlug?: string
		subCategorySlug?: string
		isDiscountMode?: boolean
		typeSection?: 'home' | 'discounts' | 'catalog'
		isShowSort?: boolean
	}) => {
		const [isShowFilters, setIsShowFilters] = useState(false)
		const { products, total, isLoading, allCountries, minPrice, maxPrice } = productStore

		// URL query
		const { query, setQuery } = useListQuery({
			page: '1',
			limit: '18',
			sort: 'DATE_ADDED' as ProductSort,
			countries: '',
			minPrice: '',
			maxPrice: ''
		})
		const { page, limit, sort } = query

		// Динамічні ліміти для grid
		const { limits, limit: currentLimit } = useDynamicLimits({
			breakpoints: [
				{ min: 0, cols: 2 },
				{ min: 940, cols: 3 },
				{ min: 1230, cols: 4 },
				{ min: 1530, cols: 5 },
				{ min: 1840, cols: 6 }
			],
			rows: [3, 4, 5]
		})

		// Для рендеру grid (віднімемо 1 картку під Sort)

		const userLimit = limits.includes(Number(limit)) ? Number(limit) : limits[0]

		// чи рендериться картка фільтрів
		const hasFiltersCard = currentLimit > 6 // lg+

		const gridLimit = hasFiltersCard ? userLimit - 1 : userLimit
		const fetchLimit = gridLimit

		// реально фетчимо стільки, скільки вибрав користувач
		// 🔹 Завантаження продуктів
		useEffect(() => {
			productStore.fetchProducts({
				lang: locale,
				categorySlug: categorySlug || 'all',
				subCategorySlug: subCategorySlug || 'all',
				sort,
				page: Number(page),
				limit: Number(query.limit),
				discountOnly: isDiscountMode ?? false,

				// 👇 тільки якщо користувач реально вибрав
				country: query.countries ? query.countries.split(',') : undefined,

				priceRange:
					query.minPrice && query.maxPrice
						? [Number(query.minPrice), Number(query.maxPrice)]
						: undefined
			})
		}, [
			locale,
			sort,
			page,
			query.limit,
			query.countries,
			query.minPrice,
			query.maxPrice,
			categorySlug,
			subCategorySlug,
			isDiscountMode
		])

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
						<div className='relative lg:hidden w-1/2 shrink-0'>
							<button
								className='w-full h-12 flex items-center justify-center bg-primary rounded-lg p-0.5'
								onClick={() => setIsShowFilters(!isShowFilters)}
							>
								<div className='w-full h-full rounded-lg mx-auto flex items-center justify-center gap-4  bg-bg-light'>
									<Filter />
									<p className='font-medium text-link-blue underline decoration-1 order-2 xl:order-1'>
										{locale === 'uk' ? 'Фільтри' : 'Filters'}
									</p>
								</div>
							</button>
							{isShowFilters && (
								<div className='h-fit w-fit min-w-[278px] max-w-[330px] flex flex-col justify-end items-center absolute z-10 top-12 right-0 bg-other-1 px-2 py-4 rounded-md border-2 border-sc-1'>
									<Filters
										countriesList={allCountries}
										minPriceDefault={minPrice ?? 0}
										maxPriceDefault={maxPrice ?? 0}
										locale={locale}
										fnc={() => setIsShowFilters(false)}
									/>
								</div>
							)}
						</div>
					</div>
				)}
				{isLoading ? (
					<div className='h-[100px]'>
						<Spinner />
					</div>
				) : (
					<div className='mb-7 grid max-[939px]:grid-cols-2 min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-4 lg:gap-6'>
						<div className='hidden lg:h-[505px] w-full min-w-[162px] lg:min-w-[278px] max-w-[330px]  lg:flex flex-col justify-between items-center relative '>
							<Filters
								countriesList={allCountries}
								minPriceDefault={minPrice ?? 0}
								maxPriceDefault={maxPrice ?? 0}
								locale={locale}
							/>
						</div>

						{products.slice(0, gridLimit).map(item => (
							<ProductCard key={item._id} locale={locale} product={item} />
						))}
					</div>
				)}
				{typeSection !== 'home' && (
					<Pagination
						numberOfItems={total}
						itemsPerPage={fetchLimit}
						currentPage={Number(page)}
						onPageChange={val => setQuery({ page: String(val) })}
					/>
				)}
				<div className='lg:hidden mx-auto mt-8 mb-4'>
					<QuantityProduct
						locale={locale}
						limits={limits}
						value={userLimit as ProductLimit}
						onChangeQuantityValue={val => setQuery({ limit: String(val), page: '1' })}
					/>
				</div>
			</div>
		)
	}
)
export default ProductComponentSortAndFilters
