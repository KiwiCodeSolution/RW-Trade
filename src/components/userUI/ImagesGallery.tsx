'use client'

import { Product } from '@/types/baseTypes'

import SwiperBtn from '../commonUI/SwiperBtn'

import Image from 'next/image'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ImagesGallery = ({ images }: { images: Product['images'] }) => {
	const testImages = [
		'/images/products/1.jpg',
		'/images/products/2.png',
		'/images/products/3.jpg',
		'/images/products/4.jpg',
		'/images/products/5.webp',
		'/images/products/6.webp',
		'/images/products/7.jpg',
		'/images/products/8.jpg'
	]

	// const imagesGallery: Product['images'] = images?.map(img => {
	// 	if (img.startsWith('http://') || img.startsWith('https://')) {
	// 		return img
	// 	}
	// 	return `${BASE_IMG_URL}${img.startsWith('/') ? img : `/${img}`}`
	// })

	const imagesGallery: Product['images'] = images?.map(img => {
		if (img.startsWith('http://') || img.startsWith('https://')) {
			return img
		}

		// файли з беку
		if (img.startsWith('/uploads')) {
			return `/api${img}`
		}

		// fallback (на випадок, якщо прийде без слеша)
		return `/api/uploads/${img}`
	})

	const imagesArray = images && images.length > 0 ? imagesGallery : testImages

	return (
		imagesArray &&
		imagesArray.length > 0 && (
			<div className='w-full lg:w-[526px] h-[324px] lg:h-[423px] flex items-center lg:gap-x-16 border-[1.5px] border-sc-1/20 rounded-2xl lg:px-4 relative'>
				<SwiperBtn className='product_card-btn-prev rotate-180 absolute top-1/2 -translate-y-1/2 left-0 z-[3]' />
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
					className='w-full lg:w-[526px] h-[324px] lg:h-[423px]'
				>
					{imagesArray.map((image, index) => (
						<SwiperSlide key={index}>
							<div className='w-full h-full flex items-center justify-center'>
								{/* <BaseImageItem
									src={image}
									alt={``}
									width={286}
									height={343}
									className='object-cover'
								/> */}
								<Image
									src={image}
									alt={``}
									width={286}
									height={343}
									className='object-cover w-full lg:w-[526px] h-[324px] lg:h-[423px]'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<SwiperBtn className='product_card-btn-next absolute top-1/2 -translate-y-1/2 right-0 z-[3]' />
			</div>
		)
	)
}

export default ImagesGallery
