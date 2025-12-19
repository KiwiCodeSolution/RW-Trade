'use client'

import { Locale, Subcategory } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CategoryControl from './CategoryControl'
import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'
import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
	locale: Locale
}

const AllItemsSection: React.FC<Props> = observer(({ locale }) => {
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
			return categories.find(c => c.subcategories?.some(sc => sc.slug === subCategorySlug))
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

	const title: Record<Locale, string> = {
		uk: 'Всі товари на сайті',
		en: 'All products on the site'
	}

	return (
		<BaseSection className='py-4 lg:py-9'>
			<Title tag='h2' styles='mb-4 lg:mb-7'>
				{title[locale]}
			</Title>

			{/* -------- Categories -------- */}
			<div className='mb-7'>
				<CategoryControl
					categories={categories}
					activeSlug={activeCategory?.slug ?? 'all'}
					locale={locale}
				/>
			</div>

			{/* -------- Subcategories -------- */}
			{displayedSubcategories.length > 0 && (
				<div className='mb-7'>
					<SubCategoryControl
						subcategories={displayedSubcategories}
						activeSlug={subCategorySlug}
						locale={locale}
					/>
				</div>
			)}

			{/* -------- Products -------- */}
			<ProductComponentSortAndFilters
				locale={locale}
				categorySlug={isDiscountsCategory ? undefined : activeCategory?.slug}
				subCategorySlug={subCategorySlug !== 'all' ? subCategorySlug : undefined}
				isDiscountMode={isDiscountsCategory}
			/>
		</BaseSection>
	)
})

export default AllItemsSection
