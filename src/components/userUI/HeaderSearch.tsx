'use client'

import SearchIcon from '@/assets/icons/search-20.svg'

import { BASE_URL } from '@/utils/config'

import { Locale } from '@/types/baseTypes'

import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import { useCallback, useEffect, useState } from 'react'

interface SearchResultItem {
	type: 'product' | 'news'
	item: {
		title: string
		slugUk: string
		slugEn: string
		snippet?: {
			field: string
			text: string
		} | null
	}
	matchScore: number
}

const HeaderSearch = ({ locale }: { locale: Locale }) => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResultItem[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	// function debounceString(fn: (value: string) => Promise<void>, delay: number) {
	// 	let timer: ReturnType<typeof setTimeout> | null = null
	// 	return (value: string) => {
	// 		if (timer) clearTimeout(timer)
	// 		timer = setTimeout(() => void fn(value), delay)
	// 	}
	// }

	function debounceAsync<T>(fn: (value: T, signal: AbortSignal) => Promise<void>, delay: number) {
		let timer: NodeJS.Timeout | null = null
		let controller: AbortController | null = null

		return (value: T) => {
			if (timer) clearTimeout(timer)
			if (controller) controller.abort()

			controller = new AbortController()

			timer = setTimeout(() => {
				fn(value, controller!.signal).catch(() => {})
			}, delay)
		}
	}

	const fieldsTranscription: Record<string, { uk: string; en: string }> = {
		title: { uk: 'Заголовок', en: 'Title' },
		description: { uk: 'Опис', en: 'Description' },
		characteristics: { uk: 'Характеристики', en: 'Characteristics' },
		sku: { uk: 'Артикул', en: 'SKU' },
		compatibility: { uk: 'Сумісність', en: 'Compatibility' },
		kit: { uk: 'Комплект', en: 'Kit' },
		brand: { uk: 'Бренд', en: 'Brand' },
		country: { uk: 'Країна', en: 'Country' },
		deliveryTerms: { uk: 'Умови доставки', en: 'Delivery terms' },
		subtitle: { uk: 'Підзаголовок', en: 'Subtitle' },
		content: { uk: 'Зміст', en: 'Content' }
	}

	const typeTranscription: Record<string, { uk: string; en: string }> = {
		product: { uk: 'Товар', en: 'Product' },
		news: { uk: 'Новини', en: 'News' }
	}

	// const fetchResultsDebounced = useCallback(
	// 	debounceString(async (value: string) => {
	// 		if (!value.trim()) {
	// 			setResults([])
	// 			setIsOpen(false)
	// 			return
	// 		}

	// 		try {
	// 			setLoading(true)
	// 			const res = await fetch(
	// 				`${BASE_URL}/search?query=${encodeURIComponent(value)}&lang=${locale}`
	// 			)
	// 			const data = await res.json()
	// 			setResults(data.results || [])
	// 			setIsOpen(true)
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}, 300),
	// 	[locale]
	// )

	const fetchResultsDebounced = useCallback(
		debounceAsync<string>(async (value, signal) => {
			if (!value.trim()) {
				setResults([])
				setIsOpen(false)
				return
			}

			const res = await fetch(
				`${BASE_URL}/search?query=${encodeURIComponent(value)}&lang=${locale}`,
				{
					signal
				}
			)

			const data = await res.json()
			setResults(data.results || [])
			setIsOpen(true)
		}, 300),
		[locale]
	)

	useEffect(() => {
		fetchResultsDebounced(query)
	}, [query, fetchResultsDebounced])

	const handleBlur = () => {
		setTimeout(() => setIsOpen(false), 150)
	}

	const getUrl = (item: SearchResultItem) => {
		if (item.type === 'product') return `/product/${item.item.slugEn || item.item.slugUk}`
		if (item.type === 'news') return `/news/${item.item.slugEn || item.item.slugUk}`
		return '#'
	}

	return (
		<div className='relative'>
			<div className='bg-primary p-0.5 rounded-full flex'>
				<input
					type='text'
					className='h-[44px] grow bg-bg-light rounded-l-full outline-0 border-0 px-4'
					placeholder='Пошук...'
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={() => results.length > 0 && setIsOpen(true)}
					onBlur={handleBlur}
				/>

				<div className='rounded-r-full bg-bg-light'>
					<button className='w-[44px] h-[44px] rounded-full p-2 text-gr-2 cursor-pointer'>
						<SearchIcon />
					</button>
				</div>
			</div>

			{isOpen && results.length > 0 && (
				<div className='absolute left-0 right-0 mt-2 bg-bg-light rounded-xl shadow-xl p-2 z-50 max-h-[300px] overflow-auto'>
					{results.map(item => (
						<Link
							key={item.item.slugUk + item.type}
							href={getUrl(item)}
							className='block px-3 py-2 hover:bg-gray-100 rounded-lg'
							onClick={() => {
								setQuery('')
								setIsOpen(false)
								setResults([])
							}}
						>
							<div className='font-medium'>{item.item.title}</div>
							{item.item.snippet && (
								<div className='text-sm text-gray-500 mt-1'>
									<span className='font-semibold'>
										{fieldsTranscription[item.item.snippet.field]?.[locale] ||
											item.item.snippet.field}
										:
									</span>{' '}
									{item.item.snippet.text}…
								</div>
							)}
							<div className='text-xs text-gray-400 mt-1'>
								{typeTranscription[item.type]?.[locale]}
							</div>
						</Link>
					))}
				</div>
			)}

			{isOpen && loading && (
				<div className='absolute left-0 right-0 mt-2 bg-bg-light rounded-xl shadow-xl p-2 z-50'>
					<div className='px-3 py-2 opacity-70'>Завантаження...</div>
				</div>
			)}
		</div>
	)
}

export default HeaderSearch
