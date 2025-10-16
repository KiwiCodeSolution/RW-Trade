'use client'

import { Locale } from '@/types/baseTypes'

import WorldIcon from '../../../public/icons/world-16.svg'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { useMemo } from 'react'

const LanguageSwitcher = ({ locale }: { locale: Locale }) => {
	const pathname = usePathname()

	const languages = { en: 'eng', uk: 'ukr' }

	// Поточна локаль з URL
	const segments = pathname.split('/').filter(Boolean)
	const firstSegment = segments[0]
	// const currentLocale = routing.locales.includes(firstSegment as Locale)
	// 	? (firstSegment as Locale)
	// 	: routing.defaultLocale

	const pathWithoutLocale = routing.locales.includes(firstSegment as Locale)
		? `/${segments.slice(1).join('/')}`
		: pathname

	const nextLocale = locale === 'en' ? 'uk' : 'en'
	const nextLanguageName = languages[nextLocale]

	const href = useMemo(() => pathWithoutLocale || '/', [pathWithoutLocale])

	return (
		<Link
			href={href}
			locale={nextLocale}
			className='flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200'
		>
			<WorldIcon />
			<div className='min-w-8'>{nextLanguageName}</div>
		</Link>
	)
}

export default LanguageSwitcher
