// middleware.ts
import type { Locale } from '@/types/baseTypes'

import { auth } from '@/auth'
import { routing } from '@/i18n/routing'

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl

	// 1️⃣ Пропускаємо системні маршрути
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/favicon') ||
		pathname.includes('.')
	) {
		return NextResponse.next()
	}

	// 2️⃣ Розбиваємо шлях
	const segments = pathname.split('/').filter(Boolean)
	const firstSegment = segments[0]

	// 3️⃣ Беремо локаль з cookie
	const cookieLocaleRaw = request.cookies.get('NEXT_LOCALE')?.value
	const cookieLocale =
		cookieLocaleRaw && routing.locales.includes(cookieLocaleRaw as Locale)
			? (cookieLocaleRaw as Locale)
			: undefined

	// 🟥 4️⃣ AUTH GUARD — ДО будь-якого рендеру
	if (
		firstSegment &&
		routing.locales.includes(firstSegment as Locale) &&
		segments[1] === 'manage-panel'
	) {
		const session = await auth()

		if (!session) {
			const locale = firstSegment as Locale
			return NextResponse.redirect(new URL(`/${locale}/signin`, request.url))
		}
	}

	// 5️⃣ Якщо локаль є в URL — просто пропускаємо
	if (firstSegment && routing.locales.includes(firstSegment as Locale)) {
		if (cookieLocale !== firstSegment) {
			const res = NextResponse.next()
			res.cookies.set('NEXT_LOCALE', firstSegment, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'strict'
			})
			return res
		}

		return NextResponse.next()
	}

	// 6️⃣ Якщо локалі нема — додаємо
	const localeToUse = cookieLocale || routing.defaultLocale
	const redirectUrl = new URL(`/${localeToUse}${pathname}`, request.url)
	redirectUrl.search = search

	return NextResponse.redirect(redirectUrl)
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
