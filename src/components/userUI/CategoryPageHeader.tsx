'use client'

import { Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'
import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Path from './baseComponents/Path'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const CategoryPageHeader = observer(({ slug, locale }: { slug: string; locale: Locale }) => {
	const { categories } = categoryStore
	const searchParams = useSearchParams()

	/* ---------------- URL params ---------------- */
	const subCategorySlug = searchParams.get('subCategory') ?? 'all'

	/* ---------------- Active category ---------------- */
	const category = useMemo(() => categories.find(cat => cat.slug === slug), [categories, slug])

	const subcategories = useMemo(() => category?.subcategories ?? [], [category])

	const isDiscountsCategory = category?.slug === 'discounts'

	const secondName = locale === 'uk' ? 'каталог' : 'catalog'
	const categoryName = locale === 'uk' ? (category?.title.uk ?? '') : (category?.title.en ?? '')

	const sorryTitle = locale === 'uk' ? 'Підкатегорії відсутні' : 'No subcategories available'

	return (
		<>
			<BaseSection>
				<Path secondName={secondName} thirdName={categoryName} locale={locale} />
			</BaseSection>

			<BaseSection>
				<Title tag='h1' isPageTitle styles='text-center mb-5'>
					{categoryName}
				</Title>
			</BaseSection>

			<BaseSection className='py-2'>
				{subcategories.length > 0 ? (
					<SubCategoryControl
						subcategories={subcategories}
						activeSlug={subCategorySlug}
						locale={locale}
						useUrlSync
					/>
				) : (
					<Title tag='h2'>{sorryTitle}</Title>
				)}
			</BaseSection>

			<BaseSection>
				<ProductComponentSortAndFilters
					locale={locale}
					categorySlug={isDiscountsCategory ? undefined : category?.slug}
					subCategorySlug={subCategorySlug !== 'all' ? subCategorySlug : undefined}
					isDiscountMode={isDiscountsCategory}
				/>
			</BaseSection>
		</>
	)
})

export default CategoryPageHeader
