'use client'

import { Category, Subcategory } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CategoryControl from '../userUI/CategoryControl'
import SubCategoryControl from '../userUI/SubCategoryControl'

import ProductComponentSortFilterAdmin from './ProductComponentSortFilterAdmin'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

interface Props {
	locale: 'uk' | 'en'
	initialCategories: Category[]
}

const CategoriesAdminContainer: React.FC<Props> = observer(({ locale, initialCategories }) => {
	const { categories } = categoryStore

	useEffect(() => {
		categoryStore.setCategories(initialCategories)
	}, [initialCategories])

	const searchParams = useSearchParams()

	/* ---------------- URL params ---------------- */
	const categorySlug = searchParams.get('category') ?? categories[0]?.slug
	const subCategorySlug = searchParams.get('subCategory') ?? 'all'

	// ---------------- Active category (derived) ----------------
	const activeCategory = useMemo(() => {
		// якщо категорія явно в URL
		if (categorySlug) {
			return categories.find(c => c.slug === categorySlug)
		}

		// якщо категорії нема в URL, беремо першу
		return categories[0]
	}, [categorySlug, categories])

	// ---------------- Subcategories to display ----------------
	const displayedSubcategories: Subcategory[] = useMemo(() => {
		if (activeCategory) {
			return activeCategory.subcategories ?? []
		}
		return []
	}, [activeCategory])

	/* ---------------- Discounts mode ---------------- */
	const isDiscountsCategory = activeCategory?.slug === 'discounts'

	return (
		<section className='py-4 lg:py-9'>
			{/* -------- Categories -------- */}
			<div className='mb-7'>
				<CategoryControl
					categories={categories}
					activeSlug={activeCategory?.slug ?? 'all'}
					locale={locale}
					useUrlSync
					pageType='admin'
				/>
			</div>

			{/* -------- Subcategories -------- */}
			{displayedSubcategories.length > 0 && (
				<div className='mb-7'>
					<SubCategoryControl
						subcategories={displayedSubcategories}
						activeSlug={subCategorySlug}
						locale={locale}
						useUrlSync
					/>
				</div>
			)}

			{/* -------- Products -------- */}
			<ProductComponentSortFilterAdmin
				categorySlug={isDiscountsCategory ? undefined : activeCategory?.slug}
				subCategorySlug={subCategorySlug !== 'all' ? subCategorySlug : undefined}
				categoryId={isDiscountsCategory ? undefined : activeCategory?._id}
			/>
		</section>
	)
})

export default CategoriesAdminContainer

// CategoriesAdminContainer
