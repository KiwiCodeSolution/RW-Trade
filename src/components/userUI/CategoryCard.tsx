'use client'

import { useCurrentLocale } from '@/hooks/useCurrentLocale'

import { Category } from '@/types/baseTypes'

import { Link } from '@/i18n/navigation'

import { useEffect, useState } from 'react'

interface CategoryCardProps {
	category?: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
	const currentLocale = useCurrentLocale()

	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps, react/no-unstable-nested-components
	useEffect(() => {
		setMounted(true)
	}, [])

	const correspondenceTable = [
		{ title: { uk: 'Автоелектроніка', en: 'Car electronics' }, href: 'car_electronics' },
		{
			title: { uk: 'Портативні радіостанції', en: 'Walkie-talkies' },
			href: 'walkie-talkies'
		},
		{
			title: { uk: 'Освітлення для авто', en: 'Car lights' },
			href: 'car_lights'
		}
	]

	const subcategories = category?.subcategories ?? []

	const categoryHref =
		correspondenceTable.find(
			item => item.title[currentLocale] === category?.title[currentLocale]
		)?.href ?? '/catalog'

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
							<ul>
								{subcategories.slice(0, 7).map((item, index) => (
									<li key={index}>{item.title[currentLocale] ?? ''}</li>
								))}
							</ul>
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
