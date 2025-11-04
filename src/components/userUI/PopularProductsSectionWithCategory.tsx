'use client'

// import { toJS } from 'mobx'
import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { categoryStore } from '../../store/CategoryStore'

import CardRow from './CardRow'

import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'

const PopularProductsSectionWithCategory = observer(() => {
	console.log('start component PopularProductsSectionWithCategory')
	const { categories } = categoryStore
	const { products } = productStore

	useEffect(() => {
		if (productStore.products.length === 0) {
			productStore.fetchProducts()
		}
	}, [])

	const firstProducts = products.filter(p => p.categoryId === categories[0]?._id).slice(0, 8)
	const secondProducts = products.filter(p => p.categoryId === categories[1]?._id).slice(0, 8)
	const thirdProducts = products.filter(p => p.categoryId === categories[2]?._id).slice(0, 8)
	const locale = useLocale() as Locale
	console.log(toJS(firstProducts))

	return (
		<div className='grid grid-rows-3 gap-9 mb-9'>
			<CardRow
				category={categories[0]}
				section='popular'
				locale={locale}
				products={firstProducts}
			/>
			<CardRow
				category={categories[1]}
				section='popular'
				locale={locale}
				products={secondProducts}
			/>
			<CardRow
				category={categories[2]}
				section='popular'
				locale={locale}
				products={thirdProducts}
			/>
		</div>
	)
})

export default PopularProductsSectionWithCategory
