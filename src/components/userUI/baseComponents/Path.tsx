import { PathArrowIcon } from '@/assets/icons'

import { Link } from '@/i18n/navigation'

import { Locale } from 'next-intl'

type PathProps = {
	firstName?: string
	secondName?: string
	thirdName?: string
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

const Path = ({ firstName = 'home', secondName, thirdName }: PathProps) => {
	const pathItems = [firstName, secondName, thirdName].filter((item): item is string =>
		Boolean(item)
	)

	return (
		<div className='flex items-center gap-x-2 h-7 my-4'>
			{pathItems.map((item, index) => (
				<span key={index} className='flex items-center gap-x-2'>
					<Link
						className='text-gr-4 text-sm leading-2 capitalize'
						href={pathLinks[item] || '/'}
					>
						{item}
					</Link>
					{index < pathItems.length - 1 && <PathArrowIcon color='var(--color-gr-4)' />}
				</span>
			))}
		</div>
	)
}

export default Path
