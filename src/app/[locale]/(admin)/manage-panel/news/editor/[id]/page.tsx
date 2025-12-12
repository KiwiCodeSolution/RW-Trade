import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderPage from '@/components/adminUI/HeaderPage'
import NewsForm from '@/components/adminUI/formsComponents/NewsForm'

import { getNewsById } from '@/api/news'

import { authOptions } from '@/lib/authOptions'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
	title: 'Новина | RW-Trade'
}
export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const pageName = id ? 'Редагування новини / запису' : 'Створення новини / запису'
	const session = await getServerSession(authOptions)
	const token = session?.user?.accessToken
	const news = await getNewsById(id, token || '')

	console.log(news)

	return (
		<div className='w-full h-full relative'>
			<HeaderPage pageName={pageName} />
			<NewsForm news={news} />
			<GoBackBtn />
		</div>
	)
}
