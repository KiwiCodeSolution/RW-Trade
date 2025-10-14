import { Locale } from '@/types/baseTypes'

import NewsCard from './NewsCard'
import { getDictionary } from '@/app/dictionaries/get-dictionary'
import { getRandomNews } from '@/helpers'
import '@/styles/globals.css'

import Link from 'next/link'

type NewsSectionProps = {
	isMain: boolean
	locale: Locale
}

const NewsSection = async ({ isMain, locale }: NewsSectionProps) => {
	const dictionary = await getDictionary({ locale })

	const res = await fetch('https://jsonplaceholder.typicode.com/posts')
	const posts = await res.json()
	const randomNews = getRandomNews(posts)

	return (
		<section className='py-14'>
			<h3 className='font-bold text-[40px] text-center'>
				{/* {isMain ? content[0][lang].title : content[1][lang].title } */}
				{dictionary.news.title}
			</h3>
			<div className='grid lg:grid-cols-2 gap-10 py-10'>
				{randomNews.map((item, index) => (
					<div key={index}>
						<NewsCard article={item} />
					</div>
				))}
			</div>
			<div className='flex justify-center items-center'>
				<Link href='/news' className='link-solid'>
					{/* Всі новини та статті */}
					{dictionary.news.viewAll}
				</Link>
			</div>
		</section>
	)
}

export default NewsSection
