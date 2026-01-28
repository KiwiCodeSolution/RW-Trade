import { PopularProductsIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { fetchPublicCategories } from '@/api/api-fetch/categories'
import { fetchPopularProducts } from '@/api/api-fetch/popular-products'

import BtnSolid from '../commonUI/BtnSolid'

import PopularProductsClient from './PopularProductsClient'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { getTranslations } from 'next-intl/server'

const PopularProductsServer = async ({ locale }: { locale: Locale }) => {
	const t = await getTranslations({ locale, namespace: 'HomePage.popular_products' })

	// 1️⃣ сервером отримуємо категорії (кеш!)
	const categories = await fetchPublicCategories()

	// 2️⃣ беремо перші 3
	const categoryIds = categories.slice(0, 3).map((c: typeof categories[0]) => c._id)

	// 3️⃣ сервером отримуємо продукти (кеш!)
	const productsByCategory = await fetchPopularProducts(categoryIds)

	return (
		<BaseSection className='py-9'>
			<Title tag='h2' styles='mb-7'>
				{t('title')}
			</Title>

			{/* 👉 передаємо ВСІ дані в client */}
			<PopularProductsClient
				initialCategories={categories}
				initialProducts={productsByCategory}
				locale={locale}
			/>

			<div className='flex justify-center items-center'>
				<BtnSolid size='m' variant='bronze' as='link' href='/catalog'>
					<PopularProductsIcon />
					<span>{t('btn')}</span>
				</BtnSolid>
			</div>
		</BaseSection>
	)
}

export default PopularProductsServer
