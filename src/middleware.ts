import { routing } from '@/i18n/routing'

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// маршрути, що потребують авторизації
const protectedRoutes = [
	'/uk/manage-panel',
	'/uk/manage-panel/*',
	'/en/manage-panel',
	'/en/manage-panel/*'
]

// головна middleware з локалізацією
export async function middleware(request: NextRequest) {
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
		rawCookieLang && routing.locales.includes(rawCookieLang as (typeof routing.locales)[number])
			? (rawCookieLang as (typeof routing.locales)[number])
			: undefined

	if (
		firstSegmentRaw &&
		routing.locales.includes(firstSegmentRaw as (typeof routing.locales)[number])
	) {
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

		// 3. Авторизація: якщо шлях у protectedRoutes
		const requiresAuth = protectedRoutes.some(route =>
			pathname.startsWith(route.replace('*', ''))
		)

		if (requiresAuth) {
			const token = await getToken({
				req: request,
				secret: process.env.NEXTAUTH_SECRET
			})

			if (!token) {
				// Зберігаємо поточний шлях у callbackUrl
				const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
				return NextResponse.redirect(
					new URL(`/uk/signin?callbackUrl=${callbackUrl}`, request.url)
				)
			}
		}

		return NextResponse.next()
	}

	// Якщо локаль не вказана — редірект до дефолтної
	const langToUse = cookieLang || routing.defaultLocale
	return NextResponse.redirect(new URL(`/${langToUse}${pathname}`, request.url))
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
