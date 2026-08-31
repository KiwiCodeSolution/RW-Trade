'use client'

import { WorldIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { useMemo } from 'react'

const LanguageSwitcher = ({ locale }: { locale: Locale }) => {
	const pathname = usePathname()

	const languages = { en: 'eng', uk: 'ukr' }

	// Поточна локаль з URL
	const segments = pathname.split('/').filter(Boolean)
	const firstSegment = segments[0]

	const pathWithoutLocale = routing.locales.includes(firstSegment as Locale)
		? `/${segments.slice(1).join('/')}`
		: pathname

	const nextLocale = locale === 'en' ? 'uk' : 'en'
	const nextLanguageName = languages[nextLocale]

	const href = useMemo(() => pathWithoutLocale || '/', [pathWithoutLocale])

	return (
		<>
			<Link
				href={href}
				locale={nextLocale}
				className='hidden md:flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200'
			>
				<WorldIcon />
				<div className='min-w-8'>{nextLanguageName}</div>
			</Link>
			{/* mobile */}
			<div className='flex md:hidden gap-1'>
				{routing.locales.map(lng => (
					<Link
						key={lng}
						href={href}
						locale={lng}
						className={`
							text-sm rounded-full w-8 h-8 flex items-center justify-center
							${lng === locale ? 'bg-primary text-white' : 'bg-transparent '}
						`}
					>
						<div
							className={`w-[30px] h-[30px] rounded-full flex items-center justify-center  ${lng === locale ? 'bg-white' : 'bg-transparent '}`}
						>
							<p className='gradient-text'>{lng.toUpperCase()}</p>
						</div>
					</Link>
				))}
			</div>
		</>
	)
}

export default LanguageSwitcher
