'use client'

import { SearchIcon } from '@/assets/icons'

import { BASE_URL } from '@/utils/config'

import { Locale } from '@/types/baseTypes'

import { Link, useRouter } from '@/i18n/navigation'

import { useCallback, useEffect, useRef, useState } from 'react'

interface SearchResultItem {
	type: 'product' | 'news'
	item: {
		title: string
		slugUk: string
		slugEn: string
		snippet?: { field: string; text: string } | null
	}
	matchScore: number
}

const HeaderSearch = ({ locale }: { locale: Locale }) => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResultItem[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const router = useRouter()
	const timerRef = useRef<NodeJS.Timeout | null>(null)
	const controllerRef = useRef<AbortController | null>(null)

	const fieldsTranscription: Record<string, { uk: string; en: string }> = {
		title: { uk: 'Заголовок', en: 'Title' },
		description: { uk: 'Опис', en: 'Description' },
		characteristics: { uk: 'Характеристики', en: 'Characteristics' },
		sku: { uk: 'Артикул', en: 'SKU' },
		compatibility: { uk: 'Сумісність', en: 'Compatibility' },
		kit: { uk: 'Комплект', en: 'Kit' },
		brand: { uk: 'Бренд', en: 'Brand' },
		country: { uk: 'Країна', en: 'Country' },
		deliveryTerms: { uk: 'Умови доставки', en: 'Delivery terms' },
		subtitle: { uk: 'Підзаголовок', en: 'Subtitle' },
		content: { uk: 'Зміст', en: 'Content' }
	}

	const typeTranscription: Record<string, { uk: string; en: string }> = {
		product: { uk: 'Товар', en: 'Product' },
		news: { uk: 'Новини', en: 'News' }
	}

	const fetchResults = useCallback(
		async (value: string, signal: AbortSignal) => {
			if (!value.trim()) {
				setResults([])
				setIsOpen(false)
				return
			}
			setLoading(true)
			try {
				const res = await fetch(
					`${BASE_URL}/search?query=${encodeURIComponent(value)}&lang=${locale}`,
					{ signal }
				)
				const data = await res.json()
				setResults(data.results || [])
				setIsOpen(true)
			} catch {
				// abort або помилка мережі
			} finally {
				setLoading(false)
			}
		},
		[locale]
	)

	const fetchResultsDebounced = useCallback(
		(value: string) => {
			if (timerRef.current) clearTimeout(timerRef.current)
			if (controllerRef.current) controllerRef.current.abort()

			controllerRef.current = new AbortController()

			timerRef.current = setTimeout(() => {
				fetchResults(value, controllerRef.current!.signal).catch(() => {})
			}, 300)
		},
		[fetchResults]
	)

	useEffect(() => {
		fetchResultsDebounced(query)
	}, [query, fetchResultsDebounced])

	const goToSearchPage = useCallback(() => {
		if (!query.trim()) return
		setIsOpen(false)
		setResults([])
		router.push(`/search?q=${encodeURIComponent(query.trim())}`)
	}, [query, router])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') goToSearchPage()
	}

	const handleBlur = () => setTimeout(() => setIsOpen(false), 150)

	const getUrl = (item: SearchResultItem) =>
		item.type === 'product'
			? `/product/${item.item.slugEn || item.item.slugUk}`
			: item.type === 'news'
				? `/news/${item.item.slugEn || item.item.slugUk}`
				: '#'

	return (
		<div className='relative'>
			<div className='bg-primary p-0.5 rounded-full flex'>
				<input
					type='text'
					className='h-[44px] grow bg-bg-light rounded-l-full outline-0 border-0 px-4'
					placeholder={locale === 'uk' ? 'Пошук...' : 'Search...'}
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={() => results.length > 0 && setIsOpen(true)}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
				/>
				<div className='rounded-r-full bg-bg-light'>
					<button
						className='w-[44px] h-[44px] rounded-full p-2 text-gr-2 cursor-pointer'
						onClick={goToSearchPage}
					>
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
					<div className='px-3 py-2 opacity-70'>
						{locale === 'uk' ? 'Знаходження...' : 'Searching...'}
					</div>
				</div>
			)}
		</div>
	)
}

export default HeaderSearch
