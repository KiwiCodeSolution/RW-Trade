'use client'

import { Locale } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import CategoryIcon from '../commonUI/CategoryIcon'

import ExtraCategories from './ExtraCategories'
import { Link } from '@/i18n/navigation'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

type CategorySectionProps = {
	section: 'client' | 'admin'
	title?: string
	locale: Locale
}

const CategoriesSection = observer(({ section, title, locale }: CategorySectionProps) => {
	const { categories } = categoryStore

	useEffect(() => {
		if (categories.length > 0) return
		categoryStore.fetchCategories()
	}, [])

	return (
		<section className='py-9'>
			{section === 'client' ? (
				<h2 className='font-bold text-[40px] mb-7 text-center'>{title}</h2>
			) : (
				<h2 className='font-bold text-2xl mb-7 text-center'>
					Оберіть категорію для налаштування
				</h2>
			)}

			<div className='grid grid-cols-4 bg-sc-1/30 gap-0.5 pb-0.5'>
				{categories.map((item, index) => (
					<div key={index} className='flex flex-col pt-2 py-8 pb-8 bg-bg-light'>
						<div className='flex flex-col items-center'>
							<CategoryIcon
								category={item.title['en']}
								size='m'
								bg={categories.length === index + 1 ? 'bronze' : 'primary'}
							/>

							<div className='min-h-16 flex justify-center items-center'>
								{section === 'admin' && item.title['en'] !== 'Discounts' ? (
									<Link
										href={`/manage-panel/categories_filters/${item._id}`}
										className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent ${
											categories.length === index + 1
												? 'bg-bronze'
												: 'bg-primary'
										}`}
									>
										{item.title[locale]}
									</Link>
								) : (
									<h3
										className={`px-4 text-center font-semibold text-xl mx-auto bg-clip-text text-transparent ${
											categories.length === index + 1
												? 'bg-bronze'
												: 'bg-primary'
										}`}
									>
										{item.title[locale]}
									</h3>
								)}
							</div>
						</div>

						<div
							className={`h-0.5 w-10/12 mb-2 mx-auto ${categories.length === index + 1 ? 'bg-bronze' : 'bg-primary'}`}
						></div>

						{section === 'client' && (
							<>
								{item.subcategories && item.subcategories.length > 0 && (
									<div className='w-10/12 mx-auto grid grid-cols gap-y-4 my-5'>
										{item.subcategories.map((sub, index) => {
											if (index > 6) return
											return (
												<div key={index} className='text-xl leading-[1.4]'>
													{sub.title[locale]}
												</div>
											)
										})}
									</div>
								)}
								<div className='mx-auto mt-auto'>
									<Link
										href={`/catalog/${item.slug}`}
										className={`text-center font-semibold ${categories.length === index + 1 ? 'bronze-text' : 'gradient-text'}`}
									>
										{item.subcategories && item.subcategories.length > 7 ? (
											<ExtraCategories
												count={item.subcategories.length - 7}
											/>
										) : locale === 'uk' ? (
											'Перейти у розділ --->'
										) : (
											'Go to section --->'
										)}
									</Link>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</section>
	)
})

export default CategoriesSection
