'use client'

import { DeliveryInfo, Locale } from '@/types/baseTypes'

import { useLocale } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

interface MeestBranchShort {
	br_id?: string
	num?: string
	num_showcase?: number | string
	type_public?: { ua?: string; ru?: string; en?: string }
	city?: { ua?: string; ru?: string; en?: string }
	region?: { ua?: string; ru?: string; en?: string }
	street?: { ua?: string; ru?: string; en?: string }
	street_number?: string
	zip?: string
	lng?: string
	lat?: string
	[address: string]: unknown
}

interface Props {
	value: DeliveryInfo
	onChange: (val: DeliveryInfo) => void
}

export default function MeestFields({ value, onChange }: Props) {
	const locale = useLocale() as Locale
	const [searchByZip, setSearchByZip] = useState(false)
	const [input, setInput] = useState(value?.branch || '')
	const [debouncedInput, setDebouncedInput] = useState(input)
	const [results, setResults] = useState<MeestBranchShort[]>([])
	const [selected, setSelected] = useState<MeestBranchShort | null>(null)

	const [loading, setLoading] = useState(false)

	const controllerRef = useRef<AbortController | null>(null)
	const changeRef = useRef(onChange)
	useEffect(() => {
		changeRef.current = onChange
	}, [onChange])

	// debounce input
	useEffect(() => {
		const t = setTimeout(() => setDebouncedInput(input), 300)
		return () => clearTimeout(t)
	}, [input])

	// fetch list
	useEffect(() => {
		const q = debouncedInput.trim()
		if (!q || q.length < 2) {
			setResults([])
			return
		}

		const fetchList = async () => {
			try {
				setLoading(true)
				if (controllerRef.current) controllerRef.current.abort()
				const ctrl = new AbortController()
				controllerRef.current = ctrl

				const url = `https://publicapi.meest.com/branches?lang=ua`
				const res = await fetch(url, { signal: ctrl.signal })
				const data = await res.json()

				let list: MeestBranchShort[] = []
				if (Array.isArray(data)) list = data
				else if (Array.isArray(data.result)) list = data.result

				const qLower = q.toLowerCase()

				const filtered = list.filter(item => {
					const city = (item.city?.ua || '').toLowerCase()
					const street = (item.street?.ua || '').toLowerCase()
					const num = (item.num_showcase || item.num || '').toString()
					const zip = item.zip || ''

					if (searchByZip) {
						return zip.startsWith(q) || num.startsWith(q)
					}

					return city.includes(qLower) || street.includes(qLower) || num.includes(qLower)
				})

				setResults(filtered.slice(0, 80))
			} catch {
				if (controllerRef.current?.signal.aborted) return
				setResults([])
			} finally {
				setLoading(false)
			}
		}

		fetchList()
	}, [debouncedInput, searchByZip])

	const fullAddress = (b: MeestBranchShort | null) => {
		if (!b) return ''
		const street = b.street?.ua || ''
		const num = b.street_number || ''
		const zip = b.zip ? `, ${b.zip}` : ''
		return `${street} ${num}${zip}`.trim()
	}

	// when selected changes
	useEffect(() => {
		const city = selected?.city?.ua || ''
		const branch = selected?.num_showcase ? String(selected.num_showcase) : selected?.num || ''

		changeRef.current({
			method: 'Meest',
			city,
			branch,
			address: fullAddress(selected),
			meest: selected
				? {
						branchId: selected.br_id || branch,
						zip: selected.zip,
						lat: selected.lat,
						lng: selected.lng
					}
				: undefined,
			payer: selected ? 'recipient' : undefined
		})
	}, [selected])

	const handleSelect = (item: MeestBranchShort) => {
		setSelected(item)
		const city = item.city?.ua || ''
		const num = item.num_showcase || item.num || ''
		const street = item.street?.ua || ''

		setInput(`№${num}, ${city}${street ? ', ' + street : ''}`)
		setResults([])
	}

	const display = useMemo(() => results, [results])

	return (
		<div className='flex flex-col gap-2 w-full relative'>
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					id='meest-search'
					checked={searchByZip}
					onChange={e => {
						setSearchByZip(e.target.checked)
						setInput('')
						setSelected(null)
						setResults([])
					}}
				/>
				<label htmlFor='meest-search'>
					{locale === 'uk' ? 'Пошук за номером' : 'Search by number'}
				</label>
			</div>

			<input
				type='text'
				value={input}
				placeholder={
					searchByZip
						? locale === 'uk'
							? 'Пошук за номером'
							: 'Search by number'
						: locale === 'uk'
							? 'Введіть місто або частину адреси'
							: 'Enter city or part of address'
				}
				className='w-full h-8 border rounded-lg px-3'
				onChange={e => {
					setInput(e.target.value)
					setSelected(null)
				}}
			/>

			{loading && (
				<div className='text-sm opacity-70 px-1'>
					{locale === 'uk' ? 'Завантаження...' : 'Loading...'}
				</div>
			)}

			{display.length > 0 && (
				<div className='absolute top-[110px] left-0 z-20 w-full max-h-[240px] overflow-y-auto border bg-white rounded-lg'>
					{display.map((r, i) => {
						const city = r.city?.ua || ''
						const num = r.num_showcase || r.num || ''
						const street = r.street?.ua || ''
						const zip = r.zip || ''
						const type = r.type_public?.ua || ''

						return (
							<button
								key={i}
								className='w-full text-left px-3 py-2 hover:bg-gray-100'
								onClick={() => handleSelect(r)}
							>
								<b>№{num}, </b>
								{city}, {street} {zip} {type ? `— ${type}` : ''}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
