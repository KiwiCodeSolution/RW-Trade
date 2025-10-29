'use client'

import BurgerIcon from '@/assets/icons/burger-primary-24.svg'
import CartIcon from '@/assets/icons/cart-bronze-24.svg'
import Person from '@/assets/icons/person-16.svg'
import { LogoBlue } from '@/assets/icons_logos'

import { Locale } from '@/types/baseTypes'

import Language from './Language'
import RetailWholesale from './RetailWholesale'
import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

const UserHeaderTop = ({ locale }: { locale: Locale }) => {
	const navLinks = [
		{ title: { uk: 'Про компанію', en: 'About us' }, href: '/about' },
		{
			title: { uk: 'Оплата та доставка', en: 'Payment & Delivery' },
			href: '/payment_delivery'
		},
		{
			title: { uk: 'Гарантія та повернення', en: 'Warranty & Returns' },
			href: '/warranty_return'
		},
		{ title: { uk: 'Контакти', en: 'Contacts' }, href: '/contacts' }
	]

	return (
		<div className='w-full sm:bg-nav'>
			<div className='user-container sm:h-9'>
				<div className='sm:hidden h-[60px] flex justify-between items-center'>
					<div className='w-10 h-10 p-2'>
						<BurgerIcon />
					</div>
					<Link href='/' className='block'>
						<LogoBlue width='120' />
					</Link>
					<div className='w-10 h-10 p-2'>
						<CartIcon />
					</div>
				</div>
				<nav className='hidden sm:flex justify-between items-center h-full text-white'>
					<div className='flex gap-8'>
						{navLinks.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className='hover:text-gr-5 duration-200'
							>
								{link.title[locale]}
							</Link>
						))}
					</div>
					<div className='flex gap-8'>
						<RetailWholesale />
						<Language locale={locale} />
						<Link
							href='/manage-panel'
							className='flex gap-1 items-center hover:text-gr-5 duration-200'
						>
							<Person />
							<div>Увійти</div>
						</Link>
					</div>
				</nav>
			</div>
		</div>
	)
}

export default UserHeaderTop
