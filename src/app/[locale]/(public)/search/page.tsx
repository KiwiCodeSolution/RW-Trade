import { BASE_URL } from '@/utils/config'

import { Locale } from '@/types/baseTypes'
import { SearchResultItem } from '@/types/search'

import SearchResultCard from '@/components/userUI/SearchResultCard'

interface SearchPageProps {
	params: Promise<{ locale: Locale }>
	searchParams: Promise<{ q?: string }>
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

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{results.map(item => (
					<SearchResultCard key={item.item.slugUk + item.type} result={item} locale={locale} />
				))}
			</div>
		</main>
	)
}
