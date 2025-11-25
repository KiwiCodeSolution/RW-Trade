'use client'

import { BASE_URL } from '@/utils/config'

import { DeliveryInfo, Locale, OrderForm } from '@/types/baseTypes'

import { OrderItem, cartStore } from '@/store/CartStore'

import DeliverySection from './delivery/DeliverySection'
import PayMethodSection from './delivery/PayMethodSection'
import { DeliveryData } from './delivery/delivery.types'

import { observer } from 'mobx-react-lite'
import { useLocale } from 'next-intl'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

const CartStepTwo = observer(() => {
	const locale = useLocale() as Locale
	const { items, totalSum } = cartStore

	const { control, handleSubmit, register } = useForm<OrderForm & { delivery: DeliveryData }>({
		defaultValues: {
			fullName: '',
			phone: '',
			comment: '',
			paymentMethod: 'card_privatbank',
			delivery: {
				method: 'nova_poshta',
				city: undefined,
				warehouse: undefined,
				address: '',
				comment: '',
				raw: { city: undefined, warehouse: undefined }
			}
		}
	})

	const mapDeliveryDataToBackend = (delivery: DeliveryData): DeliveryInfo => {
		const cityName =
			typeof delivery.city === 'string' ? delivery.city : delivery.city?.name || ''
		const branchNumber = delivery.warehouse?.number || ''
		const rawCity = delivery.city?.raw
		const rawWarehouse = delivery.warehouse?.raw

		return {
			method: delivery.method,
			city: cityName,
			branch: branchNumber,
			address: delivery.address,
			comment: delivery.comment,
			novaposhta:
				delivery.method === 'nova_poshta'
					? {
							city: rawCity as unknown as Record<string, unknown>,
							warehouse: rawWarehouse as unknown as Record<string, unknown>
						}
					: undefined,
			ukrposhta:
				delivery.method === 'Ukrposhta'
					? {
							city: rawCity as unknown as Record<string, unknown>,
							warehouse: rawWarehouse as unknown as Record<string, unknown>
						}
					: undefined,
			meest:
				delivery.method === 'Meest'
					? {
							city: rawCity as unknown as Record<string, unknown>,
							warehouse: rawWarehouse as unknown as Record<string, unknown>
						}
					: undefined,
			payer: cityName ? 'recipient' : undefined
		}
	}

	const onSubmit: SubmitHandler<OrderForm & { delivery: DeliveryData }> = async data => {
		const deliveryForBackend = mapDeliveryDataToBackend(data.delivery)

		function prepareOrderItems(items: OrderItem[]) {
			return items.map(i => ({
				productId: i.productId,
				productName: i.productName['uk'] || i.productName['en'] || 'No name',
				quantity: i.quantity,
				price: i.finalPrice,
				categoryId: i.categoryId
			}))
		}

		// підготовані items для бекенду
		const preparedItems = prepareOrderItems(cartStore.items)

		const payload = {
			fullName: data.fullName,
			phone: data.phone,
			delivery: deliveryForBackend,
			paymentMethod: data.paymentMethod,
			comment: data.comment,
			items: preparedItems,
			totalPrice: totalSum // або тоJS(totalSum)
		}

		console.log('Order payload for backend:', payload)

		try {
			const response = await fetch(`${BASE_URL}/orders`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			})

			if (!response.ok) {
				const errorData = await response.json()
				console.error('Error response from server:', errorData)
				return
			}

			const responseData = await response.json()
			console.log('Order created successfully:', responseData)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='min-h-[500px]' autoComplete='off'>
			<div className='flex flex-col gap-y-2 min-h-[450px]'>
				{/* FULL NAME */}
				<div className='flex flex-col gap-1 w-full'>
					<label className='font-semibold' htmlFor='fullName'>
						Прізвище, ім’я та по батькові
					</label>
					<input
						type='text'
						id='fullName'
						placeholder='Шевченко Тарас Григорович'
						autoComplete='new-password'
						className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
						{...register('fullName')}
					/>
				</div>

				{/* PHONE */}
				<div className='flex flex-col gap-1 w-full'>
					<label className='font-semibold' htmlFor='phone'>
						Телефон
					</label>
					<input
						type='text'
						id='phone'
						placeholder='+38 099 999 99 99'
						autoComplete='new-password'
						className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
						{...register('phone')}
					/>
				</div>

				{/* PAY METHOD */}
				<div className='flex flex-col gap-y-1'>
					<p className='font-semibold'>Спосіб оплати</p>
					<Controller
						name='paymentMethod'
						control={control}
						render={({ field }) => (
							<PayMethodSection value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>

				{/* DELIVERY SECTION */}
				<div className='flex flex-col gap-y-1'>
					<p className='font-semibold'>Перевізник</p>
					<Controller
						name='delivery'
						control={control}
						render={({ field }) => (
							<DeliverySection value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>
			</div>

			<button
				type='submit'
				className='mt-4 px-4 py-2 bg-primary text-white rounded-lg mx-auto block mb-auto'
			>
				Підтвердити
			</button>
		</form>
	)
})

export default CartStepTwo
