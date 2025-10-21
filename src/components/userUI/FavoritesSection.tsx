'use client'

import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BtnGost from '../commonUI/BtnGost'

import ProductCard from './ProductCard'
import BaseSection from './baseComponents/BaseSection'

import { observer } from 'mobx-react-lite'

const FavoritesSection = observer(({ locale }: { locale: Locale }) => {
	const { favoriteProducts } = productStore

	const text = locale === 'uk' ? 'Немає улюблених товарів' : 'No favorite products'
	const textLink = locale === 'uk' ? 'Повернутись до каталогу' : 'Go to catalouge page'

	if (!favoriteProducts.length) {
		return (
			<BaseSection>
				<p className='text-center text-2xl font-bold my-10 '>{text}</p>

				<BtnGost className='mx-auto my-10 w-fit px-4' as='link' href='/catalog'>
					{textLink}
				</BtnGost>
			</BaseSection>
		)
	}

	return (
		<BaseSection className=''>
			<div className='grid grid-cols-4 gap-4'>
				{favoriteProducts.map(product => (
					<ProductCard key={product._id} locale={locale} type='our' />
				))}
			</div>
		</BaseSection>
	)
})

export default FavoritesSection
