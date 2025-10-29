'use client'

import { categoryStore } from '@/store/CategoryStore'

import CategoryIcon from '../commonUI/CategoryIcon'
import ScrollableTrack from '../userUI/ScrollableTrack'
import SubCategoryControl from '../userUI/SubCategoryControl'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

const CategoriesControlAdminPage = observer(() => {
	const { categories } = categoryStore
	const [category, setCategory] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (categories.length > 0) return
		categoryStore.fetchCategories()
	}, [])

	// усі підкатегорії поточної категорії
	const currentSubcategories = useMemo(() => {
		if (!category) return []
		const cat = categories.find(c => c._id === category)
		return cat?.subcategories ?? []
	}, [category, categories])

	return (
		<section className='py-9'>
			{/* 🔹 перший скролбар з іконками — ті ж самі картки, що в клієнта */}
			<div className='mb-7 relative'>
				<ScrollableTrack thumbWidth={80}>
					{categories
						.filter(cat => cat.title.en !== 'Discounts')
						.map((item, index) => (
							<button
								key={item._id}
								onClick={() => setCategory(item._id)}
								className={`flex flex-col pt-2 py-8 pb-8 bg-bg-light min-w-[250px] max-w-[250px] rounded-lg cursor-pointer hover:opacity-90 duration-200 ${item._id === category ? 'border border-gr-10 bg-primary' : 'border border-bg-light'}`}
							>
								<div className='flex flex-col items-center'>
									<CategoryIcon
										category={item.title['en']}
										size='m'
										bg={categories.length === index + 1 ? 'bronze' : 'primary'}
										isActive={item._id === category}
									/>

									<div className='min-h-16 flex justify-center items-center'>
										<h3
											className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent ${item._id === category ? 'bg-white ' : 'bg-primary'}`}
										>
											{item.title['uk']}
										</h3>
									</div>
								</div>

								<div
									className={`h-0.5 w-10/12 mb-2 mx-auto  ${item._id === category ? 'bg-white ' : 'bg-primary'}`}
								/>
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
	)
})

export default CategoriesControlAdminPage
