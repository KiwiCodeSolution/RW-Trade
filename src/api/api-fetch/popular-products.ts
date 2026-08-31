const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function fetchPopularProducts(categoryIds: string[]) {
	const results = await Promise.all(
		categoryIds.map(id =>
			fetch(`${API_URL}/products/by-category/${id}`, {
				next: { revalidate: 60 }
			}).then(res => res.json())
		)
	)

	return results
}
