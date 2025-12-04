import { Category, CreateProductDto, LangField, ProductStatus } from '@/types/baseTypes'

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

export function generateRandomProduct(categories: Category[]): CreateProductDto {
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

	const ukDescriptions = [
		'<p>Надійний товар високої якості для вашого авто.</p>',
		'<p>Підходить для більшості моделей автомобілів.</p>',
		'<p>Гарантія 12 місяців. Сертифікована продукція.</p>'
	]
	const enDescriptions = [
		'<p>Reliable high-quality product for your car.</p>',
		'<p>Fits most car models.</p>',
		'<p>12-month warranty. Certified product.</p>'
	]

	const kits = [
		{
			uk: '<ul><li>Кабель</li><li>Адаптер</li><li>Інструкція</li></ul>',
			en: '<ul><li>Cable</li><li>Adapter</li><li>Manual</li></ul>'
		},
		{
			uk: '<ul><li>Перехідник</li><li>Зарядний блок</li></ul>',
			en: '<ul><li>Adapter</li><li>Charger</li></ul>'
		},
		{
			uk: '<ul><li>Набір кріплень</li><li>Інструкція користувача</li></ul>',
			en: '<ul><li>Mounting set</li><li>User manual</li></ul>'
		}
	]

	const compatibilities = [
		{
			uk: '<ul><li>Audi</li><li>BMW</li><li>Ford</li></ul>',
			en: '<ul><li>Audi</li><li>BMW</li><li>Ford</li></ul>'
		},
		{
			uk: '<ul><li>Toyota</li><li>Opel</li></ul>',
			en: '<ul><li>Toyota</li><li>Opel</li></ul>'
		},
		{
			uk: '<ul><li>Renault</li><li>Honda</li><li>Skoda</li></ul>',
			en: '<ul><li>Renault</li><li>Honda</li><li>Skoda</li></ul>'
		}
	]

	const characteristics = [
		{
			uk: '<ul><li>Нове</li><li>Дешеве</li><li>Гарне</li></ul>',
			en: '<ul><li>New</li><li>Cheap</li><li>Good</li></ul>'
		},
		{
			uk: '<ul><li>Вражаюча якість</li><li>Низька ціна</li></ul>',
			en: '<ul><li>Impressive quality</li><li>Low price</li></ul>'
		},
		{
			uk: '<ul><li>Швидка доставка</li><li>Гарантія</li><li>Якість</li></ul>',
			en: '<ul><li>Fast delivery</li><li>Warranty</li><li>Quality</li></ul>'
		}
	]

	const deliveryTerms = [
		{
			uk: '<ul><li>Доставка будь-якою поштою</li><li>Швидко</li><li>Без передплати</li></ul>',
			en: '<ul><li>Delivery by any post</li><li>Fast</li><li>No prepayment</li></ul>'
		},
		{
			uk: '<ul><li>Працюємо по мінімальній передплаті</li><li>Доставка до дверей</li></ul>',
			en: '<ul><li>We work with minimal prepayment</li><li>Delivery to the door</li></ul>'
		},
		{
			uk: '<ul><ol>Без передплати</ol><ol>Відправка впродовж одного дня</ol><ol>Можлива доставка курєром</ol></ul>',
			en: '<ul><ol>No prepayment</ol><ol>Shipping within one day</ol><ol>Courier delivery available</ol></ul>'
		}
	]

	const countries = ['Україна', 'Польща', 'Німеччина', 'Китай', 'Туреччина']
	const brands = ['Bosch', 'RW Trade', 'Philips', 'Xiaomi', 'Osram']

	const category = randomFrom(categories)
	const subcategory = category.subcategories?.length
		? randomFrom(category.subcategories)
		: undefined

	const status = randomFrom([
		ProductStatus.IN_STOCK,
		ProductStatus.ON_ORDER,
		ProductStatus.EXPECTED
	])
	const inStock = status === ProductStatus.IN_STOCK ? randomInt(1, 100) : 0
	const randomNumber = randomInt(1000, 9999)

	let priceOrCurrency: { price: number } | { priceCurrency: number }

	if (randomBool()) {
		priceOrCurrency = { price: randomInt(100, 2000) }
	} else {
		priceOrCurrency = { priceCurrency: randomInt(10, 100) }
	}

	return {
		title: randomLangField(ukTitles, enTitles),
		description: randomLangField(ukDescriptions, enDescriptions),
		kit: randomFrom(kits),
		compatibility: randomFrom(compatibilities),
		characteristics: randomFrom(characteristics),
		wholesalePrice: randomInt(80, 1500),
		inStock,
		sku: `SKU-${randomNumber}`,
		images: [],
		categoryId: category._id!,
		subCategoryId: subcategory?._id,
		newArrival: randomBool(0.4),
		isHit: randomBool(0.4),
		showDiscountBlock: randomBool(0.3),
		showOfferBlock: randomBool(0.3),
		videoUrl: randomBool(0.3) ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : '',
		deliveryTerms: randomFrom(deliveryTerms),
		initialRatingSum: randomInt(10, 50),
		initialRatingCount: randomInt(2, 10),
		isPublished: randomBool(0.9),
		seo: {
			title: randomLangField(['Купити автоаксесуари'], ['Buy car accessories']),
			description: randomLangField(['Опис продукту'], ['Product description']),
			keywords: randomLangField(['авто, аксесуари'], ['car,accessories'])
		},
		status,
		isPartner: randomBool(0.3),
		country: randomFrom(countries),
		brand: randomFrom(brands),
		...priceOrCurrency // гарантовано одне поле і TS не свариться
	} as CreateProductDto
}

export function generateProductsArray(categories: Category[], count = 50): CreateProductDto[] {
	return Array.from({ length: count }, () => generateRandomProduct(categories))
}
