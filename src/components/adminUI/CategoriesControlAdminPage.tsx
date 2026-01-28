'use client'

import { useDynamicLimits } from '@/hooks/useDynamicLimits'
import { useListQuery } from '@/hooks/useListQuery'

import { ItemsSort } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'
import { productStore } from '@/store/ProductsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import Spinner from '../commonUI/loader/Spinner'
import QuantityProduct from '../userUI/QuantityProduct'
import ScrollableTrack from '../userUI/ScrollableTrack'
import SubCategoryControl from '../userUI/SubCategoryControl'

import ProductWrapper from './ProductWrapper'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const CategoriesControlAdminPage = observer(() => {
	const { categories } = categoryStore
	const { adminProducts, totalAdmin } = productStore

	/** 🔹 UI state */
	const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
		categories[0]?.slug ?? 'all'
	)
	const [activeSubCategorySlug, setActiveSubCategorySlug] = useState<string>('all')
	const [mounted, setMounted] = useState(false)
	const [sort, setSort] = useState<ItemsSort>('DATE_ADDED')

	/** 🔹 URL query */
	const { query, setQuery } = useListQuery({
		page: '1',
		limit: '16',
		sort: 'DATE_ADDED'
	})
	const { page, limit } = query

	/** 🔹 Динамічні ліміти для grid */
	const { limits, limit: currentLimit } = useDynamicLimits({
		breakpoints: [
			{ min: 0, cols: 2 },
			{ min: 768, cols: 4 },
			{ min: 1024, cols: 5 },
			{ min: 1280, cols: 6 },
			{ min: 1536, cols: 8 }
		],
		rows: [2, 3, 4]
	})

	/** 🔹 Первинне монтування */
	useEffect(() => setMounted(true), [])

	/** 🔹 Фетч категорій лише один раз */
	useEffect(() => {
		if (categories.length === 0) categoryStore.fetchCategories({ pageType: 'admin' })
	}, [categories.length])

	/** 🔹 Активна категорія */
	const activeCategory = useMemo(
		() => categories.find(c => c.slug === activeCategorySlug),
		[categories, activeCategorySlug]
	)

	/** 🔹 Підкатегорії */
	const currentSubcategories = activeCategory?.subcategories ?? []

	/** 🔹 Фетч продуктів */
	useEffect(() => {
		productStore.fetchAdminProducts({
			lang: 'uk',
			categorySlug: activeCategorySlug === 'all' ? undefined : activeCategorySlug,
			subCategorySlug: activeSubCategorySlug === 'all' ? undefined : activeSubCategorySlug,
			sort,
			limit: Number(limit),
			page: Number(page)
		})
	}, [activeCategorySlug, activeSubCategorySlug, sort, page, limit])

	if (!mounted) return <Spinner />

	/** 🔹 Розрахунок grid для рендеру */
	const userLimit = limits.includes(Number(limit)) ? Number(limit) : limits[0]
	const hasFiltersCard = currentLimit > 6
	const gridLimit = hasFiltersCard ? userLimit - 1 : userLimit

	return (
		<section className='py-3'>
			<div className='mb-3 flex justify-between items-center'>
				<h2 className='text-xl font-semibold'>Керування категоріями</h2>
			</div>

			{/* 🔹 КАТЕГОРІЇ */}
			<ScrollableTrack thumbWidth={80} sectionType='admin'>
				{categories
					.filter(cat => cat.title.en !== 'Discounts')
					.map(item => (
						<button
							type='button'
							key={item._id}
							onClick={() => {
								setActiveCategorySlug(item.slug)
								setActiveSubCategorySlug('all')
							}}
							className={`flex flex-col p-2 bg-bg-light min-w-[160px] max-w-[160px] rounded-lg cursor-pointer hover:opacity-90 duration-200 group ${
								item.slug === activeCategorySlug
									? 'border border-gr-10 bg-primary'
									: 'border border-bg-light'
							}`}
						>
							<div className='flex flex-col items-center'>
								<div className='min-h-16 flex justify-center items-center'>
									<h3
										className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent ${
											item.slug === activeCategorySlug
												? 'bg-white'
												: 'bg-primary'
										}`}
									>
										{item.title.uk}
									</h3>
								</div>
							</div>
						</button>
					))}
			</ScrollableTrack>

			{/* 🔹 ПІДКАТЕГОРІЇ */}
			{currentSubcategories.length > 0 && (
				<SubCategoryControl
					subcategories={currentSubcategories}
					activeSlug={activeSubCategorySlug}
					onChange={setActiveSubCategorySlug}
					locale='uk'
				/>
			)}

			{/* 🔹 SORT + LIMIT */}
			<div className='py-2 flex items-center justify-end gap-x-6 relative'>
				<Sort
					locale='uk'
					options={[
						{ value: 'DATE_ADDED', label: { uk: 'За датою додавання', en: 'By date' } },
						{ value: 'PRICE_ASC', label: { uk: 'Ціна ↑', en: 'Price ↑' } },
						{ value: 'PRICE_DESC', label: { uk: 'Ціна ↓', en: 'Price ↓' } }
					]}
					onChange={val => {
						setSort(val)
						setQuery({ sort: val, page: '1' })
					}}
				/>
				<div className='hidden lg:block'>
					<QuantityProduct
						locale='uk'
						limits={limits}
						value={Number(limit)}
						onChangeQuantityValue={val => setQuery({ limit: String(val), page: '1' })}
					/>
				</div>
			</div>

			{/* 🔹 ТОВАРИ */}
			<ProductWrapper
				categoryId={activeCategory?._id ?? ''}
				products={adminProducts.slice(0, gridLimit)}
			/>

			{/* 🔹 ПАГІНАЦІЯ */}
			<div className='mb-4'>
				<Pagination
					numberOfItems={totalAdmin}
					itemsPerPage={Number(limit)}
					currentPage={Number(page)}
					onPageChange={val => setQuery({ page: String(val) })}
				/>
			</div>
		</section>
	)
})

export default CategoriesControlAdminPage
