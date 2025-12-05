'use client'

import { ItemsSort, Locale, NewsLimit } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import NewsCard from '../userUI/NewsCard'
import QuantityProduct from '../userUI/QuantityProduct'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const NewsSortAndPaginationComponent = observer(({ locale }: { locale: Locale }) => {
	const { news, total, isLoading } = newsStore

	const [page, setPage] = useState(1)
	const [sort, setSort] = useState<ItemsSort>('DATE_ADDED')
	const [limit, setLimit] = useState<number>(16)
	const [availableLimits, setAvailableLimits] = useState<number[]>([16, 24, 32])

	// 🔹 Обчислення лімітів динамічно
	useEffect(() => {
		const calculateLimits = () => {
			const width = window.innerWidth
			let cols = 3

			if (width >= 940 && width < 1230) cols = 1
			else if (width >= 1230 && width < 1530) cols = 2
			else if (width >= 1530 && width < 1840) cols = 3
			else if (width >= 1840) cols = 4

			const newLimits = [cols * 3, cols * 4, cols * 5]
			setAvailableLimits(newLimits)
			setLimit(newLimits[0])
		}

		calculateLimits()
		window.addEventListener('resize', calculateLimits)
		return () => window.removeEventListener('resize', calculateLimits)
	}, [])

	// 🔹 Завантаження продуктів зі стору
	useEffect(() => {
		newsStore.fetchNews({
			sort,
			limit,
			page
		})
	}, [locale, sort, limit, page])

	return (
		<div className='flex flex-col justify-between'>
			<div className='py-6 flex items-center justify-between relative'>
				<p className='font-medium'>Всього записів: {total}</p>
				<div className='flex items-center justify-end gap-x-6'>
					<Sort onChangeSortValue={setSort} locale={locale} pageType='news' />
					<QuantityProduct
						locale={locale}
						limits={availableLimits}
						value={limit as NewsLimit}
						onChangeQuantityValue={setLimit}
					/>
				</div>
			</div>

			{isLoading ? (
				<p className='text-center text-gray-500'>Завантаження...</p>
			) : (
				<div className='mb-7 grid min-[940px]:grid-cols-1 min-[1530px]:grid-cols-3 min-[1840px]:grid-cols-3 gap-6'>
					{news.map(item => (
						<NewsCard
							key={item._id}
							locale={locale}
							article={item}
							sectionType='admin'
						/>
					))}
				</div>
			)}

			<div className='mb-7'>
				<Pagination
					numberOfItems={total}
					itemsPerPage={limit}
					currentPage={page}
					onPageChange={setPage}
				/>
			</div>
		</div>
	)
})
export default NewsSortAndPaginationComponent
