import { Locale, Product } from '@/types/baseTypes'

import CartButtons from './CartButtons'
import ChangeCountBtn from './ChangeCountBtn'
import DeliveryPayment, { DeliveryTextByComponent } from './DeliveryPayment'
import ImagesGallery from './ImagesGallery'
import ToggleFavoriteButton from './ToggleFavoriteButton'
import BaseSection from './baseComponents/BaseSection'
import RatingCOmponent from './baseComponents/RatingCOmponent'

type HeroProductPageComponentProps = {
	product: Product
	locale: Locale
	deliveryTextByComponent: DeliveryTextByComponent
}

const HeroProductPageComponent = ({
	product,
	locale,
	deliveryTextByComponent
}: HeroProductPageComponentProps) => {
	const correctRating = product.rating ? parseFloat(Math.min(product.rating, 5).toFixed(1)) : 0

	return (
		<BaseSection className='xl:max-w-[1280px]!'>
			<div className='w-full flex flex-col lg:flex-row items-center justify-between gap-y-4 gap-x-6 mx-auto'>
				<ImagesGallery images={product.images} />
				<div className='w-full lg:w-[280px] flex flex-col gap-y-3 justify-between shrink-0'>
					<div className='w-full h-12 rounded-xl bg-other-4 rating-shadow flex items-center justify-center gap-x-3 order-1'>
						<p className='mt-1'>{locale === 'en' ? 'Rating:' : 'Рейтинг:'}</p>
						<RatingCOmponent
							productRating={correctRating}
							productId={product._id}
							productName={product.title[locale]}
						/>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3 order-2'>
						<ToggleFavoriteButton product={product} />
						<p className=''>
							{locale === 'en' ? 'Add to favorites' : 'Додати у вибране'}
						</p>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3 order-4 lg:order-3'>
						<p className='text-xl'>
							{locale === 'en' ? 'Price: ' : 'Ціна: '}
							{(product.price && product.price.toFixed(2)) ??
								(product.priceCurrency && product.priceCurrency.toFixed(2))}
							₴
						</p>
					</div>
					<div className='w-full h-12 flex items-center gap-x-3 order-3 lg:order-4'>
						<ChangeCountBtn product={product} />
					</div>
					<div className='w-full h-12 flex items-center justify-between gap-x-3 order-5'>
						<p className=''>{locale === 'en' ? 'Product code:' : 'Код товару:'}</p>
						<p className=''>{product.sku}</p>
					</div>
					<div className='w-full flex flex-col items-center justify-between gap-y-3 order-6'>
						<CartButtons product={product} locale={locale} />
					</div>
				</div>
				<div className='hidden lg:block'>
					<DeliveryPayment deliveryTextByComponent={deliveryTextByComponent} />
				</div>
			</div>
		</BaseSection>
	)
}
export default HeroProductPageComponent
