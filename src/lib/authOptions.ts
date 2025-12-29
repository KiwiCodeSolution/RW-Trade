import { BASE_URL } from '@/utils/config'

import type { NextAuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

type AuthCreds = {
	login: string
	password: string
	roleContext?: 'admin' | 'user'
}

type ExtendedJWT = JWT & {
	accessToken: string
	refreshToken?: string
	expiresIn?: number
	role?: string
	login?: string | null
	error?: string
}

async function refreshAccessToken(token: ExtendedJWT): Promise<ExtendedJWT> {
	try {
		const res = await fetch(`${BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refreshToken: token.refreshToken })
		})

		const data = await res.json()
		if (!res.ok || !data?.accessToken) throw new Error('Refresh failed')

		return {
			...token,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken ?? token.refreshToken,
			expiresIn: Date.now() + (data.expiresIn ?? 900) * 1000
		}
	} catch (error) {
		console.error('Refresh token error:', error)
		return { ...token, error: 'RefreshAccessTokenError' }
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				login: { label: 'Login', type: 'text' },
				password: { label: 'Password', type: 'password' },
				roleContext: { label: 'Role', type: 'hidden' }
			},
			async authorize(credentials) {
				if (!credentials?.login || !credentials?.password) return null

				const { login, password, roleContext } = credentials as AuthCreds
				const res = await fetch(`${BASE_URL}/auth/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ login, password, roleContext })
				})

				if (!res.ok) return null
				const data = await res.json()
				if (!data?.accessToken) return null

				return {
					...data.user,
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
					expiresIn: data.expiresIn
				}
			}
		})
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					role: user.role,
					login: user.login ?? null,
					expiresIn: Date.now() + (user.expiresIn ?? 900) * 1000
				} satisfies ExtendedJWT
			}

			const buffer = 5_000
			if (token.expiresIn && Date.now() + buffer < token.expiresIn) {
				return token as ExtendedJWT
			}

			return await refreshAccessToken(token as ExtendedJWT)
		},

		async session({ session, token }) {
			session.user = {
				...session.user,
				login: token.login,
				role: token.role,
				accessToken: token.accessToken as string,
				refreshToken: token.refreshToken as string
			}
			session.expires = String(token.expiresIn)
			return session
		},

		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) return url
			if (url.startsWith('/')) return `${baseUrl}${url}`
			return `${baseUrl}/uk/manage-panel/notifications`
		}
	},

	pages: {
		signIn: '/signin',
		error: '/signin'
	},

	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET
}
