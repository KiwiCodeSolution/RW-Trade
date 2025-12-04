'use client'

import { DeliveryInfo } from '@/types/baseTypes'

import offices from '@/data/ukr_post.json'

import { useEffect, useMemo, useRef, useState } from 'react'

interface PostOffice {
	zip?: string
	name: string
	region: string
	city: string
	address: string
}

interface Props {
	value: DeliveryInfo
	onChange: (val: DeliveryInfo) => void
}

export default function UkrPoshtaFields({ value, onChange }: Props) {
	const [searchByZip, setSearchByZip] = useState(false)
	const [input, setInput] = useState(value?.branch || '')
	const [selected, setSelected] = useState<PostOffice | null>(null)
	const [address, setAddress] = useState(value?.address ?? '')

	const changeRef = useRef(onChange)
	useEffect(() => {
		changeRef.current = onChange
	}, [onChange])

	useEffect(() => {
		// формуємо об'єкт delivery з усіма полями для SalesDrive
		const ukrposhtaObj = selected
			? {
					ServiceType: 'Warehouse', // або "Doors" якщо знадобиться
					payer: 'recipient',
					type: 'standard', // або express
					city: selected.city,
					WarehouseNumber: selected.zip || '',
					Street: selected.address,
					BuildingNumber: '',
					Flat: '',
					ttn: '',
					Name: selected.name,
					Region: selected.region
				}
			: undefined

		changeRef.current({
			method: 'Ukrposhta',
			city: selected?.city || '',
			branch: selected?.zip || '',
			address: address || selected?.address || '',

			ukrposhta: ukrposhtaObj,
			payer: selected?.city ? 'recipient' : undefined
		})
	}, [selected, address])

	// ----------------- DEBOUNCE INPUT -----------------
	const [debouncedInput, setDebouncedInput] = useState(input)
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedInput(input), 300)
		return () => clearTimeout(handler)
	}, [input])

	// ----------------- FILTER -----------------
	const filteredResults = useMemo(() => {
		if (!debouncedInput.trim()) return []
		const q = debouncedInput.toLowerCase()

		return offices
			.filter(o =>
				searchByZip
					? (o.zip?.startsWith(debouncedInput) ?? false)
					: `${o.name} ${o.city} ${o.address} ${o.region}`.toLowerCase().includes(q)
			)
			.slice(0, 50)
	}, [debouncedInput, searchByZip])

	const handleSelect = (office: PostOffice) => {
		setSelected(office)
		// build input string safely if zip is missing
		const zipPart = office.zip ? `${office.zip}, ` : ''
		setInput(`${zipPart}${office.city}, ${office.address}, ${office.name}`)
		setDebouncedInput('')
		setAddress(office.address)
	}

	return (
		<div className='flex flex-col gap-2 w-full relative'>
			{/* CHECKBOX */}
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					id='search-by-zip'
					checked={searchByZip}
					onChange={e => {
						setSearchByZip(e.target.checked)
						setInput('')
						setSelected(null)
					}}
				/>
				<label htmlFor='search-by-zip'>Шукати за індексом</label>
			</div>

			{/* INPUT */}
			<input
				type='text'
				className='w-full h-8 border border-gr-2 rounded-lg px-3 outline-none text-base'
				placeholder={searchByZip ? 'Введіть індекс' : 'Введіть адресу або назву відділення'}
				value={input}
				autoComplete='new-password'
				onChange={e => {
					setInput(e.target.value)
					setSelected(null)
				}}
			/>

			{/* RESULTS DROPDOWN */}
			{filteredResults.length > 0 && (
				<div className='absolute top-[50px] left-0 z-10 w-full max-h-[150px] overflow-y-auto border bg-bg-light rounded-lg'>
					{filteredResults.map((r, index) => (
						<button
							key={`${r.zip ?? r.name}-${r.name}-${index}`}
							className='w-full text-left px-3 py-2 hover:bg-gray-100'
							onClick={() => handleSelect(r)}
						>
							<div>
								{r.zip ? <b>{r.zip},</b> : null} {r.city}, {r.region}, {r.address}
							</div>
						</button>
					))}
				</div>
			)}

			{/* ADDRESS */}
			<div className='flex flex-col gap-1'>
				<label htmlFor='up-address' className='font-semibold'>
					Ваша адреса (необов’язково, можна уточнити)
				</label>
				<textarea
					id='up-address'
					className='w-full border border-gr-2 rounded-lg px-3 py-2 outline-none text-base resize-none'
					value={address}
					placeholder='Вулиця, будинок, квартира'
					onChange={e => setAddress(e.target.value)}
				/>
			</div>
		</div>
	)
}
