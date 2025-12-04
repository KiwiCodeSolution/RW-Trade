'use client'

import { BASE_URL } from '@/utils/config'

import { uk } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type CurrencyRecord = {
	_id: string
	rate: number
	date: string
	createdAt: string
}

export default function CurrencyDatePicker() {
	const [selected, setSelected] = useState<Date | null>(null)
	const [records, setRecords] = useState<CurrencyRecord[]>([])
	const [loading, setLoading] = useState(false)

	const fetchRates = async (day: Date) => {
		setSelected(day)
		setLoading(true)
		setRecords([])

		const iso =
			day.getFullYear() +
			'-' +
			String(day.getMonth() + 1).padStart(2, '0') +
			'-' +
			String(day.getDate()).padStart(2, '0')

		try {
			const res = await fetch(`${BASE_URL}/currency/get-all/by-date?date=${iso}&all=true`)
			if (!res.ok) throw new Error('Bad response')
			const data = await res.json()
			setRecords(Array.isArray(data) ? data : [])
		} catch (err) {
			console.error(err)
			setRecords([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const today = new Date()
		fetchRates(today)
	}, [])

	return (
		<div className='flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-2xl'>
			<DayPicker
				mode='single'
				locale={uk}
				selected={selected ?? undefined}
				onDayClick={fetchRates}
				classNames={{
					months: 'flex justify-center',
					month: 'space-y-2',
					caption: 'text-center font-semibold text-lg',
					table: 'w-full border-collapse',
					head_row: 'flex justify-between px-2 text-gray-500',
					row: 'flex justify-between',
					cell: 'text-center w-10 h-10 flex items-center justify-center',
					day: 'cursor-pointer rounded-full hover:bg-emerald-100 transition'
				}}
				modifiersClassNames={{
					selected: 'bg-emerald-500 text-white',
					today: 'border border-emerald-500'
				}}
			/>

			<div className='w-full max-w-sm text-center border border-gray-300 rounded-lg p-3 bg-white'>
				{selected ? (
					loading ? (
						<p className='text-gray-500'>Завантаження...</p>
					) : records.length > 0 ? (
						<>
							<p className='text-gray-700 font-medium'>
								Обрано: {selected.toLocaleDateString('uk-UA')}
							</p>
							<div className='mt-2 space-y-2'>
								{records.map(r => (
									<div
										key={r._id}
										className='border border-gray-200 rounded-md py-2'
									>
										<p className='text-sm text-gray-800'>
											Курс: <span className='font-semibold'>{r.rate}</span>
										</p>
										<p className='text-xs text-gray-400'>
											{new Date(r.date).toLocaleTimeString('uk-UA')}
										</p>
									</div>
								))}
							</div>
						</>
					) : (
						<p className='text-gray-400'>Записів на цю дату немає</p>
					)
				) : (
					<p className='text-gray-400'>Оберіть день, щоб побачити курс</p>
				)}
			</div>
		</div>
	)
}
