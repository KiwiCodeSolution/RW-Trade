import { BASE_URL } from '@/utils/config'

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
				roleContext: { label: 'Role', type: 'hidden' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null

				const res = await fetch(`${BASE_URL}/auth/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(credentials),
					credentials: 'include'
				})

				if (!res.ok) return null
				return await res.json()
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.access_token
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				role: token.role,
				accessToken: token.accessToken
			}
			return session
		}
	},
	pages: {
		signIn: '/signin',
		error: '/signin'
	},
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET
}
