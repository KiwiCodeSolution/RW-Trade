import { BASE_URL } from '@/utils/config'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
				roleContext: { label: 'Role', type: 'hidden' }
			},
			async authorize(credentials) {
				console.log(credentials)

				if (!credentials?.email || !credentials?.password) return null

				// Надсилаємо запит на твій бекенд
				const res = await fetch(`${BASE_URL}/auth/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
						roleContext: credentials.roleContext
					}),
					credentials: 'include' // важливо для роботи з cookie
				})

				if (!res.ok) return null

				const user = await res.json()
				console.log('Авторизований користувач:', user)
				// бек має повернути user з уже встановленими cookie
				return user
			}
		})
	],
	pages: {
		signIn: '/signin',
		error: '/signin'
	},
	// Куки контролює бекенд, NextAuth не чіпає токени
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
