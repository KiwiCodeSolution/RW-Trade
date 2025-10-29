import Icon from '@/assets/icons/btn-icon-01-32.svg'

import BtnSolid from '../commonUI/BtnSolid'

import PopularProductsSectionWithCategory from './PopularProductsSectionWithCategory'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { useTranslations } from 'next-intl'

const PopularProducts = () => {
	const t = useTranslations('HomePage.popular_products')
	return (
		<BaseSection className='py-9'>
			<Title tag='h2' styles='mb-7'>
				{t('title')}
			</Title>
			<PopularProductsSectionWithCategory />
			<div className='flex justify-center items-center'>
				<BtnSolid size='m' variant='bronze' as='link' href='/catalog'>
					<Icon />
					<span>{t('btn')}</span>
				</BtnSolid>
			</div>
		</BaseSection>
	)
}

export default PopularProducts
