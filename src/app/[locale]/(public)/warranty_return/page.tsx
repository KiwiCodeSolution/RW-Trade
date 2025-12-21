import BabyAndLogo from '@/components/userUI/BabyAndLogo'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Title from '@/components/userUI/baseComponents/Title'

import { getTranslations } from 'next-intl/server'

const WarrantyAndReturn = async () => {
	const t = await getTranslations('WarrantyAndReturnPage')
	return (
		<main className='min-h-[80vh]'>
			<div className='hidden lg:block header-shadow' />
			<BaseSection>
				<Title tag='h1' isPageTitle styles='lg:text-center my-5'>
					{t('title_main')}
				</Title>

				<div className='grid grid-cols-1 lg:grid-cols-2 pt-4 pb-4 gap-4 lg:gap-10 sm:gap-24'>
					<div>
						<h2 className='text-2xl font-semibold mb-2 sm:mb-10'>
							{t('title_warranty')}
						</h2>
						<p className='font-semibold mb-2 sm:mb-10'>{t('text_1')}</p>
						<p className='mb-2 sm:mb-8'>{t('text_2')}</p>
						<p className='mb-2 sm:mb-8'>{t('text_3')}</p>
						<p className='mb-2 sm:mb-8'>{t('text_4')}</p>
					</div>
					<BabyAndLogo />
				</div>
			</BaseSection>
		</main>
	)
}

export default WarrantyAndReturn
