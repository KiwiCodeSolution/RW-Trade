import ArrowRightIcon from '@/assets/icons/arrow-right-primary-32.svg'

import BtnGost from '../commonUI/BtnGost'

import BaseSection from './baseComponents/BaseSection'

import { useTranslations } from 'next-intl'

const AddSectionSecond = () => {
	const t = useTranslations('HomePage.advertising')
	return (
		<BaseSection className='relative h-[228px] bg-primary text-white'>
			<div className='absolute left-[130px] top-1/2 -translate-y-1/2'>advertising block</div>
			<BtnGost
				className='absolute right-[130px] top-1/2 -translate-y-1/2'
				as='link'
				href='/catalog'
			>
				<span>{t('btn')}</span>
				<ArrowRightIcon />
			</BtnGost>
		</BaseSection>
	)
}

export default AddSectionSecond
