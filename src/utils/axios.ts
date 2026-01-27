// utils/axios.ts
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})

// REQUEST
api.interceptors.request.use(async config => {
	const session = await getSession()
	const accessToken = session?.user?.accessToken

	if (accessToken) {
		config.headers = config.headers ?? {}
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

// RESPONSE
api.interceptors.response.use(
	res => res,
	error => {
		const status = error?.response?.status

		if (status === 401 || status === 403) {
			return Promise.reject({
				...error,
				isAuthError: true
			})
		}

		return Promise.reject(error)
	}
)
