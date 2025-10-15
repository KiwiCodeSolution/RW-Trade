import BabyAndLogo from '@/components/userUI/BabyAndLogo'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Title from '@/components/userUI/baseComponents/Title'

import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
	const t = await getTranslations('AboutPage')

	return (
		<main className='min-h-[80vh]'>
			<div className='header-shadow' />
			<BaseSection>
				<Title tag='h1' isPageTitle styles='text-center my-5'>
					{t('title')}
				</Title>
				<Title tag='h3' styles='pt-4'>
					{t('welcome')}
				</Title>

				<div className='grid grid-cols-2 pt-4 pb-4 gap-10 sm:gap-24'>
					<div>
						<p className='mb-2 sm:mb-6'>{t('p1')}</p>

						<h2 className='font-semibold mb-2 sm:mb-6'>{t('h2_1')}</h2>
						<p className='mb-2 sm:mb-6'>{t('p2')}</p>

						<h2 className='font-semibold mb-2 sm:mb-6'>{t('h2_2')}</h2>
						<ul className='list-disc ml-5 mb-2 sm:mb-6'>
							{t.raw('list_products').map((item: string, i: number) => (
								<li key={i}>{item}</li>
							))}
						</ul>

						<h2 className='font-semibold mb-2 sm:mb-6'>{t('h2_3')}</h2>
						<ul className='list-disc ml-5 mb-2 sm:mb-6'>
							{t.raw('list_advantages').map((item: string, i: number) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</div>

					<BabyAndLogo />
				</div>
			</BaseSection>
		</main>
	)
}
