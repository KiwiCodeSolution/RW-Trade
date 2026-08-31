'use client'

import { Locale, OrderStatus } from '@/types/baseTypes'

import { ordersStore } from '@/store/OrderStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import QuantityProduct from '../userUI/QuantityProduct'

import OrderItemComponent from './OrderItem'
import { OrderSort, orderSortOptions } from '@/lib/sortOptions'

import { observer } from 'mobx-react-lite'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const orderLimits = [4, 8, 12]
const statusOptions: (OrderStatus | 'all')[] = [
	'all',
	'pending',
	'shipped',
	'delivered',
	'cancelled'
]

const OrderPageComponent = observer(({ pageName = 'all' }: { pageName: 'all' | 'history' }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const locale: Locale = 'uk'

	const { orders, isLoading, totalPages, limit, total } = ordersStore

	// 🔹 URL синхронізація
	const updateQuery = (params: Record<string, string>) => {
		const newParams = new URLSearchParams(searchParams.toString())
		Object.entries(params).forEach(([key, value]) => {
			if (value === '') newParams.delete(key)
			else newParams.set(key, value)
		})
		router.replace(`?${newParams.toString()}`)
	}

	// 🔹 fetch завжди беремо параметри з URL
	useEffect(() => {
		const pageParam = Number(searchParams.get('page')) || 1
		const limitParam = Number(searchParams.get('limit')) || 4
		const statusParam = (searchParams.get('status') as OrderStatus) || undefined
		const sortParam = (searchParams.get('sort') as OrderSort) || 'createdAt_DESC'

		// 🔹 fetch із параметрами з URL
		ordersStore.fetchOrders({
			page: pageParam,
			limit: limitParam,
			status: statusParam,
			sort: sortParam
		})
	}, [searchParams])

	const pageParam = Number(searchParams.get('page')) || 1
	const limitParam = Number(searchParams.get('limit')) || 4
	const statusParam = (searchParams.get('status') as OrderStatus) || undefined

	const titleButton = {
		all: 'Всі',
		pending: 'В очікуванні',
		shipped: 'Відправлені',
		delivered: 'Доставлені',
		cancelled: 'Скасовані'
	}

	return (
		<div className='flex flex-col justify-between gap-y-4 mt-2'>
			{/* 🔹 Фільтри та сортування */}

			{pageName === 'history' && (
				<div className='w-full grid grid-cols-5 gap-x-[2px] bg-primary rounded-lg h-[38px] p-[2px]'>
					{statusOptions.map((s, idx) => (
						<button
							key={s}
							className={`w-full ${(statusParam ?? 'all') === s ? 'bg-transparent text-white' : 'bg-white text-nav'} ${idx === 0 ? 'rounded-l-lg' : ''} ${idx === statusOptions.length - 1 ? 'rounded-r-lg' : ''} transition-colors duration-300 font-semibold flex items-center justify-center`}
							onClick={() => {
								updateQuery({ status: s === 'all' ? '' : s, page: '1' })
							}}
						>
							{titleButton[s]}
						</button>
					))}
				</div>
			)}

			<div className={`flex flex-wrap items-center justify-between gap-4 `}>
				<p className='font-bold'>Всього замовлень: {total}</p>

				<div className='flex items-center gap-4 flex-wrap'>
					<Sort<OrderSort>
						locale='uk'
						options={orderSortOptions}
						onChange={val => updateQuery({ sort: val, page: '1' })}
					/>

					<QuantityProduct
						locale={locale}
						limits={orderLimits}
						value={limitParam}
						onChangeQuantityValue={val =>
							updateQuery({ limit: String(val), page: '1' })
						}
					/>
				</div>
			</div>

			{/* 🔹 Контент */}
			{isLoading ? (
				<div className='flex flex-col gap-y-3 mt-3 max-h-[75vh] overflow-y-scroll pb-3'>
					{Array.from({ length: limitParam }).map((_, i) => (
						<div
							key={i}
							className='w-full min-h-[200px] py-2 flex flex-col gap-y-2 rounded-lg bg-gray-200 animate-pulse'
						/>
					))}
				</div>
			) : (
				<div className='flex flex-col gap-y-3 mt-3 max-h-[75vh] overflow-y-scroll pb-3'>
					{orders.map(order => (
						<OrderItemComponent order={order} key={order._id} />
					))}
				</div>
			)}

			{/* 🔹 Пагінація */}
			{totalPages > 1 && (
				<div className='mt-4'>
					<Pagination
						numberOfItems={total}
						itemsPerPage={limitParam}
						currentPage={pageParam}
						onPageChange={val => updateQuery({ page: String(val) })}
					/>
				</div>
			)}
		</div>
	)
})

export default OrderPageComponent
