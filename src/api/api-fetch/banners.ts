import { Banner } from '@/types/baseTypes'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchPublicBanners(): Promise<Banner[]> {
	const res = await fetch(`${API_URL}/banners`, {
		next: {
			revalidate: 60
		}
	})

	if (!res.ok) {
		throw new Error('Failed to fetch banners')
	}

	return res.json()
}
