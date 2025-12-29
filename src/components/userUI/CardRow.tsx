import { Category, Locale, Product } from '@/types/baseTypes'

import CategoryCard from './CategoryCard'
import ProductCard from './ProductCard'

type CardRowProps = {
	category?: Category // необов'язково для секції discounts
	section: 'popular' | 'discounts'
	locale: Locale
	products?: Product[]
}

const CardRow = ({ category, section, locale, products }: CardRowProps) => {
	return (
		<div className='grid h-[680px] lg:h-[505px] max-[939px]:grid-cols-2 min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-4 lg:gap-6 overflow-hidden'>
			{/* Якщо популярна секція, і category існує */}
			{section === 'popular' && <CategoryCard category={category} locale={locale} />}
			{products?.map(p => (
				<ProductCard locale={locale} product={p} key={p._id} />
			))}
		</div>
	)
}

export default CardRow
