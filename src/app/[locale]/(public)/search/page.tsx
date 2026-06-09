import { BASE_URL } from '@/utils/config'

import { Locale } from '@/types/baseTypes'
import { SearchResultItem } from '@/types/search'

import { Link } from '@/i18n/navigation'

interface SearchPageProps {
	params: Promise<{ locale: Locale }>
	searchParams: Promise<{ q?: string }>
}

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

async function getSearchResults(query: string, locale: Locale): Promise<SearchResultItem[]> {
	if (!query.trim()) return []
	try {
		const res = await fetch(
			`${BASE_URL}/search?query=${encodeURIComponent(query)}&lang=${locale}`,
			{ cache: 'no-store' }
		)
		const data = await res.json()
		return data.results || []
	} catch {
		return []
	}
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
	const { locale } = await params
	const { q } = await searchParams
	const query = q || ''
	const results = await getSearchResults(query, locale)

	const getUrl = (item: SearchResultItem) =>
		item.type === 'product'
			? `/product/${item.item.slugEn || item.item.slugUk}`
			: `/news/${item.item.slugEn || item.item.slugUk}`

	return (
		<main className='container mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-2'>
				{locale === 'uk' ? 'Результати пошуку' : 'Search results'}
			</h1>

			{query && (
				<p className='text-gray-500 mb-6'>
					{locale === 'uk' ? `За запитом: «${query}»` : `For query: «${query}»`}
				</p>
			)}

			{!query && (
				<p className='text-gray-400'>
					{locale === 'uk'
						? 'Введіть запит у рядку пошуку'
						: 'Enter a query in the search bar'}
				</p>
			)}

			{query && results.length === 0 && (
				<p className='text-gray-400'>
					{locale === 'uk' ? 'Нічого не знайдено' : 'Nothing found'}
				</p>
			)}

			<div className='flex flex-col gap-4'>
				{results.map(item => (
					<Link
						key={item.item.slugUk + item.type}
						href={getUrl(item)}
						className='block p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow transition'
					>
						<div className='text-xs text-gray-400 mb-1'>
							{item.type === 'product'
								? locale === 'uk'
									? 'Товар'
									: 'Product'
								: locale === 'uk'
									? 'Новина'
									: 'News'}
						</div>
						<div className='font-semibold text-lg'>{item.item.title}</div>
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
					</Link>
				))}
			</div>
		</main>
	)
}
