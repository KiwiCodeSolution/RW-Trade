import { NewsArticle } from '@/types/baseTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchNewsCached = async ({
	page = 1,
	limit = 6,
	sort = 'date_desc'
}: {
	page?: number
	limit?: number
	sort?: string
}): Promise<{ items: NewsArticle[]; totalItems: number }> => {
	const params = new URLSearchParams({
		page: String(page),
		limit: String(limit),
		sort
	})

	const res = await fetch(`${API_URL}/news?${params.toString()}`, {
		next: { revalidate: 60 }
	})

	if (!res.ok) {
		throw new Error('Failed to fetch news')
	}

	return res.json()
}
