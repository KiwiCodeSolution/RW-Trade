'use client'

import Person from '@/assets/icons/person-16.svg'

import { Locale } from '@/types/baseTypes'

import Language from './Language'
import MobileUserHeader from './MobileUserHeader'
import RetailWholesale from './RetailWholesale'
import { Link } from '@/i18n/navigation'
import { navLinks } from '@/lib/navLinks'
import '@/styles/globals.css'

const UserHeaderTop = ({ locale }: { locale: Locale }) => {
	return (
		<>
			<div className='w-full sm:bg-nav'>
				<div className='user-container sm:h-9'>
					{/* мобільне меню */}

					<MobileUserHeader navLinks={navLinks} locale={locale} />

					{/* десктоп меню */}
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
							<RetailWholesale locale={locale} />
							<Language locale={locale} />
							<Link
								href='/manage-panel'
								className='flex gap-1 items-center hover:text-gr-5 duration-200'
							>
								<Person />
								<p>{locale === 'uk' ? 'Увійти' : 'Log in'}</p>
							</Link>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default UserHeaderTop
