import FacebookLogo from '@/assets/icons/facebook-32.svg'
import MessangerLogo from '@/assets/icons/messanger-32.svg'
import YoutubeLogo from '@/assets/icons/youtube-32.svg'

import Image from 'next/image'
import Link from 'next/link'

const UserFooterTop = () => {
	return (
		<div className='grid grid-cols-[3fr_3fr_3fr_3fr_1fr] py-5'>
			<div className='h-full flex justify-center items-center'>
				<Link href='/'>
					<Image src='/logos/LOGO_152_blue.png' width={156} height={58} alt='logo' />
				</Link>
			</div>
			<div className='flex justify-center'>
				<ul className='pl-8 font-semibold space-y-2'>
					<li className='gradient-text list-none'>
						<Link href='/about'>Про компанію</Link>
					</li>
					<li className='gradient-text list-none'>
						<Link href='/payment_delivery'>Оплата та доставка</Link>
					</li>
					<li className='gradient-text list-none'>
						<Link href='/warranty_return'>Гарантія та повернення</Link>
					</li>
					<li className='gradient-text list-none'>
						<Link href='/contacts'>Контакти</Link>
					</li>
					<li className='gradient-text list-none'>Умови використання сайту</li>
					<li className='gradient-text list-none'>Політика конфіденційності</li>
				</ul>
			</div>
			<div className='flex flex-col items-center'>
				<div>
					<div className='pl-8 mb-6'>
						<h3 className='gradient-text font-semibold mb-2'>Адреса:</h3>
						<p className='max-w-[190px]'>
							вул. Державінська, 38, 2 поверх, офіс 215, Харків, Україна
						</p>
					</div>
					<div className='pl-8'>
						<h3 className='gradient-text font-semibold mb-2'>Телефон:</h3>
						<p>+380 (95) 110-35-80</p>
						<p>+380 (68) 509-05-49</p>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='pl-8 mb-6'>
					<h3 className='gradient-text font-semibold mb-2'>Графік роботи:</h3>
					<p>Пн - Пт: 10:00 - 18:00</p>
					<p>Субота: 10:00 - 16:00</p>
					<p>Неділя: Вихідний</p>
				</div>
			</div>
			<div className='flex flex-col items-end gap-4'>
				<FacebookLogo />
				<MessangerLogo />
				<YoutubeLogo />
				<FacebookLogo />
			</div>
		</div>
	)
}

export default UserFooterTop
