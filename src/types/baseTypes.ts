import { OrderItem } from '@/store/CartStore'

export type Locale = 'uk' | 'en'

export type PreviewItem = { id: string; url?: string; file?: File }

export enum ProductStatus {
	IN_STOCK = 'in_stock',
	EXPECTED = 'expected',
	ON_ORDER = 'on_order'
}

export interface LangField {
	uk: string
	en: string
}

export interface SeoBlock {
	title?: LangField
	description?: LangField
	keywords?: LangField | string[]
}

export type Price =
	| { price: number; priceCurrency?: never } // ціна в грн
	| { priceCurrency: number; price?: never } // ціна у валюті

export type CreateProductDto = Price & {
	title: LangField
	description: LangField
	wholesalePrice?: number
	inStock?: number
	sku: string
	images?: string[]
	categoryId: string
	subCategoryId?: string
	newArrival?: boolean
	isHit?: boolean
	showDiscountBlock?: boolean
	showOfferBlock?: boolean
	videoUrl?: string
	characteristics?: LangField
	compatibility?: LangField
	kit?: LangField
	deliveryTerms?: LangField
	initialRatingSum?: number
	initialRatingCount?: number
	isPublished?: boolean
	seo?: SeoBlock
	isFavorite?: boolean
	status?: ProductStatus
	isPartner?: boolean
	country: string
	brand: string
}

export type Product = CreateProductDto & {
	_id: string
	slugUk: string
	slugEn: string
	rating: number
	ratingCount: number
	ratingSum: number
	status: ProductStatus
	subCategorySlug: string
	categorySlug: string
}

export type ProductPrint = { product: Product; locale: Locale }

// export type CreateProduct = Omit<Product, '_id' | 'slugUk' | 'slugEn' | 'images'> & {
// 	images: (string | PreviewItem)[]
// }

export interface Category {
	_id?: string
	title: LangField
	description?: LangField
	subcategories?: Subcategory[]
	slug: string
}

export interface Subcategory {
	_id?: string
	title: LangField
	description?: LangField
	categoryId?: string
	slug: string
	subCategorySlug?: string
}

export type FeedbackStatus = 'new' | 'read' | 'contacted' | 'important'

export interface Feedback {
	_id?: string
	username: string
	surname?: string
	email: string
	message: string
	status: FeedbackStatus
	blocked: boolean
	createdAt?: string
	updatedAt?: string
}

export interface Message {
	_id: string
	username: string
	surname?: string
	email: string
	message: string
	status: FeedbackStatus
	blocked: boolean
	createdAt: string
	updatedAt?: string
}

export type DeliveryMethod = 'nova_poshta' | 'Ukrposhta' | 'Meest' | 'courier' // або точний перелік з бекенду, якщо є enum

export interface NPAddressItem {
	Ref: string
	Present: string
	MainDescription: string
	Area: string
	Region: string
	ParentRegionCode?: string
	DeliveryCity: string
}

export interface DeliveryAPI {
	searchCities(query: string): Promise<DeliveryCity[]>
	getWarehouses(city: DeliveryCity): Promise<DeliveryWarehouse[]>
}

export type DeliveryData = {
	method: DeliveryMethod
	city: DeliveryCity | null
	branch?: DeliveryWarehouse | null
	address?: string
	comment?: string
	raw?: {
		city?: NPAddressItem
		warehouse?: NPWarehouseItem
	} | null
}

export type DeliveryCityUP = {
	name: string
	ref: string
	full: string
	short: string
	// raw немає
}

export interface NPWarehouseItem {
	Ref: string
	Number: string
	Description: string
	ShortAddress: string
	CityRef: string
}

export interface DeliveryWarehouse {
	ref: string
	number: string
	description: string
	short: string
	raw: NPWarehouseItem
}

export interface DeliveryInfo {
	method: DeliveryMethod
	city: string
	branch?: string
	address?: string
	comment?: string
	novaposhta?: Record<string, unknown>
	ukrposhta?: Record<string, unknown>
	meest?: Record<string, unknown>
	payer?: string
}

export interface DeliveryCity {
	ref: string
	name: string
	full: string
	short: string
	raw: NPAddressItem
}

