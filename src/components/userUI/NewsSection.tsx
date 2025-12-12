'use client'

import { Locale, NewsArticle } from '@/types/baseTypes'

import { getNewsWithPagination } from '@/api/news'

import NewsCard from './NewsCard'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import { useEffect, useState } from 'react'

type NewsSectionProps = {
	section: string
	title: string[]
	subtitle: string
	locale: Locale
	bntText: string
}

const NewsSection = ({ section, title, subtitle, locale, bntText }: NewsSectionProps) => {
	const [news, setNews] = useState<NewsArticle[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchNews = async () => {
			const res = await getNewsWithPagination({ page: 1, limit: 20 })
			setNews(res.data)
			setLoading(false)
		}
		fetchNews()
	}, [])

	if (loading) return <div>Loading...</div>

	const articles = news.filter(n => !n.isNews).length > 2 ? news.filter(n => !n.isNews) : news

	return (
		<BaseSection className='py-14'>
			<Title tag='h2' styles='text-center'>
				{section === 'main' ? title[0] : title[1]}
			</Title>
			{section === 'main' && <p className='mt-4 text-center'>{subtitle}</p>}

			<div className='w-full flex items-center justify-center gap-x-10 py-10'>
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

			{section === 'main' && (
				<div className='flex justify-center items-center'>
					<Link href='/news' className='link-solid'>
						{bntText}
					</Link>
				</div>
			)}
		</BaseSection>
	)
}

export default NewsSection
