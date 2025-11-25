'use client'

import { DeliveryCity, DeliveryValue, DeliveryWarehouse } from '../types'

import { useEffect, useState } from 'react'

type Props = {
	value: DeliveryValue
	onChange: (v: DeliveryValue) => void
}

export default function UkrposhtaSelect({ value, onChange }: Props) {
	const [city, setCity] = useState<DeliveryCity | null>(value.city ?? null)
	const [branch, setBranch] = useState<DeliveryWarehouse | null>(value.warehouse ?? null)

	useEffect(() => {
		onChange({
			...value,
			city,
			warehouse: branch,
			address: null
		})
	}, [city, branch])

	return (
		<div className='flex flex-col gap-4 mt-2'>
			{/* Місто */}
			<div className='flex flex-col gap-1'>
				<label className='font-semibold'>Місто</label>

				<input
					type='text'
					value={city?.name ?? ''}
					onChange={e => setCity({ name: e.target.value })}
					placeholder='Введіть місто'
					className='h-10 border border-gray-300 rounded-lg px-3'
				/>
			</div>

			{/* Відділення */}
			<div className='flex flex-col gap-1'>
				<label className='font-semibold'>Відділення</label>

				<input
					type='text'
					value={branch?.description ?? ''}
					onChange={e => setBranch({ description: e.target.value })}
					placeholder='Введіть номер або адресу відділення'
					className='h-10 border border-gray-300 rounded-lg px-3'
				/>
			</div>
		</div>
	)
}
