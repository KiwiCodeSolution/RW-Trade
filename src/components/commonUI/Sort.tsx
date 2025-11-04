'use client'

import { SortIcon } from '@/assets/icons'

import { Locale, ProductSort } from '@/types/baseTypes'

import { useState } from 'react'

const Sort = ({
	locale,
	onChangeSortValue
}: {
	locale: Locale
	onChangeSortValue: React.Dispatch<React.SetStateAction<ProductSort>>
}) => {
	const [isShowSortOptions, setIsShowSortOptions] = useState(false)
	const sortItems = [
		{
			value: 'PRICE_ASC',
			label: locale === 'uk' ? 'Ціна за зростанням' : 'Price: Low to High'
		},
		{
			value: 'PRICE_DESC',
			label: locale === 'uk' ? 'Ціна за спаданням' : 'Price: High to Low'
		},
		{
			value: 'DATE_ADDED',
			label: locale === 'uk' ? 'За датою надходження' : 'Date added'
		},
		{ value: 'RATING', label: locale === 'uk' ? 'Рейтинг' : 'Rating' },
		{ value: 'NAME_ASC', label: locale === 'uk' ? 'Назва: А-Я' : 'Name: A-Z' },
		{ value: 'NAME_DESC', label: locale === 'uk' ? 'Назва: Я-А' : 'Name: Z-A' }
	]

	function handleClickOutside(value: ProductSort) {
		setIsShowSortOptions(false)
		onChangeSortValue(value)
	}

	return (
		<div className='relative'>
			<button
				className='flex items-center gap-1'
				onClick={() => setIsShowSortOptions(!isShowSortOptions)}
			>
				<p className='font-medium text-link-blue underline decoration-1'>
					{locale === 'uk' ? 'Сортуваня' : 'Sort by:'}
				</p>
				<SortIcon />
			</button>
			{isShowSortOptions && (
				<div className='h-fit px-2 py-4 rounded-md border-2 border-sc-1 flex flex-col gap-y-3 justify-between items-start product-card-shadow bg-other-1 z-10 absolute top-8 right-0 w-[200px]'>
					{sortItems.map(item => (
						<button
							key={item.value}
							className='gradient-text font-medium text-left w-full'
							onClick={() => handleClickOutside(item.value as ProductSort)}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default Sort
