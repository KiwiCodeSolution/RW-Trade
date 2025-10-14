import Link from 'next/link'
import React from 'react'

const CategoryCard = ({ category }) => {
	return (
		<div className='h-[505px] w-full min-w-[278px] max-w-[360px] rounded-md border-2 border-sc-1 p-3 flex flex-col justify-between'>
			<div>
				<h3 className='gradient-text font-semibold text-[28px] mb-4'>{category.title}</h3>
				<div className='w-full h-1 bg-primary rounded-full mb-4'></div>
				<ul>
					{category.subcategories.map((item, index) => {
						if (index > 6) return
						return (
							<li key={index} className='text-xl mb-4'>
								{item}
							</li>
						)
					})}
				</ul>
			</div>
			<div className='mb-3'>
				<Link href={'/category'} className='gradient-text text-center font-semibold'>
					{category.subcategories.length > 7
						? `Та ще ${category.subcategories.length - 7} категорій у розділі --->`
						: 'Перейти у розділ --->'}
				</Link>
			</div>
		</div>
	)
}

export default CategoryCard
