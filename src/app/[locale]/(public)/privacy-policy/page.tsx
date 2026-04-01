import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'
import Title from '@/components/userUI/baseComponents/Title'

import { Locale } from '@/types/baseTypes'

import { getTranslations, setRequestLocale } from 'next-intl/server'

type Params = { locale: Locale }

// Опишемо інтерфейс для ітерації (можна винести в типи)
interface PrivacyPoint {
	title: string
	desc?: string
	list?: string[]
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<Params> }) {
	const { locale } = await params

	setRequestLocale(locale)
	const t = await getTranslations('PrivacyPolicy')

	// Отримуємо сирий масив даних
	const points = t.raw('points') as PrivacyPoint[]

	const secondName = locale === 'uk' ? 'Політика конфіденційності' : 'Privacy Policy'

	return (
		<main className='w-full min-h-[80vh]'>
			<BaseSection className='flex'>
				<Path secondName={secondName} locale={locale} />
			</BaseSection>

			<BaseSection className='flex flex-col pt-4 pb-8'>
				<div className='max-w-6xl mx-auto'>
					<Title isPageTitle tag='h2' styles='text-center mb-8'>
						{t('title')}
					</Title>

					<p className='mb-6 text-lg'>{t('description')}</p>

					<div className='flex flex-col gap-8'>
						{points.map((point, index) => (
							<section key={index} className='flex flex-col gap-3'>
								<h3 className='text-xl font-bold text-secondary'>{point.title}</h3>

								{point.desc && (
									<p className='text-lg leading-relaxed'>{point.desc}</p>
								)}

								{point.list && (
									<ul className='list-disc pl-6 flex flex-col gap-2'>
										{point.list.map((item, idx) => (
											<li key={idx} className='text-lg'>
												{item}
											</li>
										))}
									</ul>
								)}
							</section>
						))}
					</div>
				</div>
			</BaseSection>
		</main>
	)
}
