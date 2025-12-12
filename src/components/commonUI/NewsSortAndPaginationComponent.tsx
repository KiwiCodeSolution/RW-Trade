'use client'

import { EditIcon, Trash } from '@/assets/icons'

import { ItemsSort, Locale, NewsLimit } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import CreateNewsBtn from '../adminUI/CreateNewsBtn'
import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import NewsCard from '../userUI/NewsCard'
import QuantityProduct from '../userUI/QuantityProduct'

import BaseModal from './modal/BaseModal'
import ConfirmAdminComponent from './modal/ConfirmAdminComponent'
import { Link } from '@/i18n/navigation'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const NewsSortAndPaginationComponent = observer(({ locale }: { locale: Locale }) => {
	const { news, total, isLoading, deleteNews } = newsStore

	const { data: session } = useSession()
	const token = session?.user?.accessToken

	const [page, setPage] = useState(1)
	const [sort, setSort] = useState<ItemsSort>('DATE_ADDED')
	const [limit, setLimit] = useState<number>(16)
	const [availableLimits, setAvailableLimits] = useState<number[]>([16, 24, 32])
	const [isShowModal, setIsShowModal] = useState(false)

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

	async function handleDeleteNews(id: string) {
		await deleteNews(id, token || '')
		setIsShowModal(false)
	}

	return (
		<>
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
					<div className='mb-7 grid min-[940px]:grid-cols-1 min-[1840px]:grid-cols-2 gap-6'>
						<CreateNewsBtn />
						{news.map(item => (
							<div key={item._id} className='flex gap-x-1'>
								<NewsCard locale={locale} article={item} />
								{/* кнопки редагування та видалення */}
								<div className='flex flex-col gap-y-2 xl:gap-y-3 shrink-0 mt-auto py-1'>
									<Link
										className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-white border border-gr-2 hover:shadow-ms transform duration-300 transition-transform hover:scale-105 '
										href={`news/editor/${item._id}`}
									>
										<EditIcon />
									</Link>
									<button
										className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-sc-5 hover:shadow-ms transform duration-300 transition-transform hover:scale-105'
										onClick={() => {
											setIsShowModal(true)
										}}
									>
										<Trash className='w-4 h-4 xl:w-5 xl:h-5' />
									</button>
									{isShowModal && (
										<BaseModal
											isOpen={isShowModal}
											onClose={() => setIsShowModal(false)}
											title='Підтвердження видалення'
										>
											<ConfirmAdminComponent
												fncDelete={handleDeleteNews.bind(null, item._id)}
												fncEscape={() => setIsShowModal(false)}
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
						itemsPerPage={limit}
						currentPage={page}
						onPageChange={setPage}
					/>
				</div>
			</div>
		</>
	)
})
export default NewsSortAndPaginationComponent
