import FormIcon_1 from '../../../public/icons/form_1.svg'
import FormIcon_2 from '../../../public/icons/form_2.svg'
import FormIcon_3 from '../../../public/icons/form_3.svg'
import FormIcon_4 from '../../../public/icons/form_4.svg'
import LogoWhite from '../../../public/logos/LOGO_152_white.png'

import UserForm from './UserForm'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

const icons = [FormIcon_1, FormIcon_2, FormIcon_3, FormIcon_4]

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
		<BaseSection className='bg-primary h-[488px] text-white'>
			<div className='w-full h-full grid grid-cols-2 gap-4 py-14'>
				<div className='items-center max-w-[500px] mx-auto'>
					<div className='flex justify-center'>
						<Image src={LogoWhite} alt='logo' width={156} height={58} />
					</div>
					<Title tag='h3' styles='text-center border-b-2 border-white mb-4'>
						{t('title')}
					</Title>

					{items.map((text, index) => {
						const Icon = icons[index]
						return (
							<div key={index} className='flex gap-6 mb-4 mx-8'>
								<Icon className='min-w-[33px] h-auto' />
								<p className='text-xl leading-8'>{text}</p>
							</div>
						)
					})}
				</div>

				<div className='items-center w-full max-w-[580px] mx-auto'>
					<UserForm formTexts={formTexts} />
				</div>
			</div>
		</BaseSection>
	)
}

export default FormSection
