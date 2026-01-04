'use client'

import { Checked } from '@/assets/icons'

import { useListQuery } from '@/hooks/useListQuery'

import { Locale } from '@/types/baseTypes'

import BtnSolid from '../commonUI/BtnSolid'

import MultiRangeSlider from './MultiRangeSlider'

import { useEffect, useState } from 'react'

type FiltersProps = {
	countriesList: string[]
	minPriceDefault: number
	maxPriceDefault: number
	locale: Locale
	fnc?: () => void
}

export default function Filters({
	countriesList,
	minPriceDefault,
	maxPriceDefault,
	locale,
	fnc
}: FiltersProps) {
	const { query, setQuery } = useListQuery({
		countries: '',
		minPrice: String(minPriceDefault),
		maxPrice: String(maxPriceDefault)
	})

	console.log('Filters', minPriceDefault, maxPriceDefault)
	// Локальний стан ініціалізується разово через lazy-init
	const [selectedCountries, setSelectedCountries] = useState<string[]>(() =>
		query.countries ? query.countries.split(',') : []
	)
	const [priceRange, setPriceRange] = useState<[number, number]>(() => [
		query.minPrice ? Number(query.minPrice) : minPriceDefault,
		query.maxPrice ? Number(query.maxPrice) : maxPriceDefault
	])

	useEffect(() => {
		const newRange: [number, number] = [
			query.minPrice ? Number(query.minPrice) : minPriceDefault,
			query.maxPrice ? Number(query.maxPrice) : maxPriceDefault
		]

		setPriceRange(prev =>
			prev[0] === newRange[0] && prev[1] === newRange[1] ? prev : newRange
		)
	}, [minPriceDefault, maxPriceDefault, query.minPrice, query.maxPrice])
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

		if (fnc) fnc()
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
			<div className='hidden lg:block mx-auto w-full'>
				<BtnSolid size='xxxl' variant='primary' as='button' action={onApplyFilters}>
					{locale === 'uk' ? 'Застосувати' : 'Apply'}
				</BtnSolid>
			</div>
			<div className='lg:hidden mx-auto'>
				<BtnSolid size='m' variant='primary' as='button' action={onApplyFilters}>
					{locale === 'uk' ? 'Застосувати' : 'Apply'}
				</BtnSolid>
			</div>
		</div>
	)
}
