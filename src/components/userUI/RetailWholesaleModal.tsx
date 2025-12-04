'use client'

import LogoImg from '@/assets/logos/LOGO_252_blue.png'

import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BtnSolid from '../commonUI/BtnSolid'
import BaseModal from '../commonUI/modal/BaseModal'

import Title from './baseComponents/Title'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'

const RetailWholesaleModal = observer(({ locale }: { locale: Locale }) => {
	const { shouldAskWholesale, setWholesale } = productStore

	if (!shouldAskWholesale) return null

	const title = locale === 'uk' ? 'Вітаємо!' : 'Welcome!'
	const description =
		locale === 'uk' ? 'Давайте налаштуємо вітрину під Вас' : 'Let’s set up the store for you'

	return (
		<BaseModal isOpen={true} onClose={() => setWholesale(false)}>
			<div className='flex flex-col gap-y-5 items-center justify-center p-7'>
				<Image src={LogoImg} alt='logo' width={248} height={104} className='mx-auto' />
				<Title tag='h2' styles=''>
					{title}
				</Title>
				<Title tag='h3'>{description}</Title>

				<BtnSolid
					size='xxxl'
					variant='primary'
					as='button'
					action={() => setWholesale(false)}
				>
					{locale === 'uk' ? 'Роздріб' : 'Retail'}
				</BtnSolid>

				<BtnSolid
					size='xxxl'
					variant='bronze'
					as='button'
					action={() => setWholesale(true)}
				>
					{locale === 'uk' ? 'Гурт' : 'Wholesale'}
				</BtnSolid>
			</div>
		</BaseModal>
	)
})

export default RetailWholesaleModal
