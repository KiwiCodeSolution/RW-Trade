import { Locale } from './types/baseTypes'
import { routing } from '@/i18n/routing'

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
	'/uk/manage-panel',
	'/uk/manage-panel/',
	'/en/manage-panel',
	'/en/manage-panel/'
]

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// 1. Пропускаємо статику та API
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/favicon') ||
		pathname.includes('.')
	) {
		return NextResponse.next()
	}

	// 2. Визначаємо локаль
	const pathSegments = pathname.split('/').filter(Boolean)
	const firstSegmentRaw = pathSegments[0]
	const rawCookieLang = request.cookies.get('NEXT_LOCALE')?.value
	const cookieLang =
		rawCookieLang && routing.locales.includes(rawCookieLang as Locale)
			? rawCookieLang
			: undefined

	// 3. Якщо є локаль
	if (firstSegmentRaw && routing.locales.includes(firstSegmentRaw as Locale)) {
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

		// 4. Перевірка авторизації
		const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))

		if (requiresAuth) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})

			//моделюємо протухання токену
			// if (token) token.exp = 1
			// якщо токена немає або він протух
			const isExpired = token?.exp && Date.now() >= Number(token.exp) * 1000

			if (!token || isExpired) {
				const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
				return NextResponse.redirect(
					new URL(`/uk/signin?callbackUrl=${callbackUrl}`, request.url)
				)
			}
		}

		return NextResponse.next()
	}

	// 5. Якщо локалі немає — редірект
	// const langToUse = cookieLang || routing.defaultLocale
	// return NextResponse.redirect(new URL(`/${langToUse}${pathname}`, request.url))
	// 5. Якщо локалі немає — редірект
	const langToUse = cookieLang || routing.defaultLocale

	const url = new URL(`/${langToUse}${pathname}`, request.url)
	url.search = request.nextUrl.search // ✅ переносимо всі query-параметри (наприклад ?category=...)

	return NextResponse.redirect(url)
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
