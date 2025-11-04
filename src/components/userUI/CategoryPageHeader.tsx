'use client'

import { Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'
import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Path from './baseComponents/Path'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const CategoryPageHeader = observer(({ slug, locale }: { slug: string; locale: Locale }) => {
	const { categories } = categoryStore
	const [subCategoryID, setSubCategoryID] = useState<string>('any')

	const category = categories.find(cat => cat.slug === slug)

	const subcategories = useMemo(() => category?.subcategories ?? [], [category])

	const secondName = locale === 'uk' ? 'каталог' : 'catalog'
	const categoryName = locale === 'uk' ? (category?.title.uk ?? '') : (category?.title.en ?? '')

	useEffect(() => {
		if (!category || subcategories.length === 0) return
		const currentSubCategory = subcategories.find(sub => sub._id === subCategoryID)
		if (!currentSubCategory) setSubCategoryID('any')
	}, [slug, category, subCategoryID, subcategories])

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
			<BaseSection>
				{category?.subcategories && subcategories.length > 0 ? (
					<SubCategoryControl
						subcategories={subcategories}
						locale={locale}
						setSubCategory={setSubCategoryID}
					/>
				) : (
					<Title tag='h2'>{sorryTitle}</Title>
				)}
			</BaseSection>
			<BaseSection>
				<ProductComponentSortAndFilters locale={locale} />
			</BaseSection>
		</>
	)
})

export default CategoryPageHeader
