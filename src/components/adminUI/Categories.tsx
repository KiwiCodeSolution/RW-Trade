'use client'

import { categoryStore } from '@/store/CategoryStore'

import Spinner from '../commonUI/loader/Spinner'
import ScrollableTrack from '../userUI/ScrollableTrack'
import SubCategoryControl from '../userUI/SubCategoryControl'

import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

interface CategoriesProps {
	activeCategorySlug: string
	setActiveCategorySlug: (slug: string) => void
	activeSubCategorySlug: string
	setActiveSubCategorySlug: (slug: string) => void
}

const Categories = observer(
	({
		activeCategorySlug,
		setActiveCategorySlug,
		activeSubCategorySlug,
		setActiveSubCategorySlug
	}: CategoriesProps) => {
		/** 🔹 UI state */
		const [mounted, setMounted] = useState(false)

		/** 🔹 Первинне монтування */
		useEffect(() => setMounted(true), [])

		/** 🔹 Фетч категорій лише один раз */
		useEffect(() => {
			if (categoryStore.categories.length === 0) categoryStore.fetchCategories()
		}, [])

		/** 🔹 Активна категорія */
		const activeCategory = useMemo(
			() => categoryStore.categories.find(c => c.slug === activeCategorySlug),
			[categoryStore.categories, activeCategorySlug]
		)

		/** 🔹 Підкатегорії */
		const currentSubcategories = activeCategory?.subcategories ?? []

		if (!mounted) return <Spinner />

		return (
			<div>
				{/* 🔹 КАТЕГОРІЇ */}
				<ScrollableTrack thumbWidth={80} sectionType='admin'>
					{categoryStore.categories
						.filter(cat => !cat.isSystem)
						.map(item => (
							<button
								key={item._id}
								type='button'
								onClick={() => {
									setActiveCategorySlug(item.slug)
									setActiveSubCategorySlug('all')
								}}
								className={`flex flex-col p-2 bg-bg-light min-w-[160px] max-w-[160px] rounded-lg cursor-pointer hover:opacity-90 duration-200 group ${
									item.slug === activeCategorySlug
										? 'border border-gr-10 bg-primary'
										: 'border border-bg-light'
								}`}
							>
								<div className='flex flex-col items-center'>
									<div className='min-h-16 flex justify-center items-center'>
										<h3
											className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent ${
												item.slug === activeCategorySlug
													? 'bg-white'
													: 'bg-primary'
											}`}
										>
											{item.title.uk}
										</h3>
									</div>
								</div>
							</button>
						))}
				</ScrollableTrack>

				{/* 🔹 ПІДКАТЕГОРІЇ */}
				{currentSubcategories.length > 0 && (
					<SubCategoryControl
						subcategories={currentSubcategories}
						activeSlug={activeSubCategorySlug}
						onChange={setActiveSubCategorySlug}
						locale='uk'
					/>
				)}
			</div>
		)
	}
)

export default Categories
