import { NewsArticle } from '@/app/[locale]/(public)/news/page'

import Link from 'next/link'

const NewsCard = ({ article }: { article: NewsArticle }) => {
	return (
		<Link href={`/news/${article.id}`}>
			<div className='bg-primary h-[132px] w-full rounded-2xl p-4 flex gap-4'>
				<div className='w-[100px] h-[100px] min-w-[100px] flex justify-center items-center'>
					{!!article.imgUrl ? (
						<img src={article.imgUrl} alt={article.title} />
					) : (
						<img src='/logos/LOGO_152_blue.png' alt={article.title} />
					)}
				</div>
				<div className='text-white'>
					<h4 className='font-semibold text-xl mb-2 line-clamp-2'>{article.title}</h4>
					<p className='line-clamp-2'>{article?.body}</p>
				</div>
			</div>
		</Link>
	)
}

export default NewsCard
