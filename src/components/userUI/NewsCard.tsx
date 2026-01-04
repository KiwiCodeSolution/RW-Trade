import { YoutubeIcon } from '@/assets/icons'

import { Locale, NewsArticle } from '@/types/baseTypes'

import BaseImageItem from './baseComponents/BaseImageItem'

import Image from 'next/image'
import Link from 'next/link'

type NewsCardProps = {
	article: NewsArticle
	locale: Locale
	typePage?: 'client' | 'admin'
}

const NewsCard = ({ article, locale, typePage }: NewsCardProps) => {
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
			className={`mx-auto w-full hover:shadow-xl rounded-2xl overflow-hidden duration-300 transition-all relative`}
		>
			{!article.isPublished && typePage === 'admin' && (
				<div className='flex justify-center absolute top-0 left-0 w-full h-full bg-black/60 z-[11]'>
					<Image
						src='/images/hide.png'
						alt=''
						width={72}
						height={72}
						className='object-contain'
					/>
				</div>
			)}

			<div
				className={`bg-primary h-[132px] w-full rounded-2xl flex items-center gap-x-2 lg:gap-4 p-2 lg:p-4 relative`}
			>
				<div className='h-6 absolute left-2 top-2 lg:left-auto lg:right-2 p-1 rounded-tl-lg rounded-br-lg lg:rounded-tl-none lg:rounded-br-none lg:rounded-tr-lg lg:rounded-bl-lg bg-bronze flex items-center justify-center'>
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
					<h4 className='font-semibold text-base lg:text-xl line-clamp-2'>
						{article.title[locale] ?? article.title.uk}
					</h4>

					{article?.subtitle && (
						<div className='flex flex-col lg:flex-row items-start lg:items-center gap-x-3'>
							<div className='order-2 lg:order-1'>
								{article.videoUrl && <YoutubeIcon />}
							</div>
							<p className='line-clamp-2 text-sm lg:text-base order-1 lg:order-2'>
								{article?.subtitle[locale] ?? article.subtitle.uk}
							</p>
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default NewsCard
