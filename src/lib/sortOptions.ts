export type SortOrder = 'asc' | 'desc'

/* ================= PRODUCTS ================= */

export const productSortOptions = [
	{ value: 'PRICE_ASC', label: { uk: 'Ціна ↑', en: 'Price ↑' } },
	{ value: 'PRICE_DESC', label: { uk: 'Ціна ↓', en: 'Price ↓' } },
	{ value: 'DATE_ADDED', label: { uk: 'Новіші', en: 'Newest' } },
	{ value: 'RATING', label: { uk: 'Рейтинг', en: 'Rating' } },
	{ value: 'NAME_ASC', label: { uk: 'Назва А-Я', en: 'Name A-Z' } },
	{ value: 'NAME_DESC', label: { uk: 'Назва Я-А', en: 'Name Z-A' } }
] as const

export type ProductSort = (typeof productSortOptions)[number]['value']

/* ================= NEWS ================= */

export const newsSortOptions = [
	{ value: 'date_desc', label: { uk: 'Новіші', en: 'Newest' } },
	{ value: 'date_asc', label: { uk: 'Старіші', en: 'Oldest' } },
	{ value: 'title_asc', label: { uk: 'Назва: А-Я', en: 'Name: A-Z' } },
	{ value: 'title_desc', label: { uk: 'Назва: Я-А', en: 'Name: Z-A' } }
] as const

export type NewsSort = (typeof newsSortOptions)[number]['value']

/* ================= ORDERS ================= */

export const orderSortOptions = [
	{ value: 'createdAt_DESC', label: { uk: 'Дата ↓', en: 'Date ↓' } },
	{ value: 'createdAt_ASC', label: { uk: 'Дата ↑', en: 'Date ↑' } },
	// { value: 'fullName_ASC', label: { uk: "Ім'я А-Я", en: 'Name A-Z' } },
	// { value: 'fullName_DESC', label: { uk: "Ім'я Я-А", en: 'Name Z-A' } },
	{ value: 'totalPrice_ASC', label: { uk: 'Сума ↑', en: 'Price ↑' } },
	{ value: 'totalPrice_DESC', label: { uk: 'Сума ↓', en: 'Price ↓' } }
] as const

export type OrderSort = (typeof orderSortOptions)[number]['value']
