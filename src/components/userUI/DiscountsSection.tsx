'use client'

import { Category, Locale } from '@/types/baseTypes'

import BtnSolid from '../commonUI/BtnSolid'

import CardRow from './CardRow'
import CategoryControl from './CategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { useEffect, useState } from 'react'

const DiscountsSection = ({
	title,
	btn,
	locale
}: {
	title: string
	btn: string
	locale: Locale
}) => {
	const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
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

			<CategoryControl setCategory={setSelectedCategory} />

			<CardRow category={selectedCategory} locale={locale} section='discounts' />
			<div className='mt-9 flex justify-center items-center'>
				<BtnSolid variant='bronze' size='m' as='link' href='/catalog/discount'>
					{btn}
				</BtnSolid>
			</div>
		</BaseSection>
	)
}

export default DiscountsSection
