const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchPublicCategories() {
	const res = await fetch(`${API_URL}/categories`, {
		next: { revalidate: 60 } // 1 хв
	})
	return res.json()
}
