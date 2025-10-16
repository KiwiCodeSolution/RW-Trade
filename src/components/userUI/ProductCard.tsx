import { Locale, Product } from '@/types/baseTypes'

import ToggleFavoriteButton from './ToggleFavoriteButton'
import { Link } from '@/i18n/navigation'

import Image from 'next/image'

type ProductCardProps = {
	product: Product
	locale: Locale
}
const ProductCard = ({ product, locale }: ProductCardProps) => {
	return (
		<article className='h-[505px] w-full min-w-[278px] max-w-[330px] rounded-md border-2 border-sc-1'>
			<Link
				href={`/product/${locale === 'en' ? product.slugEn : product.slugUk}`}
				className='w-full h-full flex flex-col justify-between items-center relative'
			>
				<div className='w-full h-fit absolute top-0 left-0 flex items-center justify-between p-1'>
					<div className='flex flex-col gap-y-1'>
						{product.isHit && (
							<span className='w-[42px] h-11 rounded-tl-lg rounded-br-lg bg-sc-4 uppercase text-xs font-medium flex'>
								{locale === 'en' ? 'Hit' : 'Хіт'}
							</span>
						)}
						{product.newArrival && (
							<span className='w-[42px] h-11 rounded-tl-lg rounded-br-lg bg-link-blue uppercase text-xs font-medium flex text-white'>
								New
							</span>
						)}
					</div>
					<ToggleFavoriteButton id={product._id} />
				</div>

				<div className='h-[265px] w-full overflow-hidden'>
					<Image
						src={
							(product.images && product.images[0]) ??
							'/public/logos/LOGO_252_blue.png'
						}
						alt={product.title[locale]}
						width={300}
						height={300}
						className='w-full min-w-[278px] max-w-[330px] object-cover h-full'
					/>
				</div>

				<div className='p-3 flex flex-col gap-y-2'>
					<h3 className='text-lg font-semibold text-link-blue'>
						{product.title[locale]}
					</h3>
					<div>rating</div>
					<div className='flex items-center justify-between'>
						<PriceComponent price={product.price} locale={locale} />
					</div>
				</div>
			</Link>
		</article>
	)
}

export default ProductCard
