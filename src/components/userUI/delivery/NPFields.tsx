'use client'

import { DeliveryCity, DeliveryInfo, DeliveryWarehouse } from '@/types/baseTypes'

import { deliveryAdapters } from './delivery.adapters'

import { useEffect, useMemo, useRef, useState } from 'react'

interface NPFieldsProps {
	value: DeliveryInfo
	onChange: (val: DeliveryInfo) => void
}

export default function NPFields({ value, onChange }: NPFieldsProps) {
	// ----------------- STATE -----------------
	const [city, setCity] = useState<DeliveryCity | null>(null)
	const [cityInput, setCityInput] = useState(value?.city ?? '')
	const [cities, setCities] = useState<DeliveryCity[]>([])
	const [loadingCities, setLoadingCities] = useState(false)
	const [manualCitySelect, setManualCitySelect] = useState(false)

	const [warehouse, setWarehouse] = useState<DeliveryWarehouse | null>(null)
	const [warehouseInput, setWarehouseInput] = useState(value?.branch ?? '')
	const [warehouses, setWarehouses] = useState<DeliveryWarehouse[]>([])
	const [loadingWarehouses, setLoadingWarehouses] = useState(false)
	const [showWarehouses, setShowWarehouses] = useState(false)
	const [warehousesError, setWarehousesError] = useState<string | null>(null)

	const [address, setAddress] = useState(value?.address ?? '')
	const [comment, setComment] = useState(value?.comment ?? '')

	const adapter = deliveryAdapters['nova_poshta']

	// ----------------- SYNC TO PARENT -----------------
	const changeRef = useRef(onChange)
	useEffect(() => {
		changeRef.current = onChange
	}, [onChange])

	useEffect(() => {
		changeRef.current({
			...value,
			method: 'nova_poshta',
			city: city?.name ?? '',
			branch: warehouse?.number ?? '',
			address,
			comment,
			novaposhta: city?.raw as Record<string, unknown> | undefined,
			payer: city ? 'recipient' : undefined
		})
	}, [city, warehouse, address, comment])

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
		if (!city) {
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
	}, [city, adapter])

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

	// ----------------- RENDER -----------------
	return (
		<div className='flex flex-col gap-2'>
			{/* CITY INPUT */}
			<div className='flex flex-col gap-2 w-full relative'>
				<label className='font-semibold' htmlFor='city'>
					Місто
				</label>
				<div className='relative'>
					<input
						type='text'
						id='city'
						className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
						value={cityInput}
						placeholder='Почніть вводити місто'
						autoComplete='new-password'
						onChange={e => {
							setCityInput(e.target.value)
							setManualCitySelect(false)
							setWarehouse(null)
							setWarehouseInput('')
							setShowWarehouses(false)
						}}
					/>
					{cities.length > 0 && (
						<div className='border rounded-lg mt-1 max-h-[240px] w-full bg-bg-light overflow-y-auto absolute z-10 flex flex-col gap-y-0.5'>
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
							id='warehouse'
							className='h-8 border border-gr-2 rounded-lg px-3 w-full outline-none text-base'
							autoComplete='new-password'
							value={warehouseInput}
							placeholder='Введіть номер або адресу'
							onChange={e => {
								setWarehouseInput(e.target.value)
								setWarehouse(null)
								setShowWarehouses(e.target.value.trim().length > 0)
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
					{showWarehouses && !loadingWarehouses && filteredWarehouses.length === 0 && (
						<div className='text-sm text-gray-600'>Немає результатів</div>
					)}
				</div>
			)}
		</div>
	)
}
