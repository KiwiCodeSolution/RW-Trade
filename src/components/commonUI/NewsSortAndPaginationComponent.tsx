'use client'

import { EditIcon, Trash } from '@/assets/icons'

import { useDynamicLimits } from '@/hooks/useDynamicLimits'
import { useListQuery } from '@/hooks/useListQuery'

import { Locale, NewsLimit } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import CreateNewsBtn from '../adminUI/CreateNewsBtn'
import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import NewsCard from '../userUI/NewsCard'
import QuantityProduct from '../userUI/QuantityProduct'

import Loader from './loader/Loader'
import BaseModal from './modal/BaseModal'
import ConfirmAdminComponent from './modal/ConfirmAdminComponent'
import { Link } from '@/i18n/navigation'
import { NewsSort, newsSortOptions } from '@/lib/sortOptions'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const NewsSortAndPaginationComponent = observer(({ locale }: { locale: Locale }) => {
	const { news, total, isLoading, deleteNews } = newsStore
	const { data: session } = useSession()
	const token = session?.user?.accessToken

	// 📌 useQueryParams для page, limit, sort
	const { query, setQuery } = useListQuery({
		page: '1',
		limit: '16',
		sort: 'date_desc' as NewsSort
	})

	const { page, limit, sort } = query

	// 📌 useResponsiveLimits для динамічних лімітів
	const { limits, limit: currentLimit } = useDynamicLimits({
		breakpoints: [
			{ min: 0, cols: 1 },
			{ min: 940, cols: 1 },
			{ min: 1230, cols: 2 },
			{ min: 1530, cols: 3 },
			{ min: 1840, cols: 4 }
		],
		rows: [3, 4, 5]
	})

	const [isShowModal, setIsShowModal] = useState<string | null>(null)

	// 🔹 Завантаження новин зі стору
	useEffect(() => {
		newsStore.fetchNews({
			page: Number(page),
			limit: Number(limit),
			sort
		})
	}, [page, limit, sort])

	async function handleDeleteNews(id: string) {
		if (!token) return
		await deleteNews(id, token)
		setIsShowModal(null)
	}

	return (
		<div className='flex flex-col justify-between'>
			<div className='py-6 flex items-center justify-between relative'>
				<p className='font-medium'>Всього записів: {total}</p>
				<div className='flex items-center justify-end gap-x-6'>
					<Sort<NewsSort>
						locale={locale}
						options={newsSortOptions}
						onChange={val => setQuery({ sort: val, page: '1' })}
					/>
					<QuantityProduct
						locale={locale}
						limits={limits}
						value={Number(limit) as NewsLimit}
						onChangeQuantityValue={
							val => setQuery({ limit: String(val), page: '1' }) // 🔹 число -> рядок
						}
					/>
				</div>
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<div className='mb-7 grid min-[940px]:grid-cols-1 min-[1840px]:grid-cols-2 gap-6'>
					<CreateNewsBtn />
					{news.map(item => (
						<div key={item._id} className='flex gap-x-1'>
							<NewsCard locale={locale} article={item} />
							<div className='flex flex-col gap-y-2 xl:gap-y-3 shrink-0 mt-auto py-1'>
								<Link
									className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-white border border-gr-2 hover:shadow-ms transform duration-300 transition-transform hover:scale-105'
									href={`news/editor/${item._id}`}
								>
									<EditIcon />
								</Link>
								<button
									className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-sc-5 hover:shadow-ms transform duration-300 transition-transform hover:scale-105'
									onClick={() => setIsShowModal(item._id)}
								>
									<Trash className='w-4 h-4 xl:w-5 xl:h-5' />
								</button>

								{isShowModal === item._id && (
									<BaseModal
										isOpen={true}
										onClose={() => setIsShowModal(null)}
										title='Підтвердження видалення'
									>
										<ConfirmAdminComponent
											fncDelete={() => handleDeleteNews(item._id)}
											fncEscape={() => setIsShowModal(null)}
											text='новину'
										/>
									</BaseModal>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			<div className='mb-7'>
				<Pagination
					numberOfItems={total}
					itemsPerPage={Number(limit)}
					currentPage={Number(page)}
					onPageChange={val => setQuery({ page: String(val) })} // 🔹 число -> рядок
				/>
			</div>
		</div>
	)
})

export default NewsSortAndPaginationComponent
