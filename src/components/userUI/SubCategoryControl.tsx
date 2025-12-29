'use client'

import { Locale, Subcategory } from '@/types/baseTypes'

import ScrollableTrack from './ScrollableTrack'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
	subcategories: Subcategory[]
	locale: Locale

	activeSlug?: string
	onChange?: (slug: string) => void
	useUrlSync?: boolean
}

const SubCategoryControl = ({
	subcategories,
	locale,
	activeSlug = 'all',
	onChange,
	useUrlSync = false
}: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const currentSlug = useUrlSync ? (searchParams.get('subCategory') ?? 'all') : activeSlug

	const handleChange = (slug?: string) => {
		if (!slug) return

		if (useUrlSync) {
			const params = new URLSearchParams(searchParams.toString())

			if (slug === 'all') {
				params.delete('subCategory')
			} else {
				params.set('subCategory', slug)
			}

			// 🔥 КЛЮЧОВИЙ ФІКС
			const query = params.toString()
			router.push(query ? `${pathname}?${query}` : pathname)
		} else {
			onChange?.(slug)
		}
	}

	const allLabel: Record<Locale, string> = {
		uk: 'Всі підкатегорії',
		en: 'All subcategories'
	}

	return (
		<div className='relative'>
			<ScrollableTrack>
				{/* ALL */}
				<button
					onClick={() => handleChange('all')}
					className={`p-0.5 rounded-md w-fit ${
						currentSlug === 'all' ? 'bg-primary' : ''
					}`}
				>
					<div className='bg-bg-light rounded-sm px-4 py-2'>
						<span
							className={`text-nowrap bg-primary bg-clip-text ${
								currentSlug === 'all' ? 'text-transparent' : ''
							}`}
						>
							{allLabel[locale]}
						</span>
					</div>
				</button>

				{/* SUBCATEGORIES */}
				{subcategories.map(item => (
					<button
						key={item._id}
						onClick={() => handleChange(item.subCategorySlug ?? item.slug)}
						className={`p-0.5 rounded-md w-fit ${
							currentSlug === (item.subCategorySlug ?? item.slug) ? 'bg-primary' : ''
						}`}
					>
						<div className='bg-bg-light rounded-sm px-4 py-2'>
							<span
								className={`text-nowrap bg-primary bg-clip-text ${
									currentSlug === (item.subCategorySlug ?? item.slug)
										? 'text-transparent'
										: ''
								}`}
							>
								{item.title[locale]}
							</span>
						</div>
					</button>
				))}
			</ScrollableTrack>
		</div>
	)
}

export default SubCategoryControl
