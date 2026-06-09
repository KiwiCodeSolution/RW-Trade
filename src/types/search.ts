export interface SearchResultItem {
	type: 'product' | 'news'
	item: {
		title: string
		slugUk: string
		slugEn: string
		snippet?: { field: string; text: string } | null
	}
	matchScore: number
}
