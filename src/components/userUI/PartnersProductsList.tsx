import { Locale, Product } from '@/types/baseTypes'

import ProductCard from './ProductCard'
import ScrollableTrack from './ScrollableTrack'
import Title from './baseComponents/Title'

const PartnersProductsList = ({ products, locale }: { products: Product[]; locale: Locale }) => {
	if (!products || products.length === 0) return null

	return (
		<div className='w-full lg:w-fit flex flex-col gap-4 mt-4 lg:mt-0'>
			<Title tag='h3' styles='lg:text-center'>
				{locale === 'uk' ? 'Найкращі пропозиції партнерів' : 'Best offers from partners'}
			</Title>

			{/* Desktop: тільки 3 картки */}
			<div className='hidden lg:flex flex-col gap-4 mx-auto'>
				{products.slice(0, 3).map(product => (
					<ProductCard
						key={product._id}
						product={product}
						locale={locale}
						type='partners'
					/>
				))}
			</div>

			{/* Mobile: всі картки у скролі */}
			<div className='w-full lg:hidden'>
				<ScrollableTrack thumbWidth={120}>
					{products.map(product => (
						<ProductCard
							key={product._id}
							product={product}
							locale={locale}
							type='partners'
						/>
					))}
				</ScrollableTrack>
			</div>
		</div>
	)
}

export default PartnersProductsList
