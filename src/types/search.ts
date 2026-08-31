export interface SearchResultItem {
	type: 'product' | 'news'
	item: {
		title: string
		slugUk: string
		slugEn: string
		image: string | null
		price: number | null
		priceCurrency: number | null
		subtitle: string | null
		snippet?: { field: string; text: string } | null
	}
	matchScore: number
}
