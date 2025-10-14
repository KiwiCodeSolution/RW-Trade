import NewsCard from '@/components/userUI/NewsCard'

import { Locale } from '@/types/baseTypes'

const News = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	const res = await fetch('https://jsonplaceholder.typicode.com/posts')
	const posts = await res.json()

	return (
		<div className='user-container'>
			<h3 className='font-bold text-[40px] text-center'>
				{locale === 'uk' ? 'Новини та статті' : 'News and Articles'}
			</h3>
			<div className='grid lg:grid-cols-2 gap-10 py-10'>
				{posts.map((item, index) => (
					<div key={index}>
						<NewsCard article={item} />
					</div>
				))}
			</div>
		</div>
	)
}

export default News
