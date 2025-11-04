'use client'

import { Category, Locale, Subcategory } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CategoryControl from './CategoryControl'
import ProductComponentSortAndFilters from './ProductComponentSortAndFilters'
import SubCategoryControl from './SubCategoryControl'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

interface Props {
	locale: Locale
}

const AllItemsSection: React.FC<Props> = observer(({ locale }) => {
	const { categories } = categoryStore

	const [category, setCategory] = useState<Category | undefined>(undefined)
	const [subCategory, setSubCategory] = useState<string>('all')

	const title: Record<Locale, string> = {
		uk: 'Всі товари на сайті',
		en: 'All products on the site'
	}

	// 🧩 при зміні категорії — скидаємо підкатегорію
	useEffect(() => {
		setSubCategory('all')
	}, [category])

	// 🧩 створюємо масив усіх підкатегорій для випадку "немає вибраної категорії"
	const allSubcategories: Subcategory[] = useMemo(() => {
		return categories.flatMap(cat => cat.subcategories ?? [])
	}, [categories])

	// визначаємо, які підкатегорії показувати
	const displayedSubcategories = category ? (category.subcategories ?? []) : allSubcategories

	// 🧩 Перевіряємо, чи це категорія "Discounts"
	const isDiscountsCategory = category?.slug === 'discounts'

	return (
		<section>
			<h2 className='font-bold text-[40px] mb-7'>{title[locale]}</h2>

			{/* категорії */}
			<div className='mb-7'>
				<CategoryControl setCategory={setCategory} categories={categories} />
			</div>

			{/* підкатегорії */}
			{displayedSubcategories.length > 0 && (
				<div className='mb-7'>
					<SubCategoryControl
						subcategories={displayedSubcategories}
						setSubCategory={setSubCategory}
						locale={locale}
					/>
				</div>
			)}

			{/* товари */}
			<ProductComponentSortAndFilters
				locale={locale}
				categoryId={isDiscountsCategory ? undefined : category?._id}
				subCategoryId={subCategory}
				isDiscountMode={isDiscountsCategory} // 👈 це головне
			/>
		</section>
	)
})

export default AllItemsSection
