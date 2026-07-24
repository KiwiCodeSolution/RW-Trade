'use client'

import { Locale } from '@/types/baseTypes'
import { SearchResultItem } from '@/types/search'

import { productStore } from '@/store/ProductsStore'

import { Link } from '@/i18n/navigation'

import Image from 'next/image'

import { observer } from 'mobx-react-lite'

const resolveImgSrc = (src?: string | null) => {
	if (!src) return '/images/NotFound.png'
	if (src.startsWith('http://') || src.startsWith('https://')) return src
	if (src.startsWith('/uploads')) return `/api${src}`
	if (src.startsWith('/images')) return src
	return '/images/NotFound.png'
}

const fieldsTranscription: Record<string, { uk: string; en: string }> = {
	title: { uk: 'Заголовок', en: 'Title' },
	description: { uk: 'Опис', en: 'Description' },
	characteristics: { uk: 'Характеристики', en: 'Characteristics' },
	sku: { uk: 'Артикул', en: 'SKU' },
	compatibility: { uk: 'Сумісність', en: 'Compatibility' },
	kit: { uk: 'Комплект', en: 'Kit' },
	brand: { uk: 'Бренд', en: 'Brand' },
	country: { uk: 'Країна', en: 'Country' },
	deliveryTerms: { uk: 'Умови доставки', en: 'Delivery terms' },
	subtitle: { uk: 'Підзаголовок', en: 'Subtitle' },
	content: { uk: 'Зміст', en: 'Content' }
}

interface SearchResultCardProps {
	result: SearchResultItem
	locale: Locale
}

const SearchResultCard = observer(({ result, locale }: SearchResultCardProps) => {
	const { item, type } = result
	const { exchangeRate } = productStore

	const href =
		type === 'product' ? `/product/${item.slugEn || item.slugUk}` : `/news/${item.slugEn || item.slugUk}`

	const priceLocal =
		item.price != null ? item.price : item.priceCurrency != null ? item.priceCurrency * exchangeRate : null

	return (
		<Link
			href={href}
			className='flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow transition overflow-hidden'
		>
			<div className='relative w-[100px] h-[100px] rounded-lg shrink-0 overflow-hidden bg-gray-50'>
				<Image src={resolveImgSrc(item.image)} alt={item.title} fill className='object-cover' />
			</div>

			<div className='flex flex-col min-w-0 flex-1'>
				<div className='text-xs text-gray-400 mb-1'>
					{type === 'product' ? (locale === 'uk' ? 'Товар' : 'Product') : locale === 'uk' ? 'Новина' : 'News'}
				</div>

				<div className='font-semibold text-lg truncate'>{item.title}</div>

				{item.subtitle && <div className='text-sm text-gray-500 mt-1 line-clamp-2'>{item.subtitle}</div>}

				{type === 'product' && priceLocal != null && (
					<div className='font-medium mt-1'>
						{locale === 'en' ? 'Price:' : 'Ціна:'} {priceLocal.toFixed(2)} ₴
					</div>
				)}

				{item.snippet && (
					<div className='text-sm text-gray-500 mt-1 line-clamp-2'>
						<span className='font-semibold'>
							{fieldsTranscription[item.snippet.field]?.[locale] || item.snippet.field}:
						</span>{' '}
						{item.snippet.text}…
					</div>
				)}
			</div>
		</Link>
	)
})

export default SearchResultCard
