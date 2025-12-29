'use client'

import { Subcategory } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CategoryControl from '../userUI/CategoryControl'
import SubCategoryControl from '../userUI/SubCategoryControl'

import ProductComponentSortFilterAdmin from './ProductComponentSortFilterAdmin'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
	locale: 'uk' | 'en'
}

const CategoriesAdminContainer: React.FC<Props> = observer(({ locale }) => {
	const { categories } = categoryStore
	const searchParams = useSearchParams()

	/* ---------------- URL params ---------------- */
	const categorySlug = searchParams.get('category') ?? 'all'
	const subCategorySlug = searchParams.get('subCategory') ?? 'all'

	/* ---------------- Active category (derived) ---------------- */
	const activeCategory = useMemo(() => {
		// 1️⃣ якщо категорія явно в URL
		if (categorySlug !== 'all') {
			return categories.find(c => c.slug === categorySlug)
		}

		// 2️⃣ якщо категорії нема, але є підкатегорія
		if (subCategorySlug !== 'all') {
			return categories.find(c =>
				c.subcategories?.some(sc => sc.subCategorySlug === subCategorySlug)
			)
		}

		return undefined
	}, [categorySlug, subCategorySlug, categories])

	/* ---------------- Subcategories to display ---------------- */
	const displayedSubcategories: Subcategory[] = useMemo(() => {
		if (activeCategory) {
			return activeCategory.subcategories ?? []
		}

		return categories.flatMap(c => c.subcategories ?? [])
	}, [activeCategory, categories])

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
				categoryId={activeCategory?._id}
			/>
		</section>
	)
})

export default CategoriesAdminContainer

// CategoriesAdminContainer
