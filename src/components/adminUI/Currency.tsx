'use client'

import { OkIcon } from '@/assets/icons'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const Currency = observer(() => {
	const { exchangeRate, setExchangeRate } = productStore
	const [inputValue, setInputValue] = useState(exchangeRate.toString())

	const updateRate = async () => {
		const rate = Number(inputValue)
		if (isNaN(rate) || rate <= 0) {
			alert('Введіть коректний курс')
			return
		}
		await setExchangeRate(rate)
	}

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-2xl font-medium'>Сьогоднішній курс валюти: {exchangeRate}</p>
			<div className='w-full flex items-center gap-x-2'>
				<input
					type='number'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					className='border border-sc-1 rounded-lg p-2 w-1/2 outline-sc-1'
				/>
				<button
					onClick={updateRate}
					className='w-10 h-10 rounded-full border border-sc-1 flex items-center justify-center p-3'
				>
					<OkIcon />
				</button>
			</div>
			<p className='text-gr-4 text-xl'>
				***Всі ціни в картках товару в яких вказана валюта - будуть автоматично перераховані
				і відображені у гривні
			</p>
		</div>
	)
})

export default Currency
