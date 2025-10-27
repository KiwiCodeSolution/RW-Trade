'use client'

import { Category, Locale, Product } from '@/types/baseTypes'

import Pagination from '../commonUI/Pagination'

import CategoryControl from './CategoryControl'
import NumberOfProducts from './NumberOfProducts'
import ProductCard from './ProductCard'
import SubCategoryControl from './SubCategoryControl'

import { useState } from 'react'

interface CategoryControlProps {
	categories: { category: string; uk: string; en: string }[]
	setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>
}

interface SubCategory {
	category: string
	uk: string[]
	en: string[]
}

// interface Product {
// 	id: string
// 	name: string
// 	price: number
// 	image?: string
// 	[key: string]: any
// }

interface Props {
	locale: Locale
}

const AllItemsSection: React.FC<Props> = ({ locale }: Props) => {
	const [category, setCategory] = useState<Category | undefined>(undefined)
	const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null)
	const [subCategory, setSubCategory] = useState<string>('any')
	const [numberOfItems, setNumberOfItems] = useState<string>('10')
	const [products, setProducts] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)

	const title: Record<Locale, string> = {
		uk: 'Всі товари на сайті',
		en: 'All products on the site'
	}

	// useEffect(() => {
	// 	console.log('first useEffect')
	// 	const selected = subCategories.find(item => category && item.category === category.id)
	// 	setSelectedCategory(selected || null)
	// 	setSubCategory('any')
	// }, [category])

	return (
		<section>
			<h2 className='font-bold text-[40px] mb-7'>{title[locale]}</h2>

			<div className='mb-7'>
				<CategoryControl setCategory={setCategory} />
			</div>

			{!!selectedCategory && (
				<div className='mb-7'>
					<SubCategoryControl
						category={selectedCategory}
						setSubCategory={setSubCategory}
					/>
				</div>
			)}

			<div className='mb-7 flex justify-end'>
				<NumberOfProducts setNumber={setNumberOfItems} initialNumber={numberOfItems} />
			</div>

			<div className='mb-7 grid min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6'>
				{products.map((item, index) => (
					<ProductCard key={index} locale={locale} />
				))}
			</div>

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
}

export default AllItemsSection
