'use client'

import { Trash } from '@/assets/icons'

import { servicesList } from '@/helpers/deliverys'

import { Order } from '@/types/baseTypes'

import { OrderItem } from '@/store/CartStore'

import Image from 'next/image'
import { useState } from 'react'

type OrderItemProps = {
	order: Order
	token?: string
}

const OrderItemComponent = ({ order, token }: OrderItemProps) => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	const status = order.status || 'pending'

	const priceOrderItem = (price: OrderItem['finalPrice'], quantity: OrderItem['quantity']) =>
		price * quantity

	const formatDate = (isoString: string) => {
		const date = new Date(isoString)
		return new Intl.DateTimeFormat('uk-UA', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date)
	}

	const formatPrice = (value: number) => {
		return new Intl.NumberFormat('uk-UA', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(value)
	}

	const handleDeleteOrder = () => {
		const confirmDelete = confirm('Ви впевнені, що хочете видалити це замовлення?')
		if (confirmDelete) {
			// Викликати API для видалення замовлення
		}
	}

	const delivery = servicesList.find(s => s.id === order.delivery.method)!

	const place = order.delivery.method !== 'Ukrposhta' ? 'відділення # ' : ''
	const address =
		order.delivery.method !== 'nova_poshta'
			? place +
				order.delivery.branch +
				', ' +
				order.delivery.city +
				', ' +
				order.delivery.address
			: order.delivery.address

	return (
		<article
			id={order._id}
			className={`w-full py-2 flex flex-col gap-y-2 rounded-lg bg-[#ECEFF3] transition-all duration-500`}
		>
			<p id={`title-${order._id}`} className={`text-center text-xl`}>
				Замовлення №{order.orderNumber}
			</p>

			{/* Верхня таблиця */}
			<div className='w-full rounded-lg border border-gr-2 overflow-hidden'>
				<table className='w-full text-sm text-center text-[#133566] border-collapse'>
					<thead className='bg-sc-6 border-b border-gr-2'>
						<tr className='divide-x divide-y divide-gr-2'>
							<th className='px-4 py-2 w-[144px]'>Замовник</th>
							<th className='px-4 py-2 w-[144px]'>Дата замовлення</th>
							<th className='px-4 py-2 w-[144px]'>Телефон</th>
							<th className='px-4 py-2 w-[135px]'>Сума замовлення</th>
							<th className='px-4 py-2 w-[160px]'>Адреса доставки</th>
							<th className='px-4 py-2 w-[150px]'>Статус</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gr-2 text-left'>
						<tr className='bg-sc-6 divide-x divide-gr-2'>
							<td className='px-4 py-2'>{order.fullName}</td>
							<td className='px-4 py-2'>{formatDate(order.createdAt!)}</td>
							<td className='px-4 py-2'>{order.phone}</td>
							<td className='px-4 py-2'>{formatPrice(order.totalPrice)}</td>
							<td className='px-4 py-2'>
								<div className='flex flex-col'>
									<div className='flex items-center gap-x-1'>
										<Image
											src={delivery.img}
											alt={delivery.title.uk || 'Delivery Icon'}
											width={24}
											height={24}
										/>
										<p>{delivery.title.uk}</p>
									</div>
									<p>{address}</p>
								</div>
							</td>
							<td className='px-4 py-2'>
								<div className='flex items-center gap-1'>
									<span
										className={`w-3 h-3 rounded-full ${
											status === 'pending'
												? 'bg-green-500'
												: status === 'shipped'
													? 'bg-yellow-500'
													: status === 'delivered'
														? 'bg-blue-500'
														: status === 'cancelled'
															? 'bg-red-500'
															: 'bg-gray-500'
										}`}
									></span>
									<span>{status === 'pending' ? 'Нове' : status}</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{order.comment && (
				<div className='w-full rounded-lg border border-gr-2 overflow-hidden bg-sc-6 py-3 px-2'>
					<p className=''>
						{' '}
						<span className='font-semibold '>Коментар:</span> {order.comment}
					</p>
				</div>
			)}

			<div
				className={`transition-all duration-500 ease-in-out overflow-hidden ${
					isShowDetails ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className='w-full mt-2 rounded-lg border border-gr-2 overflow-hidden'>
					<table className='w-full text-sm text-left border-collapse'>
						<thead className='bg-sc-6 border-b border-gr-2'>
							<tr className='divide-x divide-gr-2'>
								<th className='px-4 py-2 w-3/5'>Назва</th>
								<th className='px-4 py-2 w-1/6'>Ціна</th>
								<th className='px-4 py-2 w-1/6'>Кількість</th>
								<th className='px-4 py-2 w-1/5'>Сума</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gr-2'>
							{order.items.map(item => (
								<tr key={item.productId} className='divide-x divide-gr-2'>
									<td className='px-4 py-2'>
										{typeof item.productName === 'string'
											? item.productName
											: item.productName.uk ||
												item.productName.en ||
												'No name'}
									</td>
									<td className='px-4 py-2'>{formatPrice(item.finalPrice)}</td>
									<td className='px-4 py-2'>{item.quantity}</td>
									<td className='px-4 py-2'>
										{formatPrice(
											priceOrderItem(item.finalPrice, item.quantity)
										)}
									</td>
								</tr>
							))}

							{/* Підсумковий рядок */}
							<tr className='font-semibold bg-sc-6 divide-x divide-gr-2'>
								<td className='px-4 py-2 text-left' colSpan={2}>
									Всього
								</td>
								<td className='px-4 py-2'>
									{order.items.reduce((acc, i) => acc + i.quantity, 0)}
								</td>
								<td className='px-4 py-2'>{formatPrice(order.totalPrice)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{isShowDetails && (
				<button
					onClick={handleDeleteOrder}
					className='min-w-[174px] h-9 rounded-[32px] bg-sc-5 flex items-center justify-center gap-x-1 py-2 px-4 ml-auto mt-2 mr-1 hover:shadow-lg transition-all duration-300'
				>
					<Trash className='w-4 h-4' />
					<p className='text-white font-semibold'>Видалити замовлення</p>
				</button>
			)}

			<button
				className='w-full text-gray-400 hover:text-gray-700'
				onClick={() => setIsShowDetails(!isShowDetails)}
			>
				{isShowDetails ? 'Сховати' : 'Деталі'}
			</button>
		</article>
	)
}

export default OrderItemComponent
