import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderPage from '@/components/adminUI/HeaderPage'
import NewsForm from '@/components/adminUI/formsComponents/NewsForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Створити новину | RW-Trade'
}
export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const pageName = id ? 'Редагування новини / запису' : 'Створення новини / запису'

	return (
		<div className='w-full h-full relative'>
			<HeaderPage pageName={pageName} />
			<NewsForm />
			<GoBackBtn />
		</div>
	)
}
