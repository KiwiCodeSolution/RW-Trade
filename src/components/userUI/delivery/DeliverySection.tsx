'use client'

import { servicesList } from '@/helpers/deliverys'

import { DeliveryInfo, DeliveryMethod } from '@/types/baseTypes'

import DeliverySelect from './DeliverySelect'
import MeestFields from './MeestFields'
import NPFields from './NPFields'
import UkrPoshtaFields from './UkrPoshtaFields'

import { useEffect, useState } from 'react'

interface Props {
	value: DeliveryInfo
	onChange: (val: DeliveryInfo) => void
}

export default function DeliverySection({ value, onChange }: Props) {
	// локальний стан comment
	const [comment, setComment] = useState(() => value.comment || '')

	// синхронізація з зовнішнім value.comment, тільки якщо реально змінилося
	useEffect(() => {
		if (value.comment !== comment) {
			setComment(value.comment || '')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.comment])

	// централізований обробник оновлення
	const handleChange = (partial: Partial<DeliveryInfo>) => {
		// завжди підставляємо актуальний comment
		onChange({ ...value, ...partial, comment })
	}

	return (
		<div className='flex flex-col gap-2'>
			{/* Вибір способу доставки */}
			<DeliverySelect
				options={servicesList}
				value={value.method}
				onChange={method => handleChange({ method: method as DeliveryMethod })}
			/>

			{/* Підкомпоненти для конкретних методів */}
			{value.method === 'nova_poshta' && (
				<NPFields value={{ ...value, comment }} onChange={handleChange} />
			)}
			{value.method === 'ukrposhta' && (
				<UkrPoshtaFields value={{ ...value, comment }} onChange={handleChange} />
			)}
			{value.method === 'meest' && (
				<MeestFields value={{ ...value, comment }} onChange={handleChange} />
			)}
		</div>
	)
}
