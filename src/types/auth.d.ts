import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
	interface User {
		id: string
		login: string
		role: string
		email?: string | null

		accessToken: string
		refreshToken: string
		accessTokenExpiresAt: number
	}

	interface Session {
		user: {
			id: string
			login: string
			role: string
			email?: string | null

			accessToken: string
			refreshToken: string
		}
		error?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string
		login: string
		role: string
		email?: string | null

		accessToken: string
		refreshToken: string
		accessTokenExpiresAt: number

		error?: string
	}
}
