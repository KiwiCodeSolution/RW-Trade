import { Locale } from '@/types/baseTypes'

import AddCartBtn from './AddCartBtn'
import PriceComponent from './PriceComponent'
import ToggleFavoriteButton from './ToggleFavoriteButton'
import { Link } from '@/i18n/navigation'

import Image from 'next/image'

type ProductCardProps = {
	// product?: Product
	locale: Locale
	type?: 'our' | 'partners'
}
const ProductCard = ({ locale, type }: ProductCardProps) => {
	const product = {
		_id: '661731f8fd97a46b6a99dc29',
		title: { uk: 'Автомобільний зарядний пристрій', en: 'Car Charger' },
		description: {
			uk: 'Швидкий зарядний пристрій для автомобіля з підтримкою QC 3.0',
			en: 'Fast car charger supporting QC 3.0'
		},
		price: 500,
		wholesalePrice: 465,
		inStock: 150,
		sku: '123456',
		images: ['/images/products/car-charger-1.jpg', '/images/products/car-charger-2.jpg'],
		categoryId: '68b87a81073dae082670402f',
		subCategoryId: '68b87a81073dae0826704030',
		newArrival: true,
		isHit: true,
		showDiscountBlock: true,
		showOfferBlock: false,
		videoUrl: 'https://www.youtube.com/watch?v=example',
		characteristics: {
			country: 'China',
			brand: 'Xiaomi',
			priceFrom: 450,
			priceTo: 500
		},
		compatibility: ['iPhone', 'Android'],
		kit: 'Charger + USB Cable',
		deliveryTerms: '1–2 business days',
		initialRatingSum: 45,
		initialRatingCount: 10,
		isPublished: true,
		seo: {
			title: { uk: 'Купити автомобільний зарядний пристрій', en: 'Buy Car Charger' },
			description: {
				uk: 'Якісний швидкий зарядний пристрій для автомобіля',
				en: 'High-quality fast car charger for your car'
			},
			keywords: { uk: 'зарядний, авто, гаджет', en: 'charger, car, gadget' }
		},
		slugUk: 'avtomobilnyi-zaryadnyi-prystriy',
		slugEn: 'car-charger',
		isFavorite: false
	}
	const bgColor = type === 'partners' ? 'bg-other-2' : 'bg-other-1'

	return (
		<article className='h-[505px] w-full min-w-[278px] max-w-[330px] rounded-md border-2 border-sc-1 flex flex-col justify-between items-center relative'>
			<div className='w-full h-[55px] absolute top-0 left-0 flex items-center justify-between p-1'>
				<div className='flex flex-col gap-y-1 items-center justify-center'>
					{product.isHit && (
						<span className='w-[42px] h-6 rounded-tl-lg rounded-br-lg bg-sc-4 uppercase text-xs font-medium flex items-center justify-center'>
							{locale === 'en' ? 'Hit' : 'Хіт'}
						</span>
					)}
					{product.newArrival && (
						<span className='w-[42px] h-6 rounded-tl-lg rounded-br-lg bg-link-blue uppercase text-xs font-medium flex text-white items-center justify-center'>
							New
						</span>
					)}
				</div>

				<ToggleFavoriteButton product={product} />
			</div>

			<div className='h-[265px] w-full overflow-hidden'>
				<Image
					src={(product.images && product.images[0]) ?? '/public/logos/LOGO_252_blue.png'}
					alt={product.title[locale]}
					width={300}
					height={300}
					className='w-full min-w-[278px] max-w-[330px] object-cover h-full'
				/>
			</div>

			<div className={`w-full h-[240px] p-3 flex flex-col gap-y-2 justify-center ${bgColor}`}>
				<Link
					href={`/product/${locale === 'en' ? product.slugEn : product.slugUk}`}
					className='cursor-pointer group h-[72px]'
				>
					<h3 className='text-lg font-semibold text-link-blue group-hover:underline group-hover:decoration-link-blue'>
						{product.title[locale]}
					</h3>
				</Link>
				<div className='h-7'>rating</div>
				<div className='w-full h-[64px] flex items-center justify-between'>
					<PriceComponent
						price={product.price}
						locale={locale}
						wholesalePrice={product.wholesalePrice}
					/>
					<AddCartBtn product={product} />
				</div>
				<p>Код товару:{product.sku}</p>
			</div>
		</article>
	)
}

export default ProductCard
