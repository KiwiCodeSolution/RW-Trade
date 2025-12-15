'use client'

import { Locale } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import Spinner from '../commonUI/loader/Spinner'

import NewsCard from './NewsCard'
import NewsGallery from './NewsGallery'
import Title from './baseComponents/Title'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

type NewsSectionProps = {
	section: string
	title: string[]
	subtitle: string
	locale: Locale
	bntText: string
}

const NewsSection = observer(({ section, title, subtitle, locale, bntText }: NewsSectionProps) => {
	const { news, isLoading } = newsStore

	useEffect(() => {
		newsStore.fetchNews({
			page: 1,
			limit: 6,
			sort: 'date_desc'
		})
	}, [])

	if (isLoading) return <Spinner />

	const articles = news.filter(n => !n.isNews).length > 2 ? news.filter(n => !n.isNews) : news

	return (
		<section className={section === 'main' ? 'py-14' : 'lg:py-10'}>
			<Title tag='h2' styles='text-center'>
				{section === 'main' ? title[0] : title[1]}
			</Title>
			{section === 'main' && <p className='mt-1 lg:mt-4 lg:text-center'>{subtitle}</p>}

			<div className='w-full hidden lg:flex items-center justify-center gap-x-10 py-10'>
				<div className='w-full lg:w-1/2 grid lg:grid-rows-3 gap-10 '>
					{news
						.filter(n => n.isNews)
						.map((item, index) => (
							<div key={index}>
								<NewsCard article={item} locale={locale} />
							</div>
						))}
				</div>
				<div className='w-full lg:w-1/2 grid lg:grid-rows-3 gap-10 '>
					{articles.map((item, index) => (
						<div key={index}>
							<NewsCard article={item} locale={locale} />
						</div>
					))}
				</div>
			</div>
			<NewsGallery news={news} />

			{section === 'main' && (
				<div className='flex justify-center items-center'>
					<Link href='/news' className='link-solid'>
						{bntText}
					</Link>
				</div>
			)}
		</section>
	)
})

export default NewsSection
