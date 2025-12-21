import { Locale } from '@/types/baseTypes'

import { Link } from '@/i18n/navigation'
import { navLinks } from '@/lib/navLinks'

import Image from 'next/image'

const UserFooterTop = ({ locale }: { locale: Locale }) => {
	const footerNavLinks = [
		...navLinks,
		{ href: '/', title: { uk: 'Умови використання сайту', en: 'Terms of use' } },
		{ href: '/', title: { uk: 'Політика конфіденційності', en: 'Privacy policy' } }
	]
	return (
		<div className='grid grid-cols-1 xl:grid-cols-[3fr_3fr_3fr_3fr_1fr] py-5 gap-y-5 border-t-[2px] border-t-nav/30 lg:border-none'>
			<div className='hidden h-full xl:flex justify-center items-center lg:items-start'>
				<Link href='/'>
					<Image src='/logos/LOGO_152_blue.png' width={156} height={58} alt='logo' />
				</Link>
			</div>
			<div className='flex justify-between'>
				<div className='flex flex-col justify-center font-semibold gap-y-3'>
					{footerNavLinks.map(link => (
						<Link key={link.href} href={link.href} className='gradient-text'>
							{link.title[locale]}
						</Link>
					))}
				</div>
				<div className='xl:hidden flex flex-col xl:items-end gap-4'>
					<Image src='/icons/fb.png' width={32} height={32} alt='logo' />
					<Image src='/icons/mes.png' width={32} height={32} alt='logo' />
					<Image src='/icons/yt.png' width={32} height={32} alt='logo' />
				</div>
			</div>
			<div className='flex flex-col xl:items-start'>
				<div>
					<div className='xl:pl-8 mb-6'>
						<h3 className='gradient-text font-semibold mb-2'>Адреса:</h3>
						<p className='max-w-[190px]'>
							{locale === 'uk'
								? 'вул. Державінська, 38, 2 поверх, офіс 215, Харків, Україна'
								: 'Derzhavinska St., 38, 2nd floor, office 215, Kharkiv, Ukraine'}
						</p>
					</div>
					<div className='flex flex-col xl:pl-8'>
						<h3 className='gradient-text font-semibold mb-2'>
							{locale === 'uk' ? 'Телефон:' : 'Phone:'}
						</h3>
						<a
							href='tel:+380951103580'
							className='hover:underline-offset-1 hover:underline'
						>
							+380 (95) 110-35-80
						</a>
						<a
							href='tel:+380685090549'
							className='hover:underline-offset-1 hover:underline'
						>
							+380 (68) 509-05-49
						</a>
					</div>
				</div>
			</div>
			<div className='flex flex-col xl:items-start'>
				<div className='xl:pl-8 mb-6'>
					<h3 className='gradient-text font-semibold mb-2'>
						{locale === 'uk' ? 'Графік роботи:' : 'Working hours:'}{' '}
					</h3>
					{locale === 'uk' ? (
						<p>Пн - Пт: 10:00 - 18:00</p>
					) : (
						<p>Mon - Fri: 10:00 - 18:00</p>
					)}
					{locale === 'uk' ? (
						<p>Субота: 10:00 - 16:00</p>
					) : (
						<p>Saturday: 10:00 - 16:00</p>
					)}
					{locale === 'uk' ? <p>Неділя: Вихідний</p> : <p>Sunday: Holiday</p>}
				</div>
			</div>
			<div className='hidden xl:flex flex-col xl:items-end gap-4'>
				<Image src='/icons/fb.png' width={32} height={32} alt='logo' />
				<Image src='/icons/mes.png' width={32} height={32} alt='logo' />
				<Image src='/icons/yt.png' width={32} height={32} alt='logo' />
			</div>
		</div>
	)
}

export default UserFooterTop
