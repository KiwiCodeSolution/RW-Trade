import { Category, CreateProduct, LangField, ProductStatus } from '@/types/baseTypes'

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomBool(prob = 0.5) {
	return Math.random() < prob
}

function randomFrom<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

function randomLangField(uk: string[], en: string[]): LangField {
	return { uk: randomFrom(uk), en: randomFrom(en) }
}

export function generateRandomProduct(categories: Category[]): CreateProduct {
	const ukTitles = [
		'Світлодіодна лампа',
		'Домкрат',
		'Компресор',
		'Набір інструментів',
		'OBD-сканер',
		'Акумулятор',
		'Паяльник',
		'Зарядний пристрій',
		'Кермова рейка',
		'Автомагнітола'
	]
	const enTitles = [
		'LED Lamp',
		'Jack',
		'Compressor',
		'Tool Set',
		'OBD Scanner',
		'Battery',
		'Soldering Iron',
		'Charger',
		'Steering Rack',
		'Car Stereo'
	]
	const ukDesc = [
		'Надійний товар високої якості для вашого авто.',
		'Виготовлено з міцних матеріалів.',
		'Підходить для більшості моделей автомобілів.',
		'Гарантія 12 місяців. Сертифікована продукція.',
		'Ідеальне співвідношення ціни та якості.'
	]
	const enDesc = [
		'Reliable high-quality product for your car.',
		'Made from durable materials.',
		'Fits most car models.',
		'12-month warranty. Certified product.',
		'Perfect balance of price and quality.'
	]

	const category = randomFrom(categories)
	const subcategory = category.subcategories?.length
		? randomFrom(category.subcategories)
		: undefined

	const status = randomFrom(Object.values(ProductStatus))
	const inStock = status === ProductStatus.IN_STOCK ? randomInt(1, 100) : 0
	const randomNumber = randomInt(1000, 9999)

	return {
		title: randomLangField(ukTitles, enTitles),
		description: randomLangField(ukDesc, enDesc),
		price: randomInt(100, 2000),
		wholesalePrice: randomInt(80, 1500),
		inStock,
		sku: `SKU-${randomNumber}`,
		images: [], // фото не чіпаємо
		categoryId: category._id!,
		subCategoryId: subcategory?._id,
		newArrival: randomBool(0.4),
		isHit: randomBool(0.4),
		showDiscountBlock: randomBool(0.3),
		showOfferBlock: randomBool(0.3),
		videoUrl: randomBool(0.3) ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : '',
		characteristics: {
			country: randomFrom(['Україна', 'Польща', 'Німеччина', 'Китай', 'Туреччина']),
			brand: randomFrom(['Bosch', 'RW Trade', 'Philips', 'Xiaomi', 'Osram']),
			priceFrom: randomInt(50, 100),
			priceTo: randomInt(150, 500)
		},
		compatibility: ['Audi', 'BMW', 'Ford', 'Toyota', 'Opel', 'Renault'].slice(
			0,
			randomInt(1, 4)
		),
		kit: randomFrom([
			'Кабель, адаптер, інструкція',
			'Перехідник, зарядний блок',
			'Набір кріплень',
			'Інструкція користувача'
		]),
		deliveryTerms: randomFrom([
			'Безкоштовна доставка від 500 грн',
			'Самовивіз зі складу',
			'Доставка Новою Поштою'
		]),
		initialRatingSum: randomInt(10, 50),
		initialRatingCount: randomInt(2, 10),
		isPublished: randomBool(0.9),
		seo: {
			title: randomLangField(
				['Купити автоаксесуари', 'Авто товари онлайн'],
				['Buy car accessories', 'Auto parts online']
			),
			description: randomLangField(
				['Опис продукту для SEO', 'Якісні автотовари за вигідною ціною'],
				['Product SEO description', 'High-quality car goods']
			),
			keywords: randomLangField(
				['авто, аксесуари', 'деталі, машини'],
				['car, accessories', 'auto, parts']
			)
		},
		status,
		isPartner: randomBool(0.3)
	}
}

export function generateProductsArray(categories: Category[], count = 50): CreateProduct[] {
	return Array.from({ length: count }, () => generateRandomProduct(categories))
}
