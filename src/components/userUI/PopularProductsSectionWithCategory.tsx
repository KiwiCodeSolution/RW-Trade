'use client'

import { Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CardRow from './CardRow'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'

const PopularProductsSectionWithCategory = observer(() => {
	const locale = useLocale() as Locale
	const { categories } = categoryStore

	return (
		<div className='grid grid-rows-3 gap-9 mb-9'>
			<CardRow category={categories[0]} locale={locale} section='popular' />
			<CardRow category={categories[1]} locale={locale} section='popular' />
			<CardRow category={categories[2]} locale={locale} section='popular' />
		</div>
	)
})

export default PopularProductsSectionWithCategory
