import { Link } from '@/i18n/navigation'

import Image from 'next/image'

const UserFooterTop = () => {
	return (
		<div className='grid grid-cols-1 xl:grid-cols-[3fr_3fr_3fr_3fr_auto] py-5 gap-y-5 border-t-[2px] border-t-nav/30 lg:border-none'>
			<div className='hidden h-full xl:flex justify-center items-center'>
				<Link href='/'>
					<Image src='/logos/LOGO_152_blue.png' width={156} height={58} alt='logo' />
				</Link>
			</div>
			<div className='flex justify-between'>
				<div className='flex flex-col justify-center font-semibold gap-y-3'>
					<Link href='/about' className='gradient-text'>
						Про компанію
					</Link>

					<Link href='/payment_delivery' className='gradient-text'>
						Оплата та доставка
					</Link>

					<Link href='/warranty_return' className='gradient-text'>
						Гарантія та повернення
					</Link>

					<Link href='/contacts' className='gradient-text'>
						Контакти
					</Link>
					<p className='gradient-text list-none'>Умови використання сайту</p>
					<p className='gradient-text list-none'>Політика конфіденційності</p>
				</div>
				<div className='xl:hidden flex flex-col xl:items-end gap-4'>
					<Image src='/icons/fb.png' width={32} height={32} alt='logo' />
					<Image src='/icons/mes.png' width={32} height={32} alt='logo' />
					<Image src='/icons/yt.png' width={32} height={32} alt='logo' />
				</div>
			</div>
			<div className='flex flex-col xl:items-center'>
				<div>
					<div className='xl:pl-8 mb-6'>
						<h3 className='gradient-text font-semibold mb-2'>Адреса:</h3>
						<p className='max-w-[190px]'>
							вул. Державінська, 38, 2 поверх, офіс 215, Харків, Україна
						</p>
					</div>
					<div className='flex flex-col xl:pl-8'>
						<h3 className='gradient-text font-semibold mb-2'>Телефон:</h3>
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
			<div className='flex flex-col xl:items-center'>
				<div className='xl:pl-8 mb-6'>
					<h3 className='gradient-text font-semibold mb-2'>Графік роботи:</h3>
					<p>Пн - Пт: 10:00 - 18:00</p>
					<p>Субота: 10:00 - 16:00</p>
					<p>Неділя: Вихідний</p>
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
