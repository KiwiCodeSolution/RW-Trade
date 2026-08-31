import CategoriesAdminContainer from '@/components/adminUI/CategoriesAdminContainer'
import HeaderPage from '@/components/adminUI/HeaderPage'

import { fetchPublicCategories } from '@/api/api-fetch/categories'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Всі продукти | RW-Trade'
}
const Cards = async () => {
	const categories = await fetchPublicCategories()

	return (
		<div className='w-full relative'>
			<HeaderPage pageName='Всі продукти' />
			{/* <CategoriesControlAdminPage /> */}
			<CategoriesAdminContainer locale='uk' initialCategories={categories} />
		</div>
	)
}

export default Cards
