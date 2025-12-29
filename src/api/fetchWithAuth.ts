import { getSession } from 'next-auth/react'

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
	const session = await getSession()
	const token = session?.user?.accessToken

	const res = await fetch(input, {
		...init,
		headers: {
			...(init?.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	})

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`)
	}

	return res
}
