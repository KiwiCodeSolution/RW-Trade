import Icon from '../../../public/icons/btn-icon-01-32.svg'
import BtnSolid from '../commonUI/BtnSolid'

import CardRow from './CardRow'
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

			<div className='grid grid-rows-3 gap-9 mb-9'>
				<CardRow />
				<CardRow />
				<CardRow />
			</div>
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
