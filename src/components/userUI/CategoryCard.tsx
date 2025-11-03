'use client'

import { useCurrentLocale } from '@/hooks/useCurrentLocale'

import { Category } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import { Link } from '@/i18n/navigation'

import { useEffect, useState } from 'react'

interface CategoryCardProps {
	category?: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
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
						{subcategories.length > 0 && (
							<div className='flex flex-col gap-y-4'>
								{subcategories.slice(0, 7).map((item, index) => (
									<div key={index} className='list-none text-xl leading-[1.4]'>
										{item.title[currentLocale] ?? ''}
									</div>
								))}
							</div>
						)}
					</div>
					<div className='mb-3'>
						<Link
							href={`/catalog/${categoryHref}`}
							className='gradient-text text-center font-semibold'
						>
							{subcategories.length > 7
								? currentLocale === 'en'
									? `And ${subcategories.length - 7} more categories in the section --->`
									: `Та ще ${subcategories.length - 7} категорій у розділі --->`
								: currentLocale === 'en'
									? 'Go to section --->'
									: 'Перейти у розділ --->'}
						</Link>
					</div>
				</>
			) : (
				<>
					<h3 className='gradient-text font-semibold text-[28px] mb-4'>
						{currentLocale === 'en' ? 'Wait...' : 'Почекайте...'}
					</h3>
				</>
			)}
		</div>
	)
}

export default CategoryCard
