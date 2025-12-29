import CategoriesAdminContainer from '@/components/adminUI/CategoriesAdminContainer'
import HeaderPage from '@/components/adminUI/HeaderPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Всі продукти | RW-Trade'
}
const Cards = () => {
	return (
		<div className='w-full relative'>
			<HeaderPage pageName='Всі продукти' />
			{/* <CategoriesControlAdminPage /> */}
			<CategoriesAdminContainer locale='uk' />
		</div>
	)
}

export default Cards
