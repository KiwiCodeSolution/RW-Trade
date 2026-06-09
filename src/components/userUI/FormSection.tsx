import LogoWhite from '@/assets/logos/LOGO_152_white.png'

import UserForm from './UserForm'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

const icons = [
	'/images/form/FormIcon_1.png',
	'/images/form/FormIcon_2.png',
	'/images/form/FormIcon_3.png',
	'/images/form/FormIcon_4.png'
]

const FormSection = () => {
	const t = useTranslations('HomePage.form_section')

	const items = [t('item_1'), t('item_2'), t('item_3'), t('item_4')]

	const formTexts = {
		title: t('form_fields.title'),

		item_0: t('form_fields.item_0'),
		placeholder_0: t('form_fields.placeholder_0'),
		item_1: t('form_fields.item_1'),
		placeholder_1: t('form_fields.placeholder_1'),
		item_2: t('form_fields.item_2'),
		placeholder_2: t('form_fields.placeholder_2'),
		item_3: t('form_fields.item_3'),
		placeholder_3: t('form_fields.placeholder_3'),
		btnText: t('form_fields.btnText')
	}

	return (
		<BaseSection className='bg-primary h-fit lg:h-[488px] text-white'>
			<div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 lg:py-14'>
				<div className='items-center max-w-[500px] mx-auto'>
					<div className='flex justify-center mb-3 lg:mb-0'>
						<Image src={LogoWhite} alt='logo' width={156} height={58} />
					</div>

					<Title
						tag='h3'
						styles='text-center border-b-2 border-white mb-4 pb-4 lg:pb-0 mx-[15px] lg:mx-0'
					>
						{t('title')}
					</Title>

					{items.map((text, index) => {
						return (
							<div key={index} className='flex gap-6 mb-4 mx-[15px] lg:mx-8'>
								<Image
									src={icons[index]}
									alt={`icon-${index}`}
									width={33}
									height={33}
									className='h-8'
								/>
								<p className='lg:text-xl leading-[1.5] lg:leading-8'>{text}</p>
							</div>
						)
					})}
				</div>

				<div className='items-center w-full max-w-[580px] mx-auto border-t-2 border-white lg:border-none pt-10 lg:pt-0'>
					<UserForm formTexts={formTexts} />
				</div>
			</div>
		</BaseSection>
	)
}

export default FormSection
