'use client'

import { Locale } from '@/types/baseTypes'
import { NewsArticle } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import NewsSection from './NewsSection'

import { useEffect } from 'react'

const NewsSectionClient = ({
	data,
	section,
	title,
	subtitle,
	locale,
	bntText
}: {
	data: { items: NewsArticle[]; totalItems: number }
	section: string
	title: string[]
	subtitle: string
	locale: Locale
	bntText: string
}) => {
	useEffect(() => {
		newsStore.setNews(data.items, data.totalItems)
	}, [data])

	return (
		<NewsSection
			section={section}
			title={title}
			subtitle={subtitle}
			locale={locale}
			bntText={bntText}
		/>
	)
}

export default NewsSectionClient
