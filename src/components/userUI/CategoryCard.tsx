'use client'

import { Category, Locale } from '@/types/baseTypes'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CategoryCardProps {
	category?: Category
	locale: Locale
}

const CategoryCard = ({ category, locale }: CategoryCardProps) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Якщо серверний рендер або немає категорії — нічого не рендеримо
	if (!mounted || !category) return null

	const subcategories = category.subcategories ?? []

	return (
		<div className='h-[505px] w-full min-w-[278px] max-w-[360px] rounded-md border-2 border-sc-1 p-3 flex flex-col justify-between'>
			<div>
				<h3 className='gradient-text font-semibold text-[28px] mb-4'>
					{category.title[locale]}
				</h3>
				<div className='w-full h-1 bg-primary rounded-full mb-4'></div>
				{subcategories.length > 0 && (
					<ul>
						{subcategories.slice(0, 7).map((item, index) => (
							<li key={index}>{item.title[locale] ?? ''}</li>
						))}
					</ul>
				)}
			</div>
			<div className='mb-3'>
				<Link href='/category' className='gradient-text text-center font-semibold'>
					{subcategories.length > 7
						? `Та ще ${subcategories.length - 7} категорій у розділі --->`
						: 'Перейти у розділ --->'}
				</Link>
			</div>
		</div>
	)
}

export default CategoryCard
