import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Пропускаємо статику та API
	if (
		request.nextUrl.pathname.includes('.') ||
		request.nextUrl.pathname.includes('_next') ||
		request.nextUrl.pathname.includes('api') ||
		request.nextUrl.pathname.includes('favicon.ico')
	) {
		return NextResponse.next()
	}

	// Місце для авторизації
	// const token = request.cookies.get('AUTH_TOKEN')?.value
	// if (!token && request.nextUrl.pathname.startsWith('/protected')) {
	//   return NextResponse.redirect(new URL('/login', request.url))
	// }

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
