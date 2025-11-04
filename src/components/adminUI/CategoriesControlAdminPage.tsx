'use client'

import { ProductLimit, ProductSort } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'
import { productStore } from '@/store/ProductsStore'

import { generateProductsArray } from '@/data/mokProducts'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import QuantityProduct from '../userUI/QuantityProduct'
import ScrollableTrack from '../userUI/ScrollableTrack'
import SubCategoryControl from '../userUI/SubCategoryControl'

import ProductWrapper from './ProductWrapper'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'

const CategoriesControlAdminPage = observer(() => {
	const { data: session } = useSession()
	const token = session?.user?.accessToken

	const { categories } = categoryStore
	const { products, total, isLoading } = productStore

	const [category, setCategory] = useState<string | null>(null)
	const [subCategory, setSubCategory] = useState<string>('all')
	const [mounted, setMounted] = useState(false)
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(16)
	const [availableLimits, setAvailableLimits] = useState<number[]>([20, 40, 60])
	const [sort, setSort] = useState<ProductSort>('DATE_ADDED')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (categories.length > 0 && !category) {
			setCategory(categories[0]._id ?? null)
			categoryStore.setCurrentCreateCategory(categories[0])
		}
	}, [categories, category])

	// монтування
	useEffect(() => setMounted(true), [])

	// фетч категорій
	useEffect(() => {
		if (categories.length === 0) categoryStore.fetchCategories()
	}, [categories.length])

	// фетч продуктів
	useEffect(() => {
		productStore.fetchProducts({
			lang: 'uk',
			categoryId: category || 'all',
			subCategoryId: subCategory,
			sort,
			limit,
			page
		})
	}, [category, subCategory, sort, limit, page])

	// при зміні категорії — скидаємо підкатегорію
	useEffect(() => setSubCategory('all'), [category])

	const currentSubcategories = useMemo(() => {
		if (!category) return []
		const cat = categories.find(c => c._id === category)
		return cat?.subcategories ?? []
	}, [category, categories])

	const handleCategory = (id: string) => {
		if (!id) return
		setCategory(id)
		const cat = categories.find(c => c._id === id)
		if (cat) categoryStore.setCurrentCreateCategory(cat)
	}

	// 🧩 Генерація тестових продуктів
	const handleGenerateProducts = async () => {
		if (!token) return alert('Немає токена користувача!')
		if (categories.length === 0) return alert('Категорії ще не завантажені.')

		setLoading(true)
		const fakeProducts = generateProductsArray(categories, 50)

		for (const product of fakeProducts) {
			await productStore.createProduct({
				product,
				token,
				files: []
			})
		}
		setLoading(false)
		alert('✅ 50 тестових продуктів створено!')
	}

	if (!mounted) return <div className='p-4 text-gray-400'>Завантаження...</div>

	return (
		<>
			<section className='py-3'>
				<div className='mb-3 flex justify-between items-center'>
					<h2 className='text-xl font-semibold'>Керування категоріями</h2>
					<button
						type='button'
						onClick={handleGenerateProducts}
						disabled={loading}
						className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60'
					>
						{loading ? 'Генерація...' : 'Згенерувати 50 тестових продуктів'}
					</button>
				</div>

				{/* категорії */}
				<ScrollableTrack thumbWidth={80} sectionType='admin'>
					{categories
						.filter(cat => cat.title.en !== 'Discounts')
						.map(item => (
							<button
								key={item._id}
								onClick={() => item._id && handleCategory(item._id)}
								className={`flex flex-col p-2 bg-bg-light min-w-[160px] max-w-[160px] rounded-lg cursor-pointer hover:opacity-90 duration-200 group ${
									item._id === category
										? 'border border-gr-10 bg-primary'
										: 'border border-bg-light'
								}`}
							>
								<div className='flex flex-col items-center'>
									<div className='min-h-16 flex justify-center items-center'>
										<h3
											className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent group-hover:text-gr-4 ${
												item._id === category ? 'bg-white ' : 'bg-primary'
											}`}
										>
											{item.title.uk}
										</h3>
									</div>
								</div>
							</button>
						))}
				</ScrollableTrack>

				{/* підкатегорії */}
				{currentSubcategories.length > 0 && (
					<SubCategoryControl
						subcategories={currentSubcategories}
						setSubCategory={setSubCategory}
						locale='uk'
					/>
				)}

				<div className='py-2 flex items-center justify-end gap-x-6 relative'>
					<Sort onChangeSortValue={setSort} locale={'uk'} />
					<QuantityProduct
						locale={'uk'}
						limits={availableLimits}
						value={limit as ProductLimit}
						onChangeQuantityValue={setLimit}
					/>
				</div>
				{/* товари */}
				<ProductWrapper categoryId={category || 'all'} products={products} />

				<div className='mb-4'>
					<Pagination
						numberOfItems={total}
						itemsPerPage={limit}
						currentPage={page}
						onPageChange={setPage}
					/>
				</div>
			</section>
		</>
	)
})

export default CategoriesControlAdminPage
