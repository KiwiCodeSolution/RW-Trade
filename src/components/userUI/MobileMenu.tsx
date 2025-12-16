'use client'

import { Locale } from '@/types/baseTypes'

import LanguageSwitcher from './Language'
import RetailWholesale from './RetailWholesale'
import { Link } from '@/i18n/navigation'

import Image from 'next/image'

const MobileMenu = ({
	navLinks,
	locale,
	fnc
}: {
	navLinks: { title: { uk: string; en: string }; href: string }[]
	locale: Locale
	fnc: () => void
}) => {
	return (
		<>
			<div className='flex items-center justify-between h-12 px-4'>
				<p>{locale === 'uk' ? 'Мова сайту' : 'Language'}</p>
				<LanguageSwitcher locale={locale} />
			</div>
			<div className='flex flex-col gap-3 px-4'>
				<Link
					href='/favorites'
					className='hover:text-gr-5 duration-200 gap-2 h-12 flex items-center'
					onClick={fnc}
				>
					<Image
						src='/icons/hurt_full.png'
						width={24}
						height={20}
						alt='heart, favorite icon'
						className='w-6 h-5 object-center'
					/>
					<span className='bronze-text font-semibold'>
						{locale === 'uk' ? 'Моє вибране' : 'Favorites'}
					</span>
				</Link>
				{navLinks.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className='hover:text-gr-5 duration-200 h-12 flex items-center'
						onClick={fnc}
					>
						{link.title[locale]}
					</Link>
				))}
			</div>
			<RetailWholesale locale={locale} />
		</>
	)
}
export default MobileMenu
