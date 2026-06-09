import { formatPhone } from '@/helpers/formatPhone'

import { Locale } from '@/types/baseTypes'

import { ContactsData } from '@/api/contacts'

import { Link } from '@/i18n/navigation'
import { navLinks } from '@/lib/navLinks'

import Image from 'next/image'

async function fetchContacts(): Promise<ContactsData> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/rest'
		const res = await fetch(`${baseUrl}/settings/data/contacts`, {
			next: { revalidate: 60 } // кеш 60 секунд
		})
		if (!res.ok) return {}
		return res.json()
	} catch {
		return {}
	}
}

const UserFooterTop = async ({ locale }: { locale: Locale }) => {
	const contacts = await fetchContacts()

	const footerNavLinks = [
		...navLinks,
		{ href: '/terms-of-use', title: { uk: 'Умови використання сайту', en: 'Terms of use' } },
		{
			href: '/privacy-policy',
			title: { uk: 'Політика конфіденційності', en: 'Privacy policy' }
		}
	]

	const phones = [contacts.phone1, contacts.phone2, contacts.phone3].filter(
		(phone): phone is string => typeof phone === 'string' && phone.trim() !== ''
	)
	const address = contacts.address?.[locale] ?? contacts.address?.uk ?? ''

	const socialLinks = [
		{ href: contacts.facebook, src: '/icons/fb.png', alt: 'Facebook' },
		{ href: contacts.messenger, src: '/icons/mes.png', alt: 'Messenger' },
		{ href: contacts.youtube, src: '/icons/yt.png', alt: 'YouTube' },
		{ href: contacts.viber, src: '/icons/viber.png', alt: 'Viber' },
		{ href: contacts.telegram, src: '/icons/telegram-1.png', alt: 'Telegram' }
	].filter(s => s.href)

	return (
		<div className='grid grid-cols-1 xl:grid-cols-[3fr_3fr_3fr_3fr_1fr] py-5 gap-y-5 border-t-[2px] border-t-nav/30 lg:border-none'>
			{/* Лого */}
			<div className='hidden h-full xl:flex justify-center items-center lg:items-start'>
				<Link href='/'>
					<Image src='/logos/LOGO_152_blue.png' width={156} height={58} alt='logo' />
				</Link>
			</div>

			{/* Навігація + соцмережі мобільні */}
			<div className='flex justify-between'>
				<div className='flex flex-col justify-center font-semibold gap-y-3'>
					{footerNavLinks.map(link => (
						<Link key={link.href} href={link.href} className='gradient-text'>
							{link.title[locale]}
						</Link>
					))}
				</div>
				<div className='xl:hidden flex flex-col xl:items-end gap-4'>
					{socialLinks.map(s => (
						<a key={s.alt} href={s.href} target='_blank' rel='noopener noreferrer'>
							<Image src={s.src} width={32} height={32} alt={s.alt} />
						</a>
					))}
				</div>
			</div>

			{/* Адреса і телефони */}
			<div className='flex flex-col xl:items-start'>
				<div>
					{address && (
						<div className='xl:pl-8 mb-6'>
							<h3 className='gradient-text font-semibold mb-2'>
								{locale === 'uk' ? 'Адреса:' : 'Address:'}
							</h3>
							<p className='max-w-[190px]'>{address}</p>
						</div>
					)}
					{phones.length > 0 && (
						<div className='flex flex-col xl:pl-8'>
							<h3 className='gradient-text font-semibold mb-2'>
								{locale === 'uk' ? 'Телефон:' : 'Phone:'}
							</h3>
							{phones.map(phone => (
								<a
									key={phone}
									href={`tel:${phone}`}
									className='hover:underline-offset-1 hover:underline'
								>
									{formatPhone(phone)}
								</a>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Графік роботи */}
			<div className='flex flex-col xl:items-start'>
				<div className='xl:pl-8 mb-6'>
					<h3 className='gradient-text font-semibold mb-2'>
						{locale === 'uk' ? 'Графік роботи:' : 'Working hours:'}
					</h3>
					<p>{locale === 'uk' ? 'Пн - Пт: 10:00 - 18:00' : 'Mon - Fri: 10:00 - 18:00'}</p>
					<p>{locale === 'uk' ? 'Субота: 10:00 - 16:00' : 'Saturday: 10:00 - 16:00'}</p>
					<p>{locale === 'uk' ? 'Неділя: Вихідний' : 'Sunday: Holiday'}</p>
				</div>
			</div>

			{/* Соцмережі десктоп */}
			<div className='hidden xl:flex flex-col xl:items-end gap-4'>
				{socialLinks.map(s => (
					<a key={s.alt} href={s.href} target='_blank' rel='noopener noreferrer'>
						<Image src={s.src} width={32} height={32} alt={s.alt} />
					</a>
				))}
			</div>
		</div>
	)
}

export default UserFooterTop
