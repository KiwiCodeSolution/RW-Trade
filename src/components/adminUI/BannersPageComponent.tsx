'use client'

import SinglePromoBanner from './SinglePromoBanner'
import SliderBanners from './SliderBanners'

import Image from 'next/image'
import { useState } from 'react'

const BannersPageComponent = () => {
	const [bannerType, setBannerType] = useState<'slider' | 'promo'>('slider')
	return (
		<div className='w-full py-4'>
			<div className='w-full p-[1px] bg-primary rounded-lg grid grid-cols-2'>
				<button
					className={`w-full p-2 text-center h-9 flex items-center justify-center ${bannerType === 'slider' ? 'bg-transparent text-white' : 'bg-white text-nav rounded-l-lg'} transition-colors duration-300 font-semibold `}
					onClick={() => setBannerType('slider')}
				>
					Подвійний банер (слайдер)
				</button>
				<button
					className={`w-full p-2 text-center h-9 flex items-center justify-center ${bannerType !== 'slider' ? 'bg-transparent text-white' : 'bg-white text-nav rounded-r-lg'} transition-colors duration-300 font-semibold`}
					onClick={() => setBannerType('promo')}
				>
					Промо Баннер
				</button>
			</div>
			<div className='flex items-center gap-x-4 py-3'>
				<Image src='/icons/info.png' alt='іконка інформації' width={39} height={34} />
				{bannerType === 'slider' ? (
					<div className='w-4/5'>
						<p>1. Ви можете додати по 5 банерів на кожну сторону головної сторінки</p>

						<p>
							2. Для корректного відображення баннеру мінімальній розмір для
							завантаження 852*438 пікселів або в рівних пропорціях (наприклад
							1704х876 і тд)
						</p>
						<p>
							3. Вся поверхня баннера клікабельна та приведе користувача по вказаному
							посиланню
						</p>
					</div>
				) : (
					<div className='w-4/5'>
						<p>
							1. Цей банер гнучкий і його можна налаштувати під будь-які потреби.
							Фонова підкладка статична, інші дані можна змінити.
						</p>

						<p>
							2. У десктопній версії банер буде горизонтальним – картинка буде
							ліворуч, а текст праворуч. У мобільній версії вертикальним, картинка
							зверху, текст нижче.
						</p>
						<p>
							3. Розмір зображення повинен бути 550х262, можна більше, але в рівних
							пропорціях (1100х532 і тд)
						</p>
					</div>
				)}
			</div>
			<div className='h-0.5 w-full bg-primary' />
			{bannerType === 'slider' ? <SliderBanners /> : <SinglePromoBanner />}
		</div>
	)
}
export default BannersPageComponent
