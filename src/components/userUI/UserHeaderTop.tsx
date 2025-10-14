import { Locale } from '@/types/baseTypes'

import BurgerIcon from '../../../public/icons/burger-primary-24.svg'
import CartIcon from '../../../public/icons/cart-bronze-24.svg'
import Person from '../../../public/icons/person-16.svg'
import Logo from '../../../public/logos/LOGO_blue.svg'

import Language from './Language'
import RetailWholesale from './RetailWholesale'
import '@/styles/globals.css'

import Link from 'next/link'

interface UserHeaderTopProps {
	locale: Locale
}

const UserHeaderTop = ({ locale }: UserHeaderTopProps) => {
	return (
		<div className='w-full sm:bg-nav'>
			<div className='user-container sm:h-9'>
				<div className='sm:hidden h-[60px] flex justify-between items-center'>
					<div className='w-10 h-10 p-2'>
						<BurgerIcon />
					</div>
					<Link href='/' className='block'>
						<Logo className='w-[120px]' />
					</Link>
					<div className='w-10 h-10 p-2'>
						<CartIcon />
					</div>
				</div>
				<nav className='hidden sm:flex justify-between items-center h-full text-white'>
					<div className='flex gap-8'>
						<Link href='/about' className='hover:text-gr-5 duration-200'>
							Про компанію
						</Link>
						<Link href='/payment_delivery' className='hover:text-gr-5 duration-200'>
							Оплата та доставка
						</Link>
						<Link href='/warranty_return' className='hover:text-gr-5 duration-200'>
							Гарантія та повернення
						</Link>
						<Link href='/contacts' className='hover:text-gr-5 duration-200'>
							Контакти
						</Link>
					</div>
					<div className='flex gap-8'>
						<RetailWholesale />
						<Language locale={locale} />
						<Link
							href='/admin'
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
