import { Category, Locale } from '@/types/baseTypes'

import CategoryCard from '../userUI/CategoryCard'

type Props = {
	categories: Category[]
	locale: Locale
}

export const AdminCategoriesGrid = ({ categories, locale }: Props) => {
	const rows = categories.reduce<Category[][]>((acc, item, i) => {
		const row = Math.floor(i / 4)
		acc[row] ||= []
		acc[row].push(item)
		return acc
	}, [])

	return (
		<div className='bg-sc-1/30'>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex}>
					<div className='grid grid-cols-4 gap-0.5'>
						{row.map((item, i) => (
							<CategoryCard
								key={item._id}
								item={item}
								locale={locale}
								section='admin'
								isLast={false}
							/>
						))}
					</div>

					{rowIndex !== rows.length - 1 && (
						<div className='h-px bg-primary/40 mx-10 my-5' />
					)}
				</div>
			))}
		</div>
	)
}
