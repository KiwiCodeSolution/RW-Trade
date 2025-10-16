'use client'

// import { toJS } from 'mobx'
import { Locale } from '@/types/baseTypes'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'

const PopularProductsSectionWithCategory = observer(() => {
	const { categories } = categoryStore
	const locale = useLocale() as Locale
	// console.log(toJS(categories))

	return (
		<div className='grid grid-rows-3 gap-9 mb-9'>
			<CardRow category={categories[0]} section='popular' locale={locale} />
			<CardRow category={categories[1]} section='popular' locale={locale} />
			<CardRow category={categories[2]} section='popular' locale={locale} />
		</div>
	)
})

export default PopularProductsSectionWithCategory
