import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			/** JWT токен з бекенду */
			accessToken: string
			/** роль користувача */
			role?: string
		} & DefaultSession['user']
	}

	interface User {
		access_token: string
		role?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string
		role?: string
	}
}
