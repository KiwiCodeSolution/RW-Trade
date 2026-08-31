'use client'

import { statisticsStore } from '@/store/StatStore'

import StatsPopularCategories from './StatsPopularCategories'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const StatisticPageComponent = observer(() => {
	const { stats, fetchStats } = statisticsStore

	useEffect(() => {
		if (!stats) fetchStats()
	}, [])

	console.log(stats)

	const now = new Date()
	const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

	const allData = [
		{ title: 'Всього замовлень', count: stats?.totalOrders ?? 0 },
		{ title: 'Виконано', count: stats?.shipped ?? 0 },
		{ title: 'Відхилених', count: stats?.cancelled ?? 0 },
		{ title: 'В обробці', count: stats?.pending ?? 0 }
	]

	const statsForCurrentMonth = statisticsStore.stats?.monthlyOrders[key] ?? {
		total: 0,
		pending: 0,
		shipped: 0,
		delivered: 0,
		cancelled: 0
	}

	const monthlyData = [
		{ title: 'Всього замовлень', count: statsForCurrentMonth.total ?? 0 },
		{ title: 'Виконано', count: statsForCurrentMonth.shipped ?? 0 },
		{ title: 'Відхилених', count: statsForCurrentMonth.cancelled ?? 0 },
		{ title: 'В обробці', count: statsForCurrentMonth.pending ?? 0 }
	]

	return (
		<div className='flex flex-col gap-y-6 pt-6'>
			<div className='flex flex-col gap-y-2'>
				<h2 className='text-xl font-medium'>Замовлення:</h2>
				<div className='grid grid-cols-4 gap-x-3'>
					{allData.map(item => (
						<div
							className='w-full h-[42px] flex items-center justify-center pag-x-1 border-[2px] border-gr-2 rounded-2xl'
							key={item.title + item.count}
						>
							<p className='text-center font-medium'>
								<span className='font-semibold text-gr-2'>{item.title}: </span>
								{item.count}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className='flex flex-col gap-y-2'>
				<h2 className='text-xl font-medium'>Замовлення у цьому місяці:</h2>
				<div className='grid grid-cols-4 gap-x-3'>
					{monthlyData.map(item => (
						<div
							className='w-full h-[42px] flex items-center justify-center pag-x-1 border-[2px] border-gr-2 rounded-2xl'
							key={item.title + item.count}
						>
							<p className='text-center font-medium'>
								<span className='font-semibold text-gr-2'>{item.title}: </span>
								{item.count}
							</p>
						</div>
					))}
				</div>
			</div>
			{stats && <StatsPopularCategories statistic={stats} />}
		</div>
	)
})
export default StatisticPageComponent
