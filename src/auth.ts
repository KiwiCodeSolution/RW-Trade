// src/auth.ts
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				refreshToken: token.refreshToken
			})
		})

		if (!res.ok) {
			throw new Error('Failed to refresh token')
		}

		const data = await res.json()

		return {
			...token,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken ?? token.refreshToken,
			accessTokenExpiresAt: Date.now() + data.expiresIn * 1000
		}
	} catch (error) {
		console.error('RefreshAccessTokenError', error)
		return {
			...token,
			error: 'RefreshAccessTokenError'
		}
	}
}

export const { auth, signIn, signOut, handlers } = NextAuth({
	secret: process.env.AUTH_SECRET,

	session: {
		strategy: 'jwt'
	},

	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				login: {}, // login або email
				password: {}
			},
			async authorize(credentials) {
				console.log('credentials', credentials)

				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						roleContext: 'admin',
						login: credentials?.login,
						password: credentials?.password
					})
				})

				console.log('backend status', res.status)

				const text = await res.text()
				console.log('backend response', text)

				if (!res.ok) return null

				const data = JSON.parse(text)

				return {
					id: data.user.id,
					login: data.user.login,
					role: data.user.role,
					email: data.user.email ?? 'no-email@local',
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
					accessTokenExpiresAt: Date.now() + data.expiresIn * 1000
				}
			}
		})
	],

	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				return {
					...token,
					id: user.id,
					login: user.login,
					role: user.role,
					email: user.email,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					accessTokenExpiresAt: user.accessTokenExpiresAt
				} as JWT
			}

			if (token.accessTokenExpiresAt && Date.now() < token.accessTokenExpiresAt) {
				return token
			}

			return await refreshAccessToken(token)
		},

		async session({ session, token }) {
			// AdapterUser уже існує → ми його НЕ міняємо

			session.user.id = token.id
			session.user.login = token.login
			session.user.role = token.role

			session.user.accessToken = token.accessToken
			session.user.refreshToken = token.refreshToken

			// email ОБОВʼЯЗКОВИЙ для AdapterUser
			session.user.email = token.email ?? 'no-email@local'
			session.user.emailVerified = null

			// кастомні поля — ОК
			if (token.error) {
				session.error = token.error
			}

			return session
		}
	},
	pages: { signIn: '/signin' }
})
