import { Locale } from '@/types/baseTypes'

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

export default function MultiRangeSlider({
	min,
	max,
	priceRange,
	setPriceRange,
	locale
}: {
	min: number
	max: number
	priceRange: [number, number]
	setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
	locale: Locale
}) {
	return (
		<div className='w-full border-[1px] border-sc-1 rounded-lg p-4 slider-filter'>
			<h4 className='mb-3'>{locale === 'uk' ? 'Ціна' : 'Price'}</h4>
			<div className='flex items-center justify-between mb-4'>
				<div className='w-1/3 h-[30px] bg-primary p-[1px] rounded-lg flex items-center justify-center'>
					<div className='bg-bg-light rounded-lg w-full h-full flex items-center justify-center'>
						<input
							type='number'
							value={priceRange[0]}
							step={1}
							onChange={e => setPriceRange([Number(e.target.value), priceRange[0]])}
							className='outline-none w-full h-full text-center text-sm'
						/>
					</div>
				</div>
				<div className='w-1/6 h-[2px] rounded-lg bg-primary ' />
				<div className='w-1/3 h-[30px] bg-primary p-[1px] rounded-lg flex items-center justify-center'>
					<div className='bg-bg-light rounded-lg w-full h-full flex items-center justify-center'>
						<input
							type='number'
							value={priceRange[1]}
							step={1}
							onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
							className='outline-none w-full h-full text-center text-sm'
						/>
					</div>
				</div>
			</div>
			<RangeSlider
				min={Math.floor(min)}
				max={Math.ceil(max)}
				value={priceRange}
				step={1} // або 1, якщо хочеш тільки цілі числа
				onInput={vals => setPriceRange(vals)}
			/>
		</div>
	)
}
