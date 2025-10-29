'use client'

import { categoryStore } from '@/store/CategoryStore'

import ScrollableTrack from '../userUI/ScrollableTrack'
import SubCategoryControl from '../userUI/SubCategoryControl'

import ProductWrapper from './ProductWrapper'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const CategoriesControlAdminPage = observer(() => {
	const { categories } = categoryStore
	const [category, setCategory] = useState<string | null>(null)
	const [mounted, setMounted] = useState(false)

	// 1️⃣ Монтування (викликається завжди)
	useEffect(() => {
		setMounted(true)
	}, [])

	// 2️⃣ Підвантаження категорій (викликається завжди)
	useEffect(() => {
		if (categories.length === 0) {
			categoryStore.fetchCategories()
			return
		}
		if (!category && categories[0]?._id) {
			const first = categories[0]

			if (first?._id) {
				setCategory(first._id)
				categoryStore.setCurrentCreateCategory(first)
			}
		}
	}, [categories, category])

	// 3️⃣ Обробник кліку
	const handleCategory = (id: string) => {
		if (!id) return
		setCategory(id)
		const cat = categories.find(c => c._id === id)
		if (cat) categoryStore.setCurrentCreateCategory(cat)
	}

	// 4️⃣ Поточні підкатегорії
	const currentSubcategories = useMemo(() => {
		if (!category) return []
		const cat = categories.find(c => c._id === category)
		return cat?.subcategories ?? []
	}, [category, categories])

	// 5️⃣ Тепер умовний рендер — лише тут
	if (!mounted) {
		return <div className='p-4 text-gray-400'>Завантаження...</div>
	}

	return (
		<>
			<section className='py-3'>
				{/* 🔹 перший скролбар з іконками — ті ж самі картки, що в клієнта */}
				<div className='mb-1 relative'>
					<ScrollableTrack thumbWidth={80} sectionType='admin'>
						{categories
							.filter(cat => cat.title.en !== 'Discounts')
							.map(item => (
								<button
									key={item._id}
									onClick={() => item._id && handleCategory(item._id)}
									className={`flex flex-col p-2 bg-bg-light min-w-[160px] max-w-[160px] rounded-lg cursor-pointer hover:opacity-90 duration-200 group ${item._id === category ? 'border border-gr-10 bg-primary' : 'border border-bg-light'}`}
								>
									<div className='flex flex-col items-center'>
										<div className='min-h-16 flex justify-center items-center'>
											<h3
												className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent group-hover:text-gr-4 ${item._id === category ? 'bg-white ' : 'bg-primary'}`}
											>
												{item.title['uk']}
											</h3>
										</div>
									</div>
								</button>
							))}
					</ScrollableTrack>
				</div>

				{/* 🔹 другий скролбар — підкатегорії */}
				{currentSubcategories.length > 0 && (
					<div>
						<SubCategoryControl
							subcategories={currentSubcategories}
							setSubCategory={() => {}}
							locale={'uk'}
						/>
					</div>
				)}
			</section>
			{categories.length > 0 && (
				<ProductWrapper categoryId={category || categories[0]._id!} />
			)}
		</>
	)
})

export default CategoriesControlAdminPage
