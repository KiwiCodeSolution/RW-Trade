import NewsSection from '@/components/userUI/NewsSection'
import VideoBlock from '@/components/userUI/VideoBlock'
import BaseImageItem from '@/components/userUI/baseComponents/BaseImageItem'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import HtmlContent from '@/components/userUI/baseComponents/HtmlContent'
import Title from '@/components/userUI/baseComponents/Title'

import { BASE_URL } from '@/utils/config'

import { LangField, Locale, NewsArticle } from '@/types/baseTypes'

import { getTranslations } from 'next-intl/server'

type Params = { locale: Locale; slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
	const { slug, locale } = await params

	const res = await fetch(`${BASE_URL}/news/slug/${slug}`, { cache: 'no-cache' })
	const post = (await res.json()) as NewsArticle
	const seo = post.seo

	if (!post || !seo) return null

	return {
		title: post.title[locale] ?? post.title.uk,
		description: seo.description?.[locale] ?? seo.description?.uk,
		keywords: (seo.keywords as LangField)[locale] ?? (seo.keywords as string[])
	}
}

export default async function OneNews({ params }: { params: Promise<Params> }) {
	const { slug, locale } = await params

	const t = await getTranslations({ locale })

	const titles = [
		t('NewsSectionAllPages.title_homePage'),
		t('NewsSectionAllPages.title_newsPage')
	]

	const res = await fetch(`${BASE_URL}/news/slug/${slug}`, { cache: 'no-cache' })
	const post = (await res.json()) as NewsArticle

	if (!post) return null

	return (
		<BaseSection className='xl:max-w-[1280px]!'>
			<div className='py-4 mb-4 mx-auto'>
				<div className='flex items-center mb-4 lg:mb-8'>
					<div className='w-[100px] h-[100px] min-w-[100px] flex justify-center items-center mr-8'>
						{post.image && (
							<BaseImageItem
								width={100}
								height={100}
								src={post.image}
								alt={post.title[locale] ?? post.title.uk}
							/>
						)}
					</div>
					<Title tag='h1' isPageTitle styles='my-5'>
						{post.title[locale] ?? post.title.uk}
					</Title>
				</div>
				{post.subtitle && (
					<h3 className='mb-4'>{post.subtitle[locale] ?? post.subtitle.uk}</h3>
				)}
				{post.videoUrl && <VideoBlock videoUrl={post.videoUrl} />}

				<HtmlContent html={post.content[locale]} className='mt-4' />
			</div>

			<NewsSection
				section='news'
				locale={locale}
				title={titles}
				subtitle={t('NewsSectionAllPages.subtitle_homePage')}
				bntText={t('NewsSectionAllPages.btn_homePage')}
			/>
		</BaseSection>
	)
}
