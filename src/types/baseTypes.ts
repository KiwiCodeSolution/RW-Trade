export type Locale = 'uk' | 'en'

export interface LangField {
	uk: string
	en: string
}

export interface SeoBlock {
	title?: LangField
	description?: LangField
	keywords?: LangField | string[]
}

export interface Product {
	_id?: string // якщо приходить з бекенду після створення
	title: LangField
	description: LangField
	price: number
	wholesalePrice: number
	inStock: number
	sku: string
	images?: string[]
	categoryId: string
	subCategoryId?: string
	newArrival?: boolean
	isHit?: boolean
	showDiscountBlock?: boolean
	showOfferBlock?: boolean
	videoUrl?: string
	characteristics?: {
		country?: string
		brand?: string
		priceFrom?: number
		priceTo?: number
	}
	compatibility?: string[]
	kit?: string
	deliveryTerms?: string
	initialRatingSum?: number
	initialRatingCount?: number
	isPublished?: boolean
	seo?: SeoBlock
}

export interface Category {
	_id?: string
	title: LangField
	description?: LangField
	subcategories?: Subcategory[]
}

export interface Subcategory {
	_id?: string
	title: LangField
	description?: LangField
	categoryId?: string
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

export interface News {
	_id?: string
	title: LangField
	subtitle?: LangField
	content: LangField
	slugUk: string
	slugEn: string
	videoUrl?: string
	image?: string
	seo?: SeoBlock
	createdAt?: string
	updatedAt?: string
}

export type DeliveryMethod = 'novaposhta' | 'ukrposhta' | 'meest' | 'courier' // або точний перелік з бекенду, якщо є enum

export interface DeliveryInfo {
	method: DeliveryMethod
	city: string
	branch?: string
	address?: string
	comment?: string
	novaposhta?: Record<string, any>
	ukrposhta?: Record<string, any>
	meest?: Record<string, any>
}

export interface OrderItem {
	productId: string
	productName: string
	quantity: number
	price: number
	categoryId: string
	subCategoryId?: string
	sku?: string
}

export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
	_id?: string
	fullName: string
	phone: string
	delivery: DeliveryInfo
	items: OrderItem[]
	totalPrice: number
	status: OrderStatus
	deliveryDate?: string
	comment?: string
	orderNumber: string
	createdAt?: string
	updatedAt?: string
}
