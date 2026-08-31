'use client'

import { NewsArticle } from '@/types/baseTypes'

import NewsCard from './NewsCard'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const NewsGallery = ({ news }: { news: NewsArticle[] }) => {
	return (
		news &&
		news.length > 0 && (
			<div className='w-full mx-auto lg:hidden relative mt-8'>
				<Swiper
					modules={[Navigation, A11y, Pagination]}
					spaceBetween={10}
					// loop={true}
					slidesPerView={1}
					pagination={{ clickable: true }}
					className='w-full h-full'
				>
					{news.map((n, index) => (
						<SwiperSlide key={index}>
							<div className='w-full h-full grid grid-rows-3 items-center justify-center'>
								<NewsCard article={n} locale='uk' />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	)
}
export default NewsGallery
