'use client'

import { Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import BtnSolid from '../commonUI/BtnSolid'

import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const DiscountsSection = observer(
	({ title, btn, locale }: { title: string; btn: string; locale: Locale }) => {
		const { categories } = categoryStore

		const category = categories.find(cat => cat.title['en'] === 'Discounts')

		if (!category) return null

		const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('any')
		const [mounted, setMounted] = useState(false)

		// eslint-disable-next-line react-hooks/exhaustive-deps, react/no-unstable-nested-components
		useEffect(() => {
			setMounted(true)
		}, [])

		if (!mounted) return null

		return (
			<BaseSection className='py-9'>
				<Title tag='h2' styles='mb-7'>
					{title}
				</Title>

				<SubCategoryControl
					setSubCategory={setSelectedSubcategoryId}
					subcategories={category.subcategories!}
					locale={locale}
				/>

				{/* <CardRow category={selectedCategory} locale={locale} section='discounts' /> */}
				<div className='mt-9 flex justify-center items-center'>
					<BtnSolid variant='bronze' size='m' as='link' href='/catalog/discount'>
						{btn}
					</BtnSolid>
				</div>
			</BaseSection>
		)
	}
)

export default DiscountsSection
