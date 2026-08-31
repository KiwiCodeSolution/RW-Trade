import { PromoBanner } from '@/types/baseTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchPromoBannerCached = async (): Promise<PromoBanner | null> => {
	const res = await fetch(`${API_URL}/promo-banner`, {
		next: {
			revalidate: 60 // кеш 60 сек
		}
	})

	if (!res.ok) return null
	return res.json()
}
