'use client'

import { Category, Locale } from '@/types/baseTypes'

import ScrollableTrack from './ScrollableTrack'

import { useRouter, useSearchParams } from 'next/navigation'

interface CategoryControlProps {
	categories: Category[]
	activeSlug: string
	locale: Locale
}

export default function CategoryControl({ categories, activeSlug, locale }: CategoryControlProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleSelect = (slug?: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (slug && slug !== 'all') {
			params.set('category', slug)
			params.set('subCategory', 'all') // при зміні категорії підкатегорія скидається
		} else {
			params.delete('category')
			params.delete('subCategory')
		}
		router.push(`?${params.toString()}`)
	}

	const content: Record<Locale, string> = {
		uk: 'Всі категорії',
		en: 'All Categories'
	}

	return (
		<div className='relative mb-7'>
			<ScrollableTrack>
				<button
					className={`p-0.5 rounded-md w-fit cursor-pointer ${activeSlug === 'all' ? 'bg-primary' : ''}`}
					onClick={() => handleSelect('all')}
				>
					<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
						<div
							className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
								activeSlug === 'all' ? 'text-transparent' : ''
							}`}
						>
							{content[locale]}
						</div>
					</div>
				</button>

				{categories.map(item => (
					<button
						key={item._id}
						className={`p-0.5 rounded-md w-fit cursor-pointer ${activeSlug === item.slug ? 'bg-primary' : ''}`}
						onClick={() => handleSelect(item.slug)}
					>
						<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
							<div
								className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
									activeSlug === item.slug ? 'text-transparent' : ''
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
