'use client'

import { Locale, Subcategory } from '@/types/baseTypes'

import ScrollableTrack from './ScrollableTrack'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	subcategories: Subcategory[]
	activeSlug: string
	locale: Locale
}

const SubCategoryControl = ({ subcategories, activeSlug, locale }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleChange = (slug: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (slug === 'all') {
			params.delete('subCategory')
		} else {
			params.set('subCategory', slug)
		}
		router.push(`?${params.toString()}`)
	}

	const allLabel: Record<Locale, string> = {
		uk: 'Всі підкатегорії',
		en: 'All subcategories'
	}

	return (
		<div className='relative'>
			<ScrollableTrack>
				<button
					className={`p-0.5 rounded-md w-fit cursor-pointer ${activeSlug === 'all' ? 'bg-primary' : ''}`}
					onClick={() => handleChange('all')}
				>
					<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
						<div
							className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
								activeSlug === 'all' ? 'text-transparent' : ''
							}`}
						>
							{allLabel[locale]}
						</div>
					</div>
				</button>

				{subcategories.map(item => (
					<button
						key={item._id}
						className={`p-0.5 rounded-md w-fit cursor-pointer ${activeSlug === item.slug ? 'bg-primary' : ''}`}
						onClick={() => handleChange(item.slug)}
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

export default SubCategoryControl
