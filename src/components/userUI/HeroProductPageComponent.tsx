import { ProductPrint } from '@/types/baseTypes'

import CartButtons from './CartButtons'
import ChangeCountBtn from './ChangeCountBtn'
import DeliveryPayment from './DeliveryPayment'
import ImagesGallery from './ImagesGallery'
import ToggleFavoriteButton from './ToggleFavoriteButton'
import BaseSection from './baseComponents/BaseSection'
import RatingCOmponent from './baseComponents/RatingCOmponent'

const HeroProductPageComponent = ({ product, locale }: ProductPrint) => {
	const testImages = [
		'/images/products/1.jpg',
		'/images/products/2.png',
		'/images/products/3.jpg',
		'/images/products/4.jpg',
		'/images/products/5.webp',
		'/images/products/6.webp',
		'/images/products/7.jpg',
		'/images/products/8.jpg'
	]

	const images = product.images && product.images.length > 0 ? product.images : testImages
	const correctRating = product.rating ? parseFloat(Math.min(product.rating, 5).toFixed(1)) : 0

	return (
		<BaseSection>
			<div className='w-full xl:w-[1280px] flex items-center justify-between gap-x-6 mx-auto'>
				<ImagesGallery images={images} />
				<div className='w-[280px] flex flex-col gap-y-3 justify-between shrink-0'>
					<div className='w-full h-12 rounded-xl bg-other-4 rating-shadow flex items-center justify-center gap-x-3'>
						<p className='mt-1'>{locale === 'en' ? 'Rating:' : 'Рейтинг:'}</p>
						<RatingCOmponent
							productRating={correctRating}
							productId={product._id}
							productName={product.title[locale]}
						/>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3'>
						<ToggleFavoriteButton product={product} />
						<p className=''>
							{locale === 'en' ? 'Add to favorites' : 'Додати у вибране'}
						</p>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3'>
						<p className='text-xl'>
							{locale === 'en' ? 'Price:' : 'Ціна:'}
							{(product.price && product.price.toFixed(2)) ??
								(product.priceCurrency && product.priceCurrency.toFixed(2))}
							₴
						</p>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3'>
						<ChangeCountBtn product={product} />
					</div>
					<div className='w-full h-12 flex items-center justify-between gap-x-3'>
						<p className=''>{locale === 'en' ? 'Product code:' : 'Код товару:'}</p>
						<p className=''>{product.sku}</p>
					</div>
					<div className='w-full flex flex-col items-center justify-between gap-y-3'>
						<CartButtons product={product} locale={locale} />
					</div>
				</div>
				<DeliveryPayment />
			</div>
		</BaseSection>
	)
}
export default HeroProductPageComponent
