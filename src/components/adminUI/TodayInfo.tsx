'use client'

import { useEffect, useState } from 'react'

const TodayInfo = () => {
	const [dateTime, setDateTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setDateTime(new Date())
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	const time = dateTime.toLocaleTimeString('uk-UA', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Europe/Kiev'
	})

	const date = dateTime.toLocaleDateString('uk-UA', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		weekday: 'long',
		timeZone: 'Europe/Kiev'
	})

	return (
		<div className='flex flex-col gap-y-6'>
			<div className='min-w-[360px] h-16 rounded-2xl bg-primary flex items-center justify-center'>
				<p className='text-white font-medium text-xl'>{time} in KIEV</p>
			</div>
			<p className='text-xl font-medium'>{`Сьогодні ${date}`}</p>
		</div>
	)
}
export default TodayInfo
