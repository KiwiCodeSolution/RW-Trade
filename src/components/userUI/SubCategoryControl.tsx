'use client'

import { Locale, Subcategory } from '@/types/baseTypes'

import ScrollableTrack from './ScrollableTrack'

import { useEffect, useState } from 'react'

interface Props {
	subcategories: Subcategory[]
	setSubCategory: React.Dispatch<React.SetStateAction<string>>
	locale: Locale
}

const SubCategoryControl = ({ subcategories, setSubCategory, locale }: Props) => {
	const [selected, setSelected] = useState('all')

	useEffect(() => {
		queueMicrotask(() => setSelected('all'))
	}, [subcategories])

	const handleChange = (value: string) => {
		setSelected(value)
		setSubCategory(value)
	}

	return (
		<div className='relative '>
			<ScrollableTrack>
				<label
					htmlFor={`control_all`}
					aria-label={'all subcategories'}
					className={`p-0.5 rounded-md w-fit cursor-pointer ${
						selected === 'all' ? 'bg-primary' : ''
					}`}
				>
					<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
						<div
							className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
								selected === 'all' ? 'text-transparent' : ''
							}`}
						>
							{locale === 'uk' ? 'всі підкатегорії' : 'all subcategories'}
						</div>
					</div>

					<input
						type='radio'
						name='subcategoryControl'
						id={`control_all`}
						value={'all'}
						className='hidden'
						onChange={() => handleChange('all')}
						checked={selected === 'all'}
					/>
				</label>
				{subcategories.map(item => (
					<label
						key={item._id}
						htmlFor={`control_${item.title.en}`}
						aria-label={item.title[locale]}
						className={`p-0.5 rounded-md w-fit cursor-pointer ${
							selected === item._id ? 'bg-primary' : ''
						}`}
					>
						<div className='bg-bg-light w-full h-full flex justify-center items-center rounded-sm'>
							<div
								className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
									selected === item._id ? 'text-transparent' : ''
								}`}
							>
								{item.title[locale]}
							</div>
						</div>

						<input
							type='radio'
							name='subcategoryControl'
							id={`control_${item.title.en}`}
							value={item._id}
							className='hidden'
							onChange={() => handleChange(item._id!)}
							checked={selected === item._id}
						/>
					</label>
				))}
			</ScrollableTrack>
		</div>
	)
}

export default SubCategoryControl
