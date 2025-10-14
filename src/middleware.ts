// middleware.js
import { NextResponse } from 'next/server'

const supportedLanguages = ['en', 'uk']
const defaultLanguage = 'en'

export function middleware(request) {
	const { pathname } = request.nextUrl

	// Skip static files
	if (
		pathname.includes('.') ||
		pathname.includes('_next') ||
		pathname.includes('api') ||
		pathname.includes('favicon.ico')
	) {
		return NextResponse.next()
	}

	// Get language from cookie or pathname
	const cookieHeader = request.headers.get('cookie') || ''
	const cookieLang = cookieHeader
		.split(';')
		.find(c => c.trim().startsWith('NEXT_LOCALE='))
		?.split('=')[1]

	const pathSegments = pathname.split('/').filter(Boolean)
	const firstSegment = pathSegments[0]

	// If at root, check for cookie language
	if (pathname === '/') {
		if (cookieLang && supportedLanguages.includes(cookieLang)) {
			return NextResponse.redirect(new URL(`/${cookieLang}`, request.url))
		}
		return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url))
	}

	// If first segment is a supported language
	if (supportedLanguages.includes(firstSegment)) {
		// Set cookie if it doesn't match
		if (cookieLang !== firstSegment) {
			const response = NextResponse.next()
			response.cookies.set('NEXT_LOCALE', firstSegment, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
				sameSite: 'strict'
			})
			return response
		}
		return NextResponse.next()
	}

	// If no language in path, use cookie or default
	const langToUse =
		cookieLang && supportedLanguages.includes(cookieLang) ? cookieLang : defaultLanguage

	return NextResponse.redirect(new URL(`/${langToUse}${pathname}`, request.url))
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
