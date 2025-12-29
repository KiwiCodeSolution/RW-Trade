import HeaderPage from '@/components/adminUI/HeaderPage'
import CategoriesSection from '@/components/userUI/CategoriesSection'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Категорії та фільтри | RW-Trade'
}

const CategoriesAndFilters = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Категорії та фільтри' />

			<CategoriesSection section='admin' locale='uk' />
		</div>
	)
}

export default CategoriesAndFilters
