import CategoriesControlAdminPage from '@/components/adminUI/CategoriesControlAdminPage'
import HeaderPage from '@/components/adminUI/HeaderPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Всі продукти | RW-Trade'
}
const Cards = () => {
	return (
		<div className='w-full relative'>
			<HeaderPage pageName='Всі продукти' />
			<CategoriesControlAdminPage />
		</div>
	)
}

export default Cards
