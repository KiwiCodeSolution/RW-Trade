'use client'

import { Checked } from '@/assets/icons'

import { useListQuery } from '@/hooks/useListQuery'

import { Locale } from '@/types/baseTypes'

import BtnSolid from '../commonUI/BtnSolid'

import MultiRangeSlider from './MultiRangeSlider'

import { useState } from 'react'

type FiltersProps = {
	countriesList: string[]
	minPriceDefault: number
	maxPriceDefault: number
	locale: Locale
}

export default function Filters({
	countriesList,
	minPriceDefault,
	maxPriceDefault,
	locale
}: FiltersProps) {
	const { query, setQuery } = useListQuery({
		countries: '',
		minPrice: String(minPriceDefault),
		maxPrice: String(maxPriceDefault)
	})

	// Локальний стан ініціалізується разово через lazy-init
	const [selectedCountries, setSelectedCountries] = useState<string[]>(() =>
		query.countries ? query.countries.split(',') : []
	)
	const [priceRange, setPriceRange] = useState<[number, number]>(() => [
		query.minPrice ? Number(query.minPrice) : minPriceDefault,
		query.maxPrice ? Number(query.maxPrice) : maxPriceDefault
	])

	const toggleCountry = (country: string) => {
		setSelectedCountries(prev =>
			prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
		)
	}

	const onApplyFilters = () => {
		setQuery({
			countries: selectedCountries.length ? selectedCountries.join(',') : undefined,
			minPrice: String(priceRange[0]),
			maxPrice: String(priceRange[1])
		})
	}

	return (
		<div className='w-full flex flex-col gap-6'>
			{/* Список країн */}
			<div className='w-full border-[1px] border-sc-1 rounded-lg flex flex-col py-2 px-4 gap-y-2'>
				<h4>{locale === 'uk' ? 'Країна-виробник' : 'Country manufacturer'}</h4>
				{countriesList.map(country => (
					<label key={country} className='flex items-center gap-3 cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only'
							checked={selectedCountries.includes(country)}
							onChange={() => toggleCountry(country)}
						/>
						<Checked isCheck={selectedCountries.includes(country)} />
						<span>{country}</span>
					</label>
				))}
			</div>

			{/* Слайдер цін */}
			<MultiRangeSlider
				min={minPriceDefault}
				max={maxPriceDefault}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				locale={locale}
			/>

			{/* Кнопка застосування */}
			<BtnSolid size='xxl' variant='primary' as='button' action={onApplyFilters}>
				{locale === 'uk' ? 'Застосувати' : 'Apply'}
			</BtnSolid>
		</div>
	)
}
