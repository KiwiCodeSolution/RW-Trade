'use client'

import { Locale } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import Spinner from '../commonUI/loader/Spinner'

import NewsCard from './NewsCard'
import NewsGallery from './NewsGallery'
import Title from './baseComponents/Title'
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

const NewsSection = observer(({ section, title, subtitle, locale }: NewsSectionProps) => {
	const { news, isLoading } = newsStore

	useEffect(() => {
		newsStore.fetchNews({
			page: 1,
			limit: 6,
			sort: 'date_desc'
		})
	}, [])

	if (isLoading) return <Spinner />

	// фільтруємо новини та статті
	const nonNews = news.filter(n => !n.isNews)
	const allNews = news.filter(n => n.isNews)
	const rightBlock = nonNews.length > 0 ? nonNews.slice(0, 3) : allNews.slice(0, 3)

	return (
		<section className={section === 'main' ? 'py-14' : 'lg:py-10'}>
			<Title tag='h2' styles='text-center'>
				{section === 'main' ? title[0] : title[1]}
			</Title>
			{section === 'main' && <p className='mt-1 lg:mt-4 lg:text-center'>{subtitle}</p>}

			<div className='w-full hidden lg:flex items-center justify-center gap-x-10 py-10'>
				{/* Лівий блок — новини */}
				<div className='w-full lg:w-1/2 grid lg:grid-rows-3 gap-10 '>
					{allNews.map((item, index) => (
						<div key={index}>
							<NewsCard article={item} locale={locale} />
						</div>
					))}
				</div>

				{/* Правий блок — статті або новини */}
				<div className='w-full lg:w-1/2 grid lg:grid-rows-3 gap-10 '>
					{rightBlock.map((item, index) => (
						<div key={index}>
							<NewsCard article={item} locale={locale} />
						</div>
					))}
				</div>
			</div>

			<NewsGallery news={news} />
		</section>
	)
})

export default NewsSection
