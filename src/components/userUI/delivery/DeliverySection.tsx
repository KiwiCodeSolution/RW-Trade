'use client'

import { DeliveryInfo, DeliveryMethod } from '@/types/baseTypes'

import DeliverySelect from './DeliverySelect'
import { deliveryAdapters } from './delivery.adapters'
import { DeliveryCity, DeliveryWarehouse, NPAddressItem, NPWarehouseItem } from './delivery.types'

import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
	value: DeliveryInfo
	onChange: (val: DeliveryInfo) => void
}

export default function DeliverySection({ value, onChange }: Props) {
	// ----------------- STATE -----------------
	const [method, setMethod] = useState<DeliveryMethod>(value?.method ?? 'nova_poshta')

	const [warehousesError, setWarehousesError] = useState<string | null>(null)

	// City
	const [city, setCity] = useState<DeliveryCity | null>(null)
	const [cityInput, setCityInput] = useState(value?.city ?? '')
	const [cities, setCities] = useState<DeliveryCity[]>([])
	const [loadingCities, setLoadingCities] = useState(false)
	const [manualCitySelect, setManualCitySelect] = useState(false)

	// Warehouses
	const [warehouse, setWarehouse] = useState<DeliveryWarehouse | null>(null)
	const [warehouseInput, setWarehouseInput] = useState(value?.branch ?? '')
	const [warehouses, setWarehouses] = useState<DeliveryWarehouse[]>([])
	const [loadingWarehouses, setLoadingWarehouses] = useState(false)
	const [showWarehouses, setShowWarehouses] = useState(false)

	// Courier fields
	const [address, setAddress] = useState(value?.address ?? '')
	const [comment, setComment] = useState(value?.comment ?? '')

	// RAW DATA
	const [raw] = useState<{
		city?: NPAddressItem
		warehouse?: NPWarehouseItem
	} | null>(null)

	const adapter = deliveryAdapters[method]

	// ----------------- SYNC TO PARENT -----------------
	const changeRef = useRef(onChange)
	useEffect(() => {
		changeRef.current = onChange
	}, [onChange])

	useEffect(() => {
		const payload: DeliveryInfo = {
			method,
			city: city?.name || '',
			branch: warehouse?.number || '', // branch, а не warehouse
			address,
			comment,
			novaposhta:
				method === 'nova_poshta'
					? (city?.raw as Record<string, unknown> | undefined)
					: undefined,
			ukrposhta:
				method === 'Ukrposhta'
					? (city?.raw as Record<string, unknown> | undefined)
					: undefined,
			meest:
				method === 'Meest' ? (city?.raw as Record<string, unknown> | undefined) : undefined,
			payer: city ? 'recipient' : undefined
		}

		changeRef.current(payload)
	}, [method, city, warehouse, address, comment])
	// ----------------- FETCH CITIES -----------------
	useEffect(() => {
		if (!cityInput || manualCitySelect) {
			Promise.resolve().then(() => setCities([]))
			return
		}

		let active = true
		Promise.resolve().then(() => setLoadingCities(true))

		const run = async () => {
			const list = await adapter.searchCities(cityInput)
			if (!active) return

			Promise.resolve().then(() => {
				setCities(list)
				setLoadingCities(false)
			})
		}

		const t = setTimeout(run, 300)
		return () => {
			active = false
			clearTimeout(t)
		}
	}, [cityInput, adapter, manualCitySelect])

	// ----------------- FETCH WAREHOUSES -----------------
	useEffect(() => {
		if (!city || method === 'courier') {
			Promise.resolve().then(() => {
				setWarehouses([])
				setWarehouse(null)
				setLoadingWarehouses(false)
				setWarehousesError(null)
			})
			return
		}

		let active = true
		Promise.resolve().then(() => {
			setLoadingWarehouses(true)
			setWarehousesError(null)
		})

		const run = async () => {
			try {
				const list = await adapter.getWarehouses(city)
				if (!active) return

				Promise.resolve().then(() => {
					if (list.length === 0) {
						setWarehousesError(
							'Немає доступних відділень або служба тимчасово недоступна'
						)
					}
					setWarehouses(list)
					setLoadingWarehouses(false)
				})
			} catch (err) {
				console.error('WAREHOUSE FETCH ERROR:', err)
				if (!active) return
				Promise.resolve().then(() => {
					setWarehouses([])
					setLoadingWarehouses(false)
					setWarehousesError('Нова Пошта тимчасово недоступна')
				})
			}
		}

		run()
		return () => {
			active = false
		}
	}, [city, method, adapter])

	// ----------------- FILTER -----------------
	const filteredWarehouses = useMemo(() => {
		if (!warehouseInput.trim()) return warehouses
		const q = warehouseInput.toLowerCase()
		return warehouses.filter(
			w =>
				w.description.toLowerCase().includes(q) ||
				w.short.toLowerCase().includes(q) ||
				w.number.toLowerCase().startsWith(q)
		)
	}, [warehouseInput, warehouses])

	// ----------------- SERVICE OPTIONS -----------------
	const servicesList = [
		{
			id: 'nova_poshta',
			title: { uk: 'Нова пошта', en: 'Nova Poshta' },
			img: '/images/delivery/np.png'
		},
		{
			id: 'Ukrposhta',
			title: { uk: 'Укрпошта', en: 'Ukrposhta' },
			img: '/images/delivery/up.png'
		},
		{
			id: 'Meest',
			title: { uk: 'Meest-express', en: 'Meest-express' },
			img: '/images/delivery/meest.png'
		}
	]

	// ----------------- RENDER -----------------
	return (
		<div className='flex flex-col gap-2'>
			<DeliverySelect
				options={servicesList}
				value={method}
				onChange={id => {
					setMethod(id as DeliveryMethod)
					setCity(null)
					setWarehouse(null)
					setCityInput('')
					setWarehouseInput('')
					setManualCitySelect(false)
					setShowWarehouses(false)
				}}
			/>

			{/* CITY INPUT */}
			<div className='flex flex-col gap-y-1'>
				<div className='flex flex-col gap-2 w-full'>
					<label className='font-semibold' htmlFor='city'>
						Місто
					</label>
					<input
						type='text'
						className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
						value={cityInput}
						id='city'
						placeholder='Почніть вводити місто'
						autoComplete='new-password'
						onChange={e => {
							setCityInput(e.target.value)
							setCity({
								name: e.target.value,
								ref: e.target.value,
								full: e.target.value,
								short: e.target.value, // <- обов'язкове!
								raw: {
									Ref: e.target.value,
									Present: e.target.value,
									MainDescription: e.target.value,
									Area: '',
									Region: ''
								}
							})

							setManualCitySelect(false)
							setWarehouse(null)
							setWarehouseInput('')
							setShowWarehouses(false)
						}}
					/>
					{cities.length > 0 && (
						<div className='border rounded-lg mt-1 max-h-[240px] w-full bg-bg-light overflow-y-auto absolute z-10'>
							{cities.map(c => (
								<button
									key={c.ref}
									className='px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm'
									onClick={() => {
										setCity(c)
										setCityInput(c.full)
										setCities([])
										setManualCitySelect(true)
									}}
								>
									{c.full}
								</button>
							))}
						</div>
					)}
				</div>

				{/* WAREHOUSE INPUT */}
				{city && (
					<div className='flex flex-col gap-2 w-full relative'>
						<label className='font-semibold' htmlFor='warehouse'>
							Відділення
						</label>
						<div className='relative'>
							<input
								type='text'
								className='h-8 border border-gr-2 rounded-lg px-3 w-full outline-none text-base'
								autoComplete='new-password'
								value={warehouseInput}
								id='warehouse'
								placeholder='Введіть номер або адресу'
								onChange={e => {
									setWarehouseInput(e.target.value)
									setWarehouse(null)
									setShowWarehouses(e.target.value.trim().length > 0) // показуємо тільки якщо щось ввели
								}}
							/>
							{showWarehouses && filteredWarehouses.length > 0 && (
								<div className='border rounded-lg mt-1 max-h-[90px] w-full bg-bg-light overflow-y-auto absolute bottom-[-90px] left-0 z-10 flex flex-col'>
									{filteredWarehouses.map(w => (
										<button
											type='button'
											key={w.ref}
											className='px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-left'
											onClick={() => {
												setWarehouse(w)
												setWarehouseInput(w.description)
												setShowWarehouses(false)
												setAddress(w.description)
											}}
										>
											<b>Відділення №{w.number}</b> — {w.short}
										</button>
									))}
								</div>
							)}
						</div>
						{warehousesError && (
							<div className='text-sm text-red-600 mt-1'>{warehousesError}</div>
						)}
						{showWarehouses &&
							!loadingWarehouses &&
							filteredWarehouses.length === 0 && (
								<div className='text-sm text-gray-600'>Немає результатів</div>
							)}
					</div>
				)}

				{/* COURIER */}
				{city && method === 'courier' && (
					<div className='flex flex-col gap-2'>
						<label className='font-semibold' htmlFor='address'>
							Адреса доставки
						</label>
						<input
							type='text'
							className='h-8 border border-gr-2 outline-none text-base rounded-lg px-3'
							value={address}
							id='address'
							placeholder='Вулиця, будинок, квартира'
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
