import { routing } from '@/i18n/routing'

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// 1. Пропускаємо статику та API
	if (
		pathname.includes('.') ||
		pathname.includes('_next') ||
		pathname.includes('api') ||
		pathname.includes('favicon.ico')
	) {
		return NextResponse.next()
	}

	// 2. Обробка локалі
	const pathSegments = pathname.split('/').filter(Boolean)
	const firstSegmentRaw = pathSegments[0]

	const rawCookieLang = request.cookies.get('NEXT_LOCALE')?.value
	const cookieLang =
		rawCookieLang && routing.locales.includes(rawCookieLang as any)
			? (rawCookieLang as (typeof routing.locales)[number])
			: undefined

	if (firstSegmentRaw && routing.locales.includes(firstSegmentRaw as any)) {
		const firstSegment = firstSegmentRaw as (typeof routing.locales)[number]

		if (cookieLang !== firstSegment) {
			const response = NextResponse.next()
			response.cookies.set('NEXT_LOCALE', firstSegment, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				sameSite: 'strict'
			})
			return response
		}
		return NextResponse.next()
	}

	const langToUse = cookieLang || routing.defaultLocale
	const response = NextResponse.redirect(new URL(`/${langToUse}${pathname}`, request.url))

	// 3. Тут можна вставити авторизацію
	// const token = request.cookies.get('AUTH_TOKEN')?.value
	// if (!token && pathname.startsWith('/protected')) {
	//     return NextResponse.redirect(new URL(`/${langToUse}/login`, request.url))
	// }

	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
