import BabyAndLogo from '@/components/userUI/BabyAndLogo'
import BaseSection from '@/components/userUI/baseComponents/BaseSection'
import Title from '@/components/userUI/baseComponents/Title'

import { formatPhone } from '@/helpers/formatPhone'

import { ContactsData } from '@/api/contacts'

import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

async function fetchContacts(): Promise<ContactsData> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/rest'
		const res = await fetch(`${baseUrl}/settings/data/contacts`, {
			next: { revalidate: 60 }
		})
		if (!res.ok) return {}
		return res.json()
	} catch {
		return {}
	}
}

export default async function Contacts() {
	const t = await getTranslations('ContactsPage')
	const contacts = await fetchContacts()

	const phones = [
		{ number: contacts.phone1, type: contacts.viber ? 'viber' : 'phone' },
		{ number: contacts.phone2, type: 'phone' },
		{ number: contacts.phone3, type: 'phone' }
	].filter((p): p is { number: string; type: 'phone' | 'viber' } => Boolean(p.number))

	return (
		<main className='min-h-[80vh]'>
			<div className='hidden lg:block header-shadow' />
			<BaseSection>
				<Title tag='h1' isPageTitle styles='lg:text-center my-5'>
					{t('title')}
				</Title>

				<div className='grid grid-cols-1 lg:grid-cols-2 pt-4 pb-4 gap-4 lg:gap-10 sm:gap-24'>
					<BabyAndLogo styles='order-2 lg:order-1' />

					<div className='max-w-[660px] text-2xl flex flex-col gap-y-8 order-1 lg:order-2'>
						<p className='gradient-text font-semibold'>{t('slogan')}</p>

						{contacts.address && (
							<div>
								<p className='font-bold'>{t('office')}</p>
								<Link
									href='https://maps.app.goo.gl/xoPcWn9DuMVsQcMt5'
									target='_blank'
									className='hover:underline'
								>
									{contacts.address.uk}
								</Link>
							</div>
						)}

						<div>
							{phones.map((p, idx) => (
								<div key={idx} className='mb-6'>
									<a
										href={
											p.type === 'viber'
												? `viber://chat?number=${p.number}`
												: `tel:${p.number}`
										}
										className='font-bold hover:underline'
									>
										{formatPhone(p.number)}
									</a>
									<p>{t(`contacts.${idx}`)}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</BaseSection>
		</main>
	)
}
