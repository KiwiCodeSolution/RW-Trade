'use client'

import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BtnSolid from '../commonUI/BtnSolid'

import CardRow from './CardRow'
import SubCategoryControl from './SubCategoryControl'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const DiscountsSection = observer(
	({ title, btn, locale }: { title: string; btn: string; locale: Locale }) => {
		const { discountSubcategories, discountProducts } = productStore

		// 🔹 ТІЛЬКИ SLUG
		const [activeSubcategorySlug, setActiveSubcategorySlug] = useState<string>('all')

		const [mounted, setMounted] = useState(false)

		useEffect(() => {
			setMounted(true)
		}, [])

		useEffect(() => {
			if (discountProducts.length === 0) {
				productStore.fetchDiscountProducts()
			}
		}, [discountProducts.length])

		// 🔹 SLUG-BASED FILTER
		const subcategorySlugToIdMap = useMemo(() => {
			const map = new Map<string, string>()

			discountSubcategories.forEach(sc => {
				if (sc.subCategorySlug && sc._id) {
					map.set(sc.subCategorySlug, sc._id)
				}
			})

			return map
		}, [discountSubcategories])

		const activeSubcategoryId =
			activeSubcategorySlug === 'all'
				? null
				: subcategorySlugToIdMap.get(activeSubcategorySlug)

		const filteredProducts = useMemo(() => {
			if (!activeSubcategoryId) return discountProducts
			return discountProducts.filter(p => p.subCategoryId === activeSubcategoryId)
		}, [discountProducts, activeSubcategoryId])

		const filteredProductsMob = useMemo(() => {
			if (filteredProducts.length <= 4) return filteredProducts
			return filteredProducts.slice(0, 4)
		}, [filteredProducts])

		if (!mounted) return null

		return (
			<BaseSection className='py-9'>
				<Title tag='h2' styles='mb-7'>
					{title}
				</Title>

				<SubCategoryControl
					subcategories={discountSubcategories}
					locale={locale}
					activeSlug={activeSubcategorySlug}
					onChange={setActiveSubcategorySlug}
				/>

				{(discountSubcategories?.length ?? 0) === 0 ? (
					<p className='text-center my-20'>
						{locale === 'en'
							? 'No products with discounts available.'
							: 'Немає товарів з знижками.'}
					</p>
				) : (
					<div className='mt-3'>
						<div className='lg:hidden'>
							<CardRow
								products={filteredProductsMob}
								locale={locale}
								section='discounts'
							/>
						</div>
						<div className='hidden lg:block'>
							<CardRow
								products={filteredProducts}
								locale={locale}
								section='discounts'
							/>
						</div>

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
