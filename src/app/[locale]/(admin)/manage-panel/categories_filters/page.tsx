import HeaderPage from '@/components/adminUI/HeaderPage'
import MessagesList from '@/components/adminUI/MessagesList'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Категорії та фільтри | RW-Trade'
}

const CategoriesAndFilters = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Категорії та фільтри' />
			<MessagesList />
		</div>
	)
}

export default CategoriesAndFilters
