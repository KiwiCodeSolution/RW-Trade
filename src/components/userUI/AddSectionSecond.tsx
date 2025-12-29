'use client'

import ArrowRightIcon from '@/assets/icons/arrow-right-primary-32.svg'

import { BASE_IMG_URL } from '@/utils/config'

import { Locale } from '@/types/baseTypes'

import { promoBannerStore } from '@/store/PromoBannerStore'

import BtnGost from '../commonUI/BtnGost'

import BaseSection from './baseComponents/BaseSection'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'

const AddSectionSecond = observer(({ locale }: { locale: Locale }) => {
	const banner = promoBannerStore.banner

	if (!banner) return null

	const imagesUrl = BASE_IMG_URL + banner.image

	return (
		<BaseSection className='relative h-[622px] lg:h-[332px] bg-primary text-white grid place-items-center grid-cols-1 lg:grid-cols-2 rounded-2xl lg:rounded-none p-3 gap-y-[10px]'>
			<div className='w-[550px] h-[259px] flex items-center justify-center rounded-xl overflow-hidden'>
				{banner.image && (
					<Image
						src={imagesUrl}
						alt={banner.title?.uk || 'promo-banner'}
						width={550}
						height={259}
						className='min-w-[343px] min-h-[162px] lg:w-[550px] lg:h-[259px] object-cover'
					/>
				)}
			</div>
			<div className='flex flex-col gap-y-2.5'>
				<h3 className='text-2xl xl:text-[32px] text-center lg:text-left font-bold text-white mb-1'>
					{banner.title[locale]}
				</h3>
				<p className='text-xl font-bold text-sc-4 mb-6'>{banner.subtitle[locale]}</p>
				<ul className='mb-4'>
					<li className='proposal-li mb-4'>{banner.firstText[locale]}</li>

					<li className='proposal-li mb-4'>{banner.secondText[locale]}</li>
					<li className='proposal-li'>{banner.thirdText[locale]}</li>
				</ul>
				<BtnGost className='w-1/3 mx-auto' as='link' href={banner.link || '/catalog'}>
					<span>{locale === 'uk' ? 'Детальніше' : 'Details'}</span>
					<ArrowRightIcon />
				</BtnGost>
			</div>
		</BaseSection>
	)
})

export default AddSectionSecond
