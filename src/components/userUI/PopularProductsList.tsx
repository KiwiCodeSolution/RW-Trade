import { Locale, Product } from '@/types/baseTypes'

import ProductCard from './ProductCard'
import ScrollableTrack from './ScrollableTrack'
import Title from './baseComponents/Title'

const PopularProductsList = ({ products, locale }: { products: Product[]; locale: Locale }) => {
	if (!products || products.length === 0) return null

	return (
		<div className='w-full flex flex-col  gap-4'>
			<Title tag='h2' styles='lg:text-center'>
				{locale === 'uk' ? 'Найпопулярніші товари цієї категорії' : 'Most popular products'}
			</Title>

			{/* Desktop: тільки 3 картки */}
			<div className='hidden lg:flex gap-4 mx-auto items-center justify-between'>
				{products.slice(0, 4).map(product => (
					<ProductCard key={product._id} product={product} locale={locale} />
				))}
			</div>

			{/* Mobile: всі картки у скролі */}
			<div className='w-full lg:hidden'>
				<ScrollableTrack thumbWidth={120}>
					{products.map(product => (
						<ProductCard key={product._id} product={product} locale={locale} />
					))}
				</ScrollableTrack>
			</div>
		</div>
	)
}

export default PopularProductsList
