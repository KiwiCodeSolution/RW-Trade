import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Path from '@/components/userUI/baseComponents/Path'
import Title from '@/components/userUI/baseComponents/Title'

import { Locale } from '@/types/baseTypes'

import { Link } from '@/i18n/navigation'

import { getTranslations, setRequestLocale } from 'next-intl/server'

type Params = { locale: Locale }

interface TermsPoint {
	title: string
	list: (string | { text: string; linkText: string; href: string })[]
}

export default async function TermsOfUsePage({ params }: { params: Promise<Params> }) {
	const { locale } = await params

	setRequestLocale(locale)
	const t = await getTranslations('TermsOfUse')

	// Отримуємо масив даних через t.raw
	const points = t.raw('points') as TermsPoint[]

	const secondName = locale === 'uk' ? 'Умови використання' : 'Terms of Use'

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

					{/* Якщо в майбутньому додаси опис до TermsOfUse, він з'явиться тут */}
					{t.has('description') && <p className='mb-6 text-lg'>{t('description')}</p>}

					<div className='flex flex-col gap-8'>
						{points.map((point, index) => (
							<section key={index} className='flex flex-col gap-3'>
								<h3 className='text-xl font-bold text-secondary'>{point.title}</h3>

								{point.list && (
									<ul className='list-disc pl-6 flex flex-col gap-2'>
										{point.list.map((item, idx) => (
											<li key={idx} className='text-lg'>
												{typeof item === 'string' ? (
													item
												) : (
													<>
														{item.text}
														<Link
															href={item.href}
															className='text-secondary font-bold underline italic hover:text-primary transition-colors'
														>
															{item.linkText}
														</Link>
													</>
												)}
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
