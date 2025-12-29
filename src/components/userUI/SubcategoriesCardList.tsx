import { Locale, Subcategory } from '@/types/baseTypes'

const SubcategoriesCardList = ({
	subcategories,
	currentLocale
}: {
	subcategories: Subcategory[]
	currentLocale: Locale
}) => {
	return (
		subcategories &&
		subcategories.length > 0 && (
			<div className='flex flex-col gap-y-4'>
				{subcategories.slice(0, 7).map((item, index) => (
					<div key={index} className='list-none text-xl leading-[1.4]'>
						{item.title[currentLocale] ?? ''}
					</div>
				))}
			</div>
		)
	)
}
export default SubcategoriesCardList
