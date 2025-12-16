import { Locale, Product } from '@/types/baseTypes'

import AdminRatingComponent from '../adminUI/AdminRatingComponent'

import ProductInfoComponent from './ProductInfoComponent'
import ToggleFavoriteButton from './ToggleFavoriteButton'
import BaseImageItem from './baseComponents/BaseImageItem'
import RatingCOmponent from './baseComponents/RatingCOmponent'
import { Link } from '@/i18n/navigation'

type ProductCardProps = {
	product: Product
	locale: Locale
	type?: 'our' | 'partners'
	typePage?: 'client' | 'admin'
}
const ProductCard = ({ locale, type, typePage, product }: ProductCardProps) => {
	const bgColor = type === 'partners' ? 'bg-other-2' : 'bg-other-1'

	const correctRating = product.rating
		? product.rating > 5
			? 5.0
			: Number(product.rating.toFixed(1))
		: 0

	return (
		<article
			className={`${typePage === 'admin' ? 'h-[317px] w-full min-w-[162px] max-w-[162px]' : 'h-[317px] xl:h-[505px] w-full min-w-[162px] xl:min-w-[278px] max-w-[330px]'} rounded-md border-2 border-sc-1 flex flex-col justify-between items-center relative product-card-shadow`}
		>
			<div className='w-full h-[55px] absolute top-0 left-0 flex items-center justify-between p-1'>
				<div className='h-full flex flex-col gap-y-1 items-center'>
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

			<div
				className={`${typePage === 'admin' ? 'h-[162px]' : 'h-[162px] xl:h-[265px]'} w-full overflow-hidden`}
			>
				<BaseImageItem
					src={product.images && product.images[0]}
					alt={product.title[locale]}
					width={typePage === 'admin' ? 162 : 300}
					height={typePage === 'admin' ? 162 : 300}
					className={`w-full min-w-[162px] xl:min-w-[278px] max-w-[330px] object-cover min-h-[162px] xl:h-full`}
				/>
			</div>
			<div
				className={`${typePage === 'admin' ? 'w-full h-[147px] p-2' : 'w-full h-[147px] xl:h-[240px] p-2 xl:p-3 xl:gap-y-2'} flex flex-col justify-center ${bgColor}`}
			>
				<Link
					href={`/product/${locale === 'en' ? product.slugEn : product.slugUk}`}
					className='cursor-pointer group h-[80px] xl:h-[72px]'
				>
					<h3
						className={`${typePage === 'admin' ? 'text-[15px] font-medium line-clamp-2' : 'text-[15px] font-medium line-clamp-2 xl:text-lg xl:font-semibold xl:line-clamp-3'} overflow-hidden text-ellipsis text-link-blue group-hover:underline group-hover:decoration-link-blue`}
					>
						{product.title[locale]}
					</h3>
				</Link>
				{typePage === 'admin' ? (
					<AdminRatingComponent productRating={correctRating} />
				) : (
					<RatingCOmponent
						productRating={correctRating}
						productId={product._id}
						productName={product.title[locale]}
					/>
				)}

				<div className='w-full h-[64px] flex items-center justify-between'>
					<ProductInfoComponent product={product} locale={locale} typePage={typePage} />
				</div>
				{typePage !== 'admin' && (
					<p className='hidden xl:block'>Код товару:{product.sku}</p>
				)}
			</div>
		</article>
	)
}

export default ProductCard
