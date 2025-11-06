'use client'

import { Product } from '@/types/baseTypes'

import SwiperBtn from '../commonUI/SwiperBtn'

import Image from 'next/image'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ImagesGallery = ({ images }: { images: Product['images'] }) => {
	return (
		images &&
		images.length > 0 && (
			<div className='w-[526px] h-[423px] flex items-center gap-x-16 border-[1.5px] border-sc-1/20 rounded-2xl px-4 relative'>
				<SwiperBtn className='product_card-btn-prev rotate-180' />
				<Swiper
					modules={[Navigation, A11y, Pagination]}
					spaceBetween={10}
					// loop={true}
					slidesPerView={1}
					navigation={{
						nextEl: '.product_card-btn-next',
						prevEl: '.product_card-btn-prev'
					}}
					pagination={{ clickable: true }}
					className='w-[526px] h-[423px]'
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<div className='w-full h-full flex items-center justify-center'>
								<Image
									src={image}
									alt={``}
									width={286}
									height={343}
									className='object-cover'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<SwiperBtn className='product_card-btn-next' />
			</div>
		)
	)
}
export default ImagesGallery
