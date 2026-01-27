import HeaderPage from '@/components/adminUI/HeaderPage'
import CategoriesSection from '@/components/userUI/CategoriesSection'

import { fetchPublicCategories } from '@/api/api-fetch/categories'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Категорії та фільтри | RW-Trade'
}

const CategoriesAndFilters = async () => {
	const categories = await fetchPublicCategories()

	return (
		<div className='w-full'>
			<HeaderPage pageName='Категорії та фільтри' />

			<CategoriesSection section='admin' locale='uk' initialCategories={categories} />
		</div>
	)
}

export default CategoriesAndFilters
