'use client'

import { useCurrentLocale } from '@/hooks/useCurrentLocale'

import { Category, Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import Spinner from '../commonUI/loader/Spinner'

import ExtraCategories from './ExtraCategories'
import SubcategoriesCardList from './SubcategoriesCardList'
import { Link } from '@/i18n/navigation'

import { useEffect, useState } from 'react'

interface CategoryCardProps {
	category?: Category
	locale: Locale
}

const CategoryCard = ({ category, locale }: CategoryCardProps) => {
	const currentLocale = useCurrentLocale()
	const { categories } = categoryStore

	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps, react/no-unstable-nested-components
	useEffect(() => {
		setMounted(true)
	}, [])

	const subcategories = category?.subcategories ?? []

	const categoryHref =
		categories.find(item => item.title[currentLocale] === category?.title[currentLocale])
			?.slug ?? 'catalog'

	return (
		<div className='h-[505px] w-full min-w-[278px] max-w-[360px] rounded-md border-2 border-sc-1 p-3 flex flex-col justify-between'>
			{mounted ? (
				<>
					<div>
						<h3 className='gradient-text font-semibold text-[28px] mb-4'>
							{category && category.title[currentLocale]}
						</h3>
						<div className='w-full h-1 bg-primary rounded-full mb-4'></div>
						<SubcategoriesCardList
							subcategories={subcategories}
							currentLocale={currentLocale}
						/>
					</div>
					<div className='mb-3'>
						<Link
							href={`/catalog/${categoryHref}`}
							className='gradient-text text-center font-semibold'
						>
							{subcategories.length > 7 ? (
								<ExtraCategories count={subcategories.length - 7} />
							) : (
								<span>
									{locale === 'en'
										? 'Go to section --->'
										: 'Перейти у розділ --->'}
								</span>
							)}
						</Link>
					</div>
				</>
			) : (
				<div className='flex justify-center items-center h-full'>
					<Spinner />
				</div>
			)}
		</div>
	)
}

export default CategoryCard
