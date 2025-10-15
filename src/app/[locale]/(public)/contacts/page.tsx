import BabyAndLogo from '@/components/userUI/BabyAndLogo'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Title from '@/components/userUI/baseComponents/Title'

import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Contacts() {
	const t = await getTranslations('ContactsPage')

	const contacts = [
		{
			number: '+380994445833',
			display: '+380 (99) 444-58-33',
			desc: t('contacts.0')
		},
		{
			number: '+380935090399',
			display: '+380 (93) 509-03-99',
			desc: t('contacts.1')
		},
		{
			number: '+380973368900',
			display: '+380 (97) 336-89-00',
			desc: t('contacts.2')
		}
	]

	return (
		<main className='min-h-[80vh]'>
			<div className='header-shadow' />
			<BaseSection>
				<Title tag='h1' isPageTitle styles='text-center my-5'>
					{t('title')}
				</Title>

				<div className='grid grid-cols-2 py-4 gap-10 sm:gap-24'>
					<BabyAndLogo />

					<div className='max-w-[660px] text-2xl flex flex-col gap-y-8'>
						<p className='gradient-text font-semibold'>{t('slogan')}</p>
						<div>
							<p className='font-bold'>{t('office')}</p>
							<Link
								href='https://maps.app.goo.gl/xoPcWn9DuMVsQcMt5'
								target='_blank'
								className='hover:underline'
							>
								{t('address')}
							</Link>
						</div>
						<div>
							{contacts.map((c, idx) => (
								<div key={idx} className='mb-6'>
									<a
										href={`tel:${c.number}`}
										className='font-bold hover:underline'
									>
										{c.display}
									</a>
									<p>{c.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</BaseSection>
		</main>
	)
}
