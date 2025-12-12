import NewsSection from '@/components/userUI/NewsSection'
import VideoBlock from '@/components/userUI/VideoBlock'
import BaseImageItem from '@/components/userUI/baseComponents/BaseImageItem'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import HtmlContent from '@/components/userUI/baseComponents/HtmlContent'

import { BASE_URL } from '@/utils/config'

import { Locale, NewsArticle } from '@/types/baseTypes'

import { getTranslations } from 'next-intl/server'

type Params = { locale: Locale; slug: string }

const OneNews = async ({ params }: { params: Promise<Params> }) => {
	const { slug, locale } = await params
	console.log(slug)

	const t = await getTranslations({ locale })
	const titles = [
		t('NewsSectionAllPages.title_homePage'),
		t('NewsSectionAllPages.title_newsPage')
	]
	const res = await fetch(`${BASE_URL}/news/slug/${slug}`, { cache: 'no-cache' })
	const post = (await res.json()) as NewsArticle

	console.log(post)

	if (!post) return null

	return (
		<BaseSection>
			<div className='py-4 mb-4 mx-auto'>
				<div className='flex items-center mb-8'>
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
					<h2 className='text-5xl'>{post.title[locale] ?? post.title.uk}</h2>
				</div>
				{post.subtitle && <h3 className=''>{post.subtitle[locale] ?? post.subtitle.uk}</h3>}
				{post.videoUrl && <VideoBlock videoUrl={post.videoUrl} />}

				<HtmlContent html={post.content[locale]} />
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

export default OneNews
