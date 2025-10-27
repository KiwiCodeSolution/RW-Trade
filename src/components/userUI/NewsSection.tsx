import NewsCard from './NewsCard'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'
import { NewsArticle } from '@/app/[locale]/(public)/news/page'
import { getRandomNews } from '@/helpers'
import '@/styles/globals.css'

import { getTranslations } from 'next-intl/server'

type NewsSectionProps = {
	section: string
}

const NewsSection = async ({ section }: NewsSectionProps) => {
	const t = await getTranslations('NewsSectionAllPages')

	const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
		cache: 'no-store'
	})
	const posts = (await res.json()) as NewsArticle[]
	const randomNews = getRandomNews<NewsArticle>(posts)

	return (
		<BaseSection className='py-14'>
			<Title tag='h2' styles='text-center'>
				{section === 'main' ? t('title_homePage') : t('title_newsPage')}
			</Title>
			{section === 'main' && <p className='mt-4 text-center'>{t('subtitle_homePage')}</p>}

			<div className='grid lg:grid-cols-2 gap-10 py-10'>
				{randomNews.map((item, index) => (
					<div key={index}>
						<NewsCard article={item} />
					</div>
				))}
			</div>

			{/* {section === 'main' && (
				<div className='flex justify-center items-center'>
					<Link href='/news' className='link-solid'>
						{t('btn_homePage')}
					</Link>
				</div>
			)} */}
		</BaseSection>
	)
}

export default NewsSection
