'use client'

import BurgerIcon from '@/assets/icons/burger-primary-24.svg'
import { LogoBlue } from '@/assets/icons_logos'

import { Locale } from '@/types/baseTypes'

import MobileMenuModal from '../commonUI/modal/MobileMenuModal'

import HeaderCartButtonMobile from './HeaderCartButtonMobile'
import MobileMenu from './MobileMenu'
import { Link } from '@/i18n/navigation'

import { useState } from 'react'

const MobileUserHeader = ({
	navLinks,
	locale
}: {
	navLinks: { title: { uk: string; en: string }; href: string }[]
	locale: Locale
}) => {
	const [isShowModal, setIsShowModal] = useState(false)

	return (
		<div className='sm:hidden'>
			<div className='h-[60px] flex justify-between items-center'>
				<button className='w-10 h-10 p-2' onClick={() => setIsShowModal(true)}>
					<BurgerIcon />
				</button>
				<Link href='/' className='block'>
					<LogoBlue width='120' />
				</Link>
				<HeaderCartButtonMobile locale={locale} />
			</div>
			{isShowModal && (
				<MobileMenuModal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
					<MobileMenu
						navLinks={navLinks}
						locale={locale}
						fnc={() => setIsShowModal(false)}
					/>
				</MobileMenuModal>
			)}
		</div>
	)
}
export default MobileUserHeader
