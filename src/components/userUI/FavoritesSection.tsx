'use client'

import { Locale, Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BtnGost from '../commonUI/BtnGost'
import Spinner from '../commonUI/loader/Spinner'

import ProductCard from './ProductCard'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const FavoritesSection = observer(({ locale }: { locale: Locale }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const favoriteProducts: Product[] = productStore.favoriteProducts

	const text = locale === 'uk' ? 'Немає улюблених товарів' : 'No favorite products'
	const textLink = locale === 'uk' ? 'Повернутись до каталогу' : 'Go to catalog page'

	const pageTitle = locale === 'uk' ? 'Улюблені товари' : 'Favorite products'

	if (!mounted) {
		return (
			<BaseSection>
				<div className='my-10'>
					<Spinner />
				</div>
			</BaseSection>
		)
	}

	if (!favoriteProducts.length) {
		return (
			<BaseSection>
				<p className='text-center text-2xl font-bold my-10'>{text}</p>

				<BtnGost className='mx-auto my-10 w-fit px-4' as='link' href='/catalog'>
					{textLink}
				</BtnGost>
			</BaseSection>
		)
	}

	return (
		<>
			<BaseSection>
				<Title tag='h1' isPageTitle styles='text-center mb-5'>
					{pageTitle}
				</Title>
			</BaseSection>
			<BaseSection>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
					{favoriteProducts.map(product => (
						<ProductCard
							key={product._id}
							locale={locale}
							type='our'
							product={product}
						/>
					))}
				</div>
			</BaseSection>
		</>
	)
})

export default FavoritesSection
