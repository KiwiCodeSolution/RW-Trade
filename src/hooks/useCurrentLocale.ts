'use client'

import { Locale } from '@/types/baseTypes'

import { routing } from '@/i18n/routing'

import { usePathname } from 'next/navigation'

export const useCurrentLocale = (): Locale => {
	const pathname = usePathname()
	const segments = pathname.split('/').filter(Boolean)
	const firstSegment = segments[0]
	const isLocale = routing.locales.includes(firstSegment as Locale)
	const currentLocale = (isLocale ? firstSegment : routing.defaultLocale) as Locale
	return currentLocale
}
