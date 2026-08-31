'use client'

import { Arrow, Trash } from '@/assets/icons'

import { servicesList } from '@/helpers/deliverys'

import { Order, OrderStatus } from '@/types/baseTypes'

import { OrderItem } from '@/store/CartStore'
import { ordersStore } from '@/store/OrderStore'

import BaseModal from '../commonUI/modal/BaseModal'
import ConfirmAdminComponent from '../commonUI/modal/ConfirmAdminComponent'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useState } from 'react'

type OrderItemProps = {
	order: Order
}

const OrderItemComponent = observer(({ order }: OrderItemProps) => {
	const [isShowDetails, setIsShowDetails] = useState(false)
	const [isStatusOpen, setIsStatusOpen] = useState(false)
	const { deleteOrder, updateOrderStatus } = ordersStore
	const status = order.status || 'pending'

	const [isShowModal, setIsShowModal] = useState(false)

	const orderStatuses: { label: string; value: OrderStatus; color: string }[] = [
		{ label: 'Нове', value: 'pending', color: 'bg-green-500 text-white' },
		{ label: 'Відправлено', value: 'shipped', color: 'bg-yellow-500 text-black' },
		{ label: 'Доставлено', value: 'delivered', color: 'bg-blue-500 text-white' },
		{ label: 'Скасовано', value: 'cancelled', color: 'bg-red-500 text-white' }
	]

	const currentStatus = orderStatuses.find(s => s.value === status) || orderStatuses[0]

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

	async function handleDeleteOrder(id: string) {
		await deleteOrder(id)
		setIsShowModal(false)
	}

	async function handleChangeStatus(newStatus: OrderStatus) {
		setIsStatusOpen(false)

		await updateOrderStatus(order._id, newStatus)
	}

	const delivery = servicesList.find(s => s.id === order.delivery.method)!

	const place = order.delivery.method !== 'ukrposhta' ? 'відділення # ' : ''
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
			<div className='w-full rounded-lg border border-gr-2 '>
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

							<td className='px-4 py-2 '>
								<div className='relative'>
									<button
										onClick={() => setIsStatusOpen(prev => !prev)}
										className={`w-[170px] h-7 px-1 rounded-lg flex items-center justify-between gap-2 transition`}
									>
										<div className='flex items-center gap-x-1'>
											<span>{currentStatus.label}</span>
											<span
												className={`w-2 h-2 rounded-full ${status === 'pending' ? 'bg-green-500' : status === 'shipped' ? 'bg-bronze' : status === 'delivered' ? 'bg-primary' : status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'}`}
											></span>
										</div>
										<div className='w-6 h-6 rounded-full flex items-center justify-center bg-white rating-shadow btn-shadow'>
											<Arrow
												variant='gradient'
												className={`${isStatusOpen ? 'rotate-180' : ''} transition`}
											/>
										</div>
									</button>

									{isStatusOpen && (
										<div className=' bg-sc-6 absolute top-[100%] left-0 w-[170px] rounded-lg shadow-lg z-20'>
											{orderStatuses.map(s => (
												<button
													onClick={() => handleChangeStatus(s.value)}
													key={s.value}
													className={`w-full text-left rounded-lg px-4 py-2 flex items-center gap-x-1 hover:bg-gray-100 ${
														status === s.value ? 'font-bold' : ''
													}`}
												>
													{s.label}
													<span
														className={`w-2 h-2 rounded-full ${s.value === 'pending' ? 'bg-green-500' : s.value === 'shipped' ? 'bg-bronze' : s.value === 'delivered' ? 'bg-primary' : s.value === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'}`}
													></span>
												</button>
											))}
										</div>
									)}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{order.comment && (
				<div className='w-full rounded-lg border border-gr-2 overflow-hidden bg-sc-6 py-3 px-2'>
					<p className=''>
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
					onClick={() => setIsShowModal(true)}
					className='min-w-[174px] h-9 rounded-[32px] bg-sc-5 flex items-center justify-center gap-x-1 py-2 px-4 ml-auto mt-2 mr-1 hover:shadow-lg transition-all duration-300'
				>
					<Trash className='w-4 h-4' />
					<p className='text-white font-semibold'>Видалити замовлення</p>
				</button>
			)}
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Підтвердження видалення'
				>
					<ConfirmAdminComponent
						fncDelete={handleDeleteOrder.bind(null, order._id)}
						fncEscape={() => setIsShowModal(false)}
						text='замовлення'
					/>
				</BaseModal>
			)}

			<button
				className='w-full text-gray-400 hover:text-gray-700'
				onClick={() => setIsShowDetails(!isShowDetails)}
			>
				{isShowDetails ? 'Сховати' : 'Деталі'}
			</button>
		</article>
	)
})

export default OrderItemComponent
