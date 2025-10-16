import { Category } from '@/types/baseTypes'

import CategoryCard from './CategoryCard'
import ProductCard from './ProductCard'

type CardRowProps = {
	category?: Category // необов'язково для секції discounts
	section: 'popular' | 'discounts'
}

const CardRow = ({ category, section }: CardRowProps) => {
	return (
		<div className='grid h-[505px] min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6 overflow-hidden'>
			{/* Якщо популярна секція, і category існує */}
			{section === 'popular' && <CategoryCard category={category} />}
			{/* Товари завжди */}
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	)
}

export default CardRow
