'use client'

import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BtnSolid from '../commonUI/BtnSolid'

import CardRow from './CardRow'
import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const DiscountsSection = observer(
	({ title, btn, locale }: { title: string; btn: string; locale: Locale }) => {
		const { discountSubcategories = [], discountProducts = [] } = productStore

		const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('all')
		const [mounted, setMounted] = useState(false)

		useEffect(() => {
			setMounted(true)
		}, [])

		useEffect(() => {
			if (productStore.discountProducts.length === 0) {
				productStore.fetchDiscountProducts()
			}
		}, [])

		if (!mounted) return null

		const filteredProducts =
			selectedSubcategoryId === 'all'
				? discountProducts
				: discountProducts.filter(p => p.subCategoryId === selectedSubcategoryId)

		return (
			<BaseSection className='py-9'>
				<Title tag='h2' styles='mb-7'>
					{title}
				</Title>

				<SubCategoryControl
					setSubCategory={setSelectedSubcategoryId}
					subcategories={discountSubcategories!}
					locale={locale}
				/>
				{(discountSubcategories?.length ?? 0) === 0 ? (
					<p className='text-center my-20'>No products with discounts available.</p>
				) : (
					<div className='mt-3'>
						<CardRow products={filteredProducts} locale={locale} section='discounts' />
						<div className='mt-9 flex justify-center items-center'>
							<BtnSolid variant='bronze' size='m' as='link' href='/catalog/discounts'>
								{btn}
							</BtnSolid>
						</div>
					</div>
				)}
			</BaseSection>
		)
	}
)

export default DiscountsSection
