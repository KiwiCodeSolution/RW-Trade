import { ArrowGoBack, PathArrowIcon } from '@/assets/icons'

import { Link } from '@/i18n/navigation'

import { Locale } from 'next-intl'

type PathProps = {
	firstName?: string
	secondName?: string
	thirdName?: string
	fourthName?: string
	locale: Locale
}

const pathLinks: Record<string, string> = {
	головна: '/',
	home: '/',
	'про нас': '/about',
	about: '/about',
	каталог: '/catalog',
	catalog: '/catalog',
	новини: '/news',
	new: '/news',
	контакти: '/contacts',
	contacts: '/contacts',
	'повернення та гарантія': '/warranty_return',
	'warranty return': '/warranty_return',
	'оплата та доставка': '/payment_delivery',
	'payment and delivery': '/payment_delivery',
	favorite: '/favorite',
	вибране: '/favorite'
}

const Path = ({ secondName, thirdName, fourthName, locale }: PathProps) => {
	const firstName = locale === 'uk' ? 'Головна' : 'Home'
	const paths = [firstName, secondName, thirdName, fourthName]
	const pathItems = paths.filter((item): item is string => Boolean(item))

	const pathMob = pathItems[pathItems.length - 1] ?? firstName

	return (
		<>
			<div className='hidden lg:flex items-center gap-x-2 h-7 my-4'>
				{pathItems.map((item, index) => (
					<span key={index} className='flex items-center gap-x-2'>
						<Link
							className='text-gr-4 text-sm leading-2 capitalize'
							href={pathLinks[item] || '/'}
						>
							{item}
						</Link>
						{index < pathItems.length - 1 && (
							<PathArrowIcon color='var(--color-gr-4)' />
						)}
					</span>
				))}
			</div>
			<div className='flex lg:hidden items-center gap-x-2 pt-4 pb-[10px]'>
				<ArrowGoBack className='' />
				<Link
					className='gradient-text text-base leading-normal capitalize'
					href={pathLinks[pathMob] || '/'}
				>
					{pathMob}
				</Link>
			</div>
		</>
	)
}

export default Path
