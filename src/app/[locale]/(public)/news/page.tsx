import { Locale } from '@/types/baseTypes'

import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'RW-Trade | Новини та статті',
	description: 'Новини та статті'
}

// async function getAllNews() {
// 	const res = await getNewsWithPagination({ page: 1, limit: 20 })

// 	return res
// }

const News = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params
	// const news = await getAllNews()

	// return (
	// 	<main className='min-h-[80vh]'>
	// 		<div className='header-shadow' />
	// 		<BaseSection>
	// 			<Title tag='h1' isPageTitle styles='text-center my-5'>
	// 				{locale === 'uk' ? 'Новини та статті' : 'News and Articles'}
	// 			</Title>
	// 		</BaseSection>
	// 		<NewsList locale={locale} posts={news.items} />
	// 	</main>
	// )

	redirect(`/${locale}/catalog`)
}

export default News
