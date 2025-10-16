'use client'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'

// import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

const PopularProductsSectionWithCategory = observer(() => {
	const { categories } = categoryStore
	// console.log(toJS(categories))

	return (
		<div className='grid grid-rows-3 gap-9 mb-9'>
			<CardRow category={categories[0]} section='popular' />
			<CardRow category={categories[1]} section='popular' />
			<CardRow category={categories[2]} section='popular' />
		</div>
	)
})

export default PopularProductsSectionWithCategory
