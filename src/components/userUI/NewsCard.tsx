import { EditIcon, Trash, YoutubeIcon } from '@/assets/icons'

import { Locale, NewsArticle } from '@/types/baseTypes'

import BaseImageItem from './baseComponents/BaseImageItem'

import Link from 'next/link'

type NewsCardProps = {
	article: NewsArticle
	locale: Locale
	sectionType: 'admin' | 'client'
}
const NewsCard = ({ article, locale, sectionType = 'client' }: NewsCardProps) => {
	const slug = locale === 'uk' ? article.slugUk : article.slugEn
	const type = article.isNews
		? locale === 'uk'
			? 'новина'
			: 'news'
		: locale === 'uk'
			? 'стаття'
			: 'article'

	return (
		<Link
			href={`/news/${slug}`}
			className={`mx-auto w-full ${sectionType === 'client' && 'hover:shadow-xl rounded-2xl overflow-hidden duration-300 transition-all'}`}
		>
			<div
				className={`bg-primary h-[132px] w-full rounded-2xl flex items-center gap-4 p-4 relative`}
			>
				<div className='h-6 absolute top-2 right-2 p-1 rounded-tr-lg rounded-bl-lg bg-bronze flex items-center justify-center'>
					<span className='uppercase text-xs font-medium'>{type}</span>
				</div>

				{article.image && (
					<div className='w-[100px] h-[100px] flex justify-center items-center rounded-2xl overflow-hidden shrink-0'>
						<BaseImageItem
							src={article.image}
							alt={article.title[locale] ?? article.title.uk}
							width={100}
							height={100}
							className='object-cover'
						/>
					</div>
				)}

				<div className='text-white flex-1 min-w-0 flex flex-col gap-2'>
					<h4 className='font-semibold text-xl line-clamp-2'>
						{article.title[locale] ?? article.title.uk}
					</h4>

					{article?.subtitle && (
						<div className='flex items-center gap-x-3'>
							{article.videoUrl && <YoutubeIcon />}
							<p className='line-clamp-2'>
								{article?.subtitle[locale] ?? article.subtitle.uk}
							</p>
						</div>
					)}
				</div>

				{sectionType === 'admin' && (
					<div className='flex flex-col gap-y-2 xl:gap-y-3 shrink-0 mt-auto'>
						<Link
							className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-white hover:shadow-ms transform duration-300 transition-transform hover:scale-105'
							onClick={e => {
								e.stopPropagation()
							}}
							href={`news/editor/${article._id}`}
						>
							<EditIcon />
						</Link>
						<button
							className='w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center bg-sc-5 hover:shadow-ms transform duration-300 transition-transform hover:scale-105'
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								console.log('Trash clicked')
							}}
						>
							<Trash className='w-4 h-4 xl:w-5 xl:h-5' />
						</button>
					</div>
				)}
			</div>
		</Link>
	)
}

export default NewsCard
