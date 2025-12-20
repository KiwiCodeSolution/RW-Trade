'use client'

import { Locale, OrderStatus } from '@/types/baseTypes'

import { ordersStore } from '@/store/OrderStore'

import Pagination from '../commonUI/Pagination'
import Sort from '../commonUI/Sort'
import Spinner from '../commonUI/loader/Spinner'
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

const OrderPageComponent = observer(() => {
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

	return (
		<div className='flex flex-col justify-between gap-y-4 mt-2'>
			{/* 🔹 Фільтри та сортування */}
			<div className='flex flex-wrap items-center justify-between gap-4'>
				<div className='flex items-center gap-2 flex-wrap'>
					<span className='font-bold'>Всього замовлень: {total}</span>
					{statusOptions.map(s => (
						<button
							key={s}
							className={`px-3 py-1 rounded font-medium ${
								(statusParam ?? 'all') === s
									? 'bg-link-blue text-white'
									: 'bg-gray-100 text-gray-700'
							}`}
							onClick={() => {
								updateQuery({ status: s === 'all' ? '' : s, page: '1' })
							}}
						>
							{s === 'all' ? 'Всі' : s}
						</button>
					))}
				</div>

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
					<Spinner />
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
