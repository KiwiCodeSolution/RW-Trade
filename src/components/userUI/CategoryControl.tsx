'use client'

import { Category, Locale } from '@/types/baseTypes'

import ScrollableTrack from './ScrollableTrack'

import { useLocale } from 'next-intl'
import { useState } from 'react'

interface CategoryControlProps {
	setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>
	categories: Category[]
}

export default function CategoryControl({ setCategory, categories }: CategoryControlProps) {
	const locale = useLocale() as Locale
	const [selected, setSelected] = useState<Category | undefined>(undefined)

	const handleSelect = (category?: Category) => {
		setSelected(category)
		setCategory(category)
	}

	const content: Record<Locale, string> = {
		uk: 'Всі категорії',
		en: 'All Categories'
	}

	return (
		<div className='relative mb-7'>
			<ScrollableTrack>
				<button
					className={`p-0.5 rounded-md w-fit cursor-pointer ${selected === undefined ? 'bg-primary' : ''}`}
					onClick={() => handleSelect(undefined)}
				>
					<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
						<div
							className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
								selected === undefined ? 'text-transparent' : ''
							}`}
						>
							{content[locale]}
						</div>
					</div>
				</button>

				{categories?.map(item => (
					<button
						key={item._id}
						className={`p-0.5 rounded-md w-fit cursor-pointer ${
							selected?._id === item._id ? 'bg-primary' : ''
						}`}
						onClick={() => handleSelect(item)}
					>
						<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
							<div
								className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
									selected?._id === item._id ? 'text-transparent' : ''
								}`}
							>
								{item.title[locale]}
							</div>
						</div>
					</button>
				))}
			</ScrollableTrack>
		</div>
	)
}
