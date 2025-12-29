'use client'

import { DeliveryData, DeliveryInfo, Locale, OrderForm } from '@/types/baseTypes'

import { OrderItem, cartStore } from '@/store/CartStore'

import DeliverySection from './delivery/DeliverySection'
import PayMethodSection from './delivery/PayMethodSection'

import { observer } from 'mobx-react-lite'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

const CartStepTwo = observer(
	({
		setOrderSuccess,
		locale
	}: {
		setOrderSuccess: (value: boolean) => void
		locale: Locale
	}) => {
		const { totalSum } = cartStore

		const {
			register,
			control,
			handleSubmit,
			formState: { errors }
		} = useForm<OrderForm & { delivery: DeliveryData }>({
			defaultValues: {
				fullName: '',
				phone: '',
				comment: '',
				paymentMethod: 'card_privatbank',
				delivery: {
					method: 'nova_poshta',
					city: undefined,
					branch: undefined,
					address: '',
					comment: '',
					payer: 'recipient',
					raw: { city: undefined, warehouse: undefined }
				}
			}
		})

		const mapDeliveryDataToBackend = (delivery: DeliveryData): DeliveryInfo => {
			const cityName =
				typeof delivery.city === 'string' ? delivery.city : delivery.city?.name || ''

			const branchNumber =
				typeof delivery.branch === 'string'
					? delivery.branch
					: delivery.branch?.number || ''

			const rawCity = delivery.city?.raw
			const rawWarehouse = delivery.branch?.raw

			const novaposhtaBlock =
				delivery.method === 'nova_poshta'
					? {
							ServiceType: 'Warehouse',
							payer: 'recipient',
							area: rawCity?.Area || '',
							region: rawCity?.Region || rawCity?.ParentRegionCode || '',
							cityNameFormat: 'full',
							WarehouseNumber: branchNumber,
							Street: rawWarehouse?.ShortAddress || '',
							BuildingNumber: '',
							Flat: '',
							ttn: ''
						}
					: undefined

			return {
				method: delivery.method,
				city: cityName,
				branch: branchNumber,
				address: delivery.address,
				comment: delivery.comment,

				novaposhta: novaposhtaBlock,
				ukrposhta: undefined,
				meest: undefined,
				payer: cityName ? 'recipient' : undefined
			}
		}

		function getProductName(name: OrderItem['productName']): string {
			if (typeof name === 'string') return name
			return name?.uk || name?.en || 'No name'
		}

		const onSubmit: SubmitHandler<OrderForm & { delivery: DeliveryData }> = async data => {
			const deliveryForBackend = mapDeliveryDataToBackend(data.delivery)

			const preparedItems = cartStore.items.map(i => ({
				productId: i.productId,
				productName: getProductName(i.productName),
				quantity: i.quantity,
				finalPrice: i.finalPrice,
				categoryId: i.categoryId,
				subCategoryId: i.subCategoryId ?? undefined
			}))

			const payload = {
				fullName: data.fullName,
				phone: data.phone,
				delivery: deliveryForBackend,
				paymentMethod: data.paymentMethod,
				comment: data.comment,
				items: preparedItems,
				totalPrice: totalSum
			}

			const result = await cartStore.createOrder(payload)

			if (result.success) {
				setOrderSuccess(true)
				console.log('Order created successfully:', result.data)
				// тут можеш зробити редірект чи зміну стану
			} else {
				console.log('Failed to create order:', result.error)
			}
		}

		return (
			<form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto' autoComplete='off'>
				<div className='flex flex-col gap-y-2 mb-3'>
					{/* FULL NAME */}
					<div className='flex flex-col gap-1 w-full relative'>
						<label className='font-semibold' htmlFor='fullName'>
							{locale === 'uk' ? 'Прізвище, ім’я та по батькові' : 'Full name'}
						</label>
						<input
							type='text'
							id='fullName'
							placeholder='Шевченко Тарас Григорович'
							autoComplete='new-password'
							className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
							{...register('fullName', {
								required: locale === 'uk' ? 'Вкажіть ПІБ' : 'Enter full name'
							})}
						/>
						{errors.fullName && (
							<div className='text-sm text-red-600 absolute top-full italic right-0'>
								{errors.fullName.message}
							</div>
						)}
					</div>

					{/* PHONE */}
					<div className='flex flex-col gap-1 w-full relative'>
						<label className='font-semibold' htmlFor='phone'>
							{locale === 'uk' ? 'Телефон' : 'Phone'}
						</label>
						<input
							type='text'
							id='phone'
							placeholder='+38 099 999 99 99'
							autoComplete='new-password'
							className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
							{...register('phone', {
								required: locale === 'uk' ? 'Вкажіть телефон' : 'Enter phone'
							})}
						/>
						{errors.phone && (
							<div className='text-sm text-red-600 absolute top-full italic right-0'>
								{errors.phone.message}
							</div>
						)}
					</div>

					{/* PAY METHOD */}
					<div className='flex flex-col gap-y-1'>
						<p className='font-semibold'>
							{locale === 'uk' ? 'Спосіб оплати' : 'Payment method'}
						</p>
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
						<p className='font-semibold'>{locale === 'uk' ? 'Доставка' : 'Delivery'}</p>
						<Controller
							name='delivery'
							control={control}
							render={({ field }) => (
								<DeliverySection value={field.value} onChange={field.onChange} />
							)}
							rules={{
								validate: d => {
									if (!d.city)
										return locale === 'uk' ? 'Оберіть місто' : 'Select city'
									if (!d.branch)
										return locale === 'uk'
											? 'Оберіть відділення'
											: 'Select branch'
									return true
								}
							}}
						/>
					</div>
				</div>

				{/* COMMENT */}
				<div className='flex flex-col gap-1 w-full relative'>
					<label className='font-semibold' htmlFor='comment'>
						{locale === 'uk' ? 'Коментар' : 'Comment'}
					</label>
					<textarea
						id='comment'
						placeholder={locale === 'uk' ? 'Вкажіть коментар' : 'Enter comment'}
						className='w-full border border-gr-2 rounded-lg px-3 py-2 outline-none text-base resize-none'
						{...register('comment')}
					/>
				</div>

				<button
					type='submit'
					className='mt-4 px-4 py-2 bg-primary text-white rounded-lg mx-auto block mb-auto'
				>
					{locale === 'uk' ? 'Замовити' : 'Order'}
				</button>
			</form>
		)
	}
)

export default CartStepTwo
