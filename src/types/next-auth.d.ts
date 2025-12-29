import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			login?: string | null
			role?: string
			accessToken: string
			refreshToken?: string
		} & DefaultSession['user']
	}

	interface User {
		login?: string | null
		role?: string
		accessToken: string
		refreshToken?: string
		expiresIn?: number
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string
		refreshToken?: string
		expiresIn?: number
		role?: string
		login?: string | null
		error?: string
	}
}
