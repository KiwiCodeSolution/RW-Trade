import NewsSection from '@/components/userUI/NewsSection'

import { Locale } from '@/types/baseTypes'

const OneNews = async ({ params }: { params: Promise<{ locale: Locale; newsId: string }> }) => {
	const { locale, newsId } = await params
	const resNews = await fetch(`https://jsonplaceholder.typicode.com/posts/${newsId}`)
	const post = await resNews.json()
	const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${newsId}/comments`)
	const comments = await resComments.json()

	return (
		<div className='user-container'>
			<div className='py-4 mb-4'>
				<div className='flex items-center mb-8'>
					<div className='w-[100px] h-[100px] min-w-[100px] flex justify-center items-center mr-8'>
						{!!post?.imgUrl ? (
							<img src={post.imgUrl} alt={post.title} />
						) : (
							<img src='/logos/LOGO 152 blue.png' alt={post.title} />
						)}
					</div>
					<h2 className='text-5xl'>{post.title}</h2>
				</div>
				<p>{post.body}</p>
			</div>
			<div>
				{comments.map(({ item, index }: any) => (
					<p key={`com${index}`}>
						{item.body} {item.name}
					</p>
				))}
			</div>
			<NewsSection isMain={false} locale={locale} />
		</div>
	)
}

export default OneNews