export interface Order {
	_id: string
	fullName: string
	phone: string
	delivery: DeliveryInfo
	paymentMethod: string
	items: OrderItem[]
	totalPrice: number
	status: OrderStatus
	comment?: string
	deliveryDate?: string
	orderNumber?: string
	createdAt?: string
	updatedAt?: string
}

export interface OrderForm {
	fullName: string
	phone: string
	delivery: DeliveryInfo
	paymentMethod: string
	comment: string
}

export interface OrderPayload {
	fullName: string
	phone: string
	paymentMethod: string
	comment: string
	totalPrice: number

	delivery: {
		method: string
		city: string
		branch?: string
		address?: string
		comment?: string
		payer?: string
		raw?: {
			city?: unknown
			warehouse?: unknown
		}
	}

	items: {
		productId: string
		productName: string
		quantity: number
		finalPrice: number
		categoryId: string
	}[]
}

export type OrdersResponse = {
	data: Order[]
	total: number
	page: number
	limit: number
	totalPages: number
	totalByStatus?: Partial<Record<OrderStatus, number>>
}

export interface CreateOrderSuccess {
	success: true
	data: unknown // можу замінити на точний OrderModel з бекенду
}

export interface CreateOrderError {
	success: false
	error: string
}

export type CreateOrderResult = CreateOrderSuccess | CreateOrderError

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export type NotificationType = 'order' | 'feedback'
export type NotificationStatus = 'unread' | 'read'

export interface Notification {
	_id: string
	type: NotificationType
	refId: string
	name: string
	amount?: number
	date: string // або Date, залежно від того, як приходить із бекенду
	status: NotificationStatus
	createdAt?: string
	updatedAt?: string
}

export type ItemsSort =
	| 'PRICE_ASC' // ціна зростання
	| 'PRICE_DESC' // ціна зменшення
	| 'DATE_ADDED' //дата створення
	| 'RATING' //рейтинг
	| 'NAME_ASC' // назва а-я
	| 'NAME_DESC' // назва я-а

export type ProductLimit = 16 | 32 | 48
export type NewsLimit = 4 | 8 | 12

export type ItemsFilterParams = {
	lang?: Locale
	categorySlug?: string | 'all' // для продуктів
	subCategorySlug?: string | 'all' // для продуктів
	priceRange?: [number, number] // для продуктів
	countries?: string | string[] // для продуктів
	minPrice?: number
	maxPrice?: number
	sort?: ItemsSort
	limit?: number
	page?: number
}

export type CreateNewsDto = {
	title: LangField
	subtitle?: LangField
	content: LangField
	videoUrl?: string
	image?: string
	seo?: SeoBlock
	isNews: boolean
	isPublished?: boolean
}

export type NewsArticle = CreateNewsDto & {
	_id: string
	createdAt: string
	slugUk: string
	slugEn: string
}

export type BannerType = 'left' | 'right' | 'center'

export type CreateBannerDto = {
	link: string
	image: string
	type: BannerType
}

export type Banner = CreateBannerDto & {
	_id: string
	isPublished: boolean
}

export type CreatePromoBannerDto = {
	title: LangField
	subtitle: LangField
	firstText: LangField
	secondText: LangField
	thirdText: LangField
	link: string
	image: string
}

export type PromoBanner = CreatePromoBannerDto & {
	_id: string
	isPublished: boolean
}

export interface PaginatedNews {
	data: NewsArticle[]
	total: number
	page: number
	limit: number
	totalPages: number
}
// users, auth

export type RoleContext = 'admin' | 'user'
export type PageContext = 'admin' | 'user'

export enum AdminRole {
	SUPERADMIN = 'superadmin',
	BASEADMIN = 'baseadmin',
	SELLER = 'seller',
	CONTENT_MANAGER = 'content-manager'
}

// stats

export interface CategoryStatsItem {
	count: number
	subcategories?: Record<string, number>
}

export interface MonthlyOrdersItem {
	total: number
	pending?: number
	shipped?: number
	delivered?: number
	cancelled?: number
}

export interface OrderStats {
	_id: string

	// Статистика по статусах
	pending?: number
	shipped?: number
	delivered?: number
	cancelled?: number
	totalOrders: number

	// Категорії та підкатегорії
	categoryStats: Record<string, CategoryStatsItem>

	// Місячна статистика
	monthlyOrders: Record<string, MonthlyOrdersItem>
}
