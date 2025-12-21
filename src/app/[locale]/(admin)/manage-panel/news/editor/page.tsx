import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderPage from '@/components/adminUI/HeaderPage'
import NewsForm from '@/components/adminUI/formsComponents/NewsForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Створення запису | RW-Trade'
}
export default function page() {
	return (
		<div className='w-full h-full relative'>
			<HeaderPage pageName='Новини та записи' />
			<NewsForm />
			<GoBackBtn />
		</div>
	)
}
