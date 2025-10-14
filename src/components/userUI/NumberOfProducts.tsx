'use client'

import { useState } from 'react'

const NumberOfProducts = ({ setNumber, initialNumber }) => {
	const lang = 'uk'

	const title = {
		uk: 'Кількість товарів на сторінці',
		en: 'Number of products per page'
	}

	const numbers = ['10', '20', '30']

	const [selected, setSelected] = useState(initialNumber)

	const handleChange = e => {
		setSelected(e.target.value)
		setNumber(e.target.value)
	}

	return (
		<div className='flex gap-2 text-link-blue'>
			<p> {title[lang]}: </p>
			{numbers.map((item, index) => (
				<label key={index} className='flex items-center'>
					<div
						className={`w-6 h-6 text-sm flex justify-center items-center border rounded-lg ${selected === item ? 'border-link-blue' : 'border-transparent'}`}
					>
						{item}
					</div>
					<input
						type='radio'
						name='numOfProd'
						id={`numOfProd_${item}`}
						className='hidden'
						value={item}
						onChange={handleChange}
					/>
				</label>
			))}
		</div>
	)
}

export default NumberOfProducts
