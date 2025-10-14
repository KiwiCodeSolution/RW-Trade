import { categories } from '../../data/categories'
import CategoryIcon from '../commonUI/CategoryIcon'

import Link from 'next/link'

const CategoriesSection = () => {
	const lang = 'uk'

	const title = {
		uk: 'Категорії товарів',
		en: 'Product categories'
	}

	const subcategories = [
		'Підкатегорія 1',
		'Підкатегорія 2',
		'Підкатегорія 3',
		'Підкатегорія 4',
		'Підкатегорія 5',
		'Підкатегорія 6',
		'Підкатегорія 7',
		'Підкатегорія 8',
		'Підкатегорія 9'
	]

	return (
		<section className='py-9'>
			<h2 className='font-bold text-[40px] mb-7 text-center'>{title[lang]}</h2>
			<div className='grid grid-cols-4 bg-sc-1/30 gap-0.5 pb-0.5'>
				{categories.map((item, index) => (
					<div key={index} className='flex flex-col pt-2 py-8 pb-8 bg-bg-light'>
						<div className='flex flex-col items-center'>
							<CategoryIcon
								category={item.category}
								size='m'
								bg={categories.length === index + 1 ? 'bronze' : 'primary'}
							/>
							<div className='min-h-16 flex justify-center items-center'>
								<h3
									className={`px-4 text-center font-semibold text-xl mx-auto  bg-clip-text text-transparent ${categories.length === index + 1 ? 'bg-bronze' : 'bg-primary'}`}
								>
									{item[lang]}
								</h3>
							</div>
						</div>

						<div
							className={`h-0.5 w-10/12 mb-2 mx-auto ${categories.length === index + 1 ? 'bg-bronze' : 'bg-primary'}`}
						></div>

						<ul className='w-10/12 mx-auto'>
							{subcategories.map((item, index) => {
								if (index > 6) return
								return (
									<li key={index} className='text-xl mb-4'>
										{item}
									</li>
								)
							})}
						</ul>

						<div className='mx-auto'>
							<Link
								href={`/category`}
								className={`text-center font-semibold ${categories.length === index + 1 ? 'bronze-text' : 'gradient-text'}`}
							>
								{subcategories.length > 7
									? `Та ще ${subcategories.length - 7} категорій у розділі --->`
									: 'Перейти у розділ --->'}
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default CategoriesSection
