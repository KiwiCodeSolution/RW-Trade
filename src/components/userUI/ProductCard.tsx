import { Locale, Product, ProductStatus } from '@/types/baseTypes'

import EditButtonProductCard from '../adminUI/EditButtonProductCard'

import OtherStatusesProductBtnComponents from './OtherStatusesProductBtnComponents'
import PriceAndAddCartComponent from './PriceAndAddCartComponent'
import ToggleFavoriteButton from './ToggleFavoriteButton'
import BaseImageItem from './baseComponents/BaseImageItem'
import { Link } from '@/i18n/navigation'

type ProductCardProps = {
	product: Product
	locale: Locale
	type?: 'our' | 'partners'
	typePage?: 'client' | 'admin'
}
const ProductCard = ({ locale, type, typePage, product }: ProductCardProps) => {
	// const product = {
	// 	_id: '661731f8fd97a46b6a99dc29',
	// 	title: {
	// 		uk: 'Автомобільний зарядний пристрій хто зна для чого, але хай буде як тест. Довгий заголовок для тестування скорочення',
	// 		en: 'Car Charger'
	// 	},
	// 	description: {
	// 		uk: 'Швидкий зарядний пристрій для автомобіля з підтримкою QC 3.0',
	// 		en: 'Fast car charger supporting QC 3.0'
	// 	},
	// 	price: 500,
	// 	wholesalePrice: 465,
	// 	inStock: 150,
	// 	sku: '123456',
	// 	images: ['/images/products/car-charger-1.jpg', '/images/products/car-charger-2.jpg'],
	// 	categoryId: '68b87a81073dae082670402f',
	// 	subCategoryId: '68b87a81073dae0826704030',
	// 	newArrival: true,
	// 	isHit: true,
	// 	showDiscountBlock: true,
	// 	showOfferBlock: false,
	// 	videoUrl: 'https://www.youtube.com/watch?v=example',
	// 	characteristics: {
	// 		country: 'China',
	// 		brand: 'Xiaomi',
	// 		priceFrom: 450,
	// 		priceTo: 500
	// 	},
	// 	compatibility: ['iPhone', 'Android'],
	// 	kit: 'Charger + USB Cable',
	// 	deliveryTerms: '1–2 business days',
	// 	initialRatingSum: 45,
	// 	initialRatingCount: 10,
	// 	isPublished: true,
	// 	seo: {
	// 		title: { uk: 'Купити автомобільний зарядний пристрій', en: 'Buy Car Charger' },
	// 		description: {
	// 			uk: 'Якісний швидкий зарядний пристрій для автомобіля',
	// 			en: 'High-quality fast car charger for your car'
	// 		},
	// 		keywords: { uk: 'зарядний, авто, гаджет', en: 'charger, car, gadget' }
	// 	},
	// 	slugUk: 'avtomobilnyi-zaryadnyi-prystriy',
	// 	slugEn: 'car-charger',
	// 	isFavorite: false,
	// 	status: ProductStatus.IN_STOCK
	// }
	const bgColor = type === 'partners' ? 'bg-other-2' : 'bg-other-1'

	return (
		<article
			className={`${typePage === 'admin' ? 'h-[317px] w-full min-w-[162px] max-w-[162px]' : 'h-[505px] w-full min-w-[278px] max-w-[330px]'}  rounded-md border-2 border-sc-1 flex flex-col justify-between items-center relative product-card-shadow`}
		>
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
				{typePage === 'admin' ? (
					<EditButtonProductCard id={product._id} />
				) : (
					<ToggleFavoriteButton product={product} />
				)}
			</div>

			<div
				className={`${typePage === 'admin' ? 'h-[162px]' : 'h-[265px]'} w-full overflow-hidden`}
			>
				<BaseImageItem
					src={product.images && product.images[0]}
					alt={product.title[locale]}
					width={typePage === 'admin' ? 162 : 300}
					height={typePage === 'admin' ? 162 : 300}
					className={`w-full min-w-[278px] max-w-[330px] object-cover h-full`}
				/>
			</div>
			<div
				className={`${typePage === 'admin' ? 'w-full h-[147px] p-2' : 'w-full h-[240px] p-3 gap-y-2'} flex flex-col justify-center ${bgColor}`}
			>
				<Link
					href={`/product/${locale === 'en' ? product.slugEn : product.slugUk}`}
					className='cursor-pointer group h-[72px]'
				>
					<h3
						className={`${typePage === 'admin' ? 'text-[15px] font-medium line-clamp-2' : 'text-lg font-semibold line-clamp-3'} overflow-hidden text-ellipsis text-link-blue group-hover:underline group-hover:decoration-link-blue`}
					>
						{product.title[locale]}
					</h3>
				</Link>
				<div className='h-7'>rating</div>
				<div className='w-full h-[64px] flex items-center justify-between'>
					{product.status === ProductStatus.IN_STOCK ? (
						<PriceAndAddCartComponent
							product={product}
							locale={locale}
							typePage={typePage}
						/>
					) : (
						<OtherStatusesProductBtnComponents
							status={product.status}
							locale={locale}
							typePage={typePage}
						/>
					)}
				</div>
				{typePage !== 'admin' && <p>Код товару:{product.sku}</p>}
			</div>
		</article>
	)
}

export default ProductCard
