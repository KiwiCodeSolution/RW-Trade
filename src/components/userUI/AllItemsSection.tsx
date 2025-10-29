'use client'

import { Category, Locale, Product, Subcategory } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import Pagination from '../commonUI/Pagination'

import CategoryControl from './CategoryControl'
import NumberOfProducts from './NumberOfProducts'
import ProductCard from './ProductCard'
import SubCategoryControl from './SubCategoryControl'

import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'

interface Props {
	locale: Locale
}

const AllItemsSection: React.FC<Props> = observer(({ locale }) => {
	const { categories } = categoryStore

	const [category, setCategory] = useState<Category | undefined>(undefined)
	const [subCategory, setSubCategory] = useState<string>('any')
	const [numberOfItems, setNumberOfItems] = useState<string>('10')
	const [products, setProducts] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)

	const title: Record<Locale, string> = {
		uk: 'Всі товари на сайті',
		en: 'All products on the site'
	}

	// 🧩 створюємо масив усіх підкатегорій для випадку "немає вибраної категорії"
	const allSubcategories: Subcategory[] = useMemo(() => {
		return categories.flatMap(cat => cat.subcategories ?? [])
	}, [categories])

	// визначаємо, які підкатегорії показувати
	const displayedSubcategories = category ? (category.subcategories ?? []) : allSubcategories

	console.log('Обрана категорія:', toJS(category))
	console.log('Поточні підкатегорії:', displayedSubcategories)

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

			{/* кількість продуктів */}
			<div className='mb-7 flex justify-end'>
				<NumberOfProducts setNumber={setNumberOfItems} initialNumber={numberOfItems} />
			</div>

			{/* продукти */}
			{/* <div className='mb-7 grid min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6'>
				{products.map((item, index) => (
					<ProductCard key={index} locale={locale} />
				))}
			</div> */}

			{/* пагінація */}
			<div className='mb-7'>
				<Pagination
					numberOfItems={100}
					itemsPerPage={Number(numberOfItems)}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</section>
	)
})

export default AllItemsSection
