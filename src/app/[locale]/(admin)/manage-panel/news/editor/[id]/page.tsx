'use client'

import GoBackBtn from '@/components/adminUI/GoBackBtn'
import HeaderPage from '@/components/adminUI/HeaderPage'
import NewsForm from '@/components/adminUI/formsComponents/NewsForm'

import { NewsArticle } from '@/types/baseTypes'

import { getNewsById } from '@/api/news'

import { use, useEffect, useState } from 'react'

interface PageProps {
	params: { id: string } // тут вже не Promise
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params) // unwrap Promise
	const [news, setNews] = useState<NewsArticle | undefined>(undefined)

	useEffect(() => {
		if (id) getNewsById(id).then(setNews).catch(console.error)
	}, [id])

	const pageName = id ? 'Редагування новини / запису' : 'Створення новини / запису'

	return (
		<div className='w-full h-full relative'>
			<HeaderPage pageName={pageName} />
			<NewsForm news={news} />
			<GoBackBtn />
		</div>
	)
}
