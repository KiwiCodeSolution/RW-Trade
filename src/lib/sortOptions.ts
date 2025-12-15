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
	{
		value: 'createdAt',
		label: { uk: 'Дата створення', en: 'Created date' }
	},
	{
		value: 'fullName',
		label: { uk: 'Клієнт', en: 'Customer' }
	},
	{
		value: 'totalPrice',
		label: { uk: 'Сума', en: 'Total price' }
	}
] as const

export type OrderSortBy = (typeof orderSortOptions)[number]['value']
