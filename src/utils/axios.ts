// utils/axios.ts
import { BASE_URL } from './config'

import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

export const api = axios.create({
	baseURL: BASE_URL
})

let isRefreshing = false
let failedQueue: Array<{
	resolve: (value?: unknown) => void
	reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) prom.reject(error)
		else prom.resolve(token)
	})
	failedQueue = []
}

// --------------- REQUEST ---------------
api.interceptors.request.use(async config => {
	const session = await getSession()

	if (session?.user?.accessToken) {
		config.headers = config.headers || {}
		config.headers.Authorization = `Bearer ${session.user.accessToken}`
	}

	return config
})

// --------------- RESPONSE ---------------
api.interceptors.response.use(
	res => res,

	async error => {
		const originalRequest = error.config

		// якщо не авторизаційна помилка → прокидуємо далі
		if (error.response?.status !== 401 && error.response?.status !== 403) {
			return Promise.reject(error)
		}

		// щоб не зациклити
		if (originalRequest._retry) return Promise.reject(error)
		originalRequest._retry = true

		const session = await getSession()
		const refreshToken = session?.user?.refreshToken

		if (!refreshToken) {
			await signOut({ callbackUrl: '/uk/signin' })
			return Promise.reject(error)
		}

		// якщо refresh уже виконується — ставимо у чергу
		if (isRefreshing) {
			return new Promise(function (resolve, reject) {
				failedQueue.push({ resolve, reject })
			})
				.then(token => {
					originalRequest.headers.Authorization = 'Bearer ' + token
					return api(originalRequest)
				})
				.catch(err => Promise.reject(err))
		}

		isRefreshing = true

		try {
			const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
				refreshToken
			})

			const newAccessToken = data.accessToken

			processQueue(null, newAccessToken)

			isRefreshing = false

			// оновлюємо заголовок і повторюємо запит
			originalRequest.headers.Authorization = 'Bearer ' + newAccessToken

			return api(originalRequest)
		} catch (err) {
			processQueue(err, null)
			isRefreshing = false

			// refresh не спрацював → до побачення, мій дорогий юзере
			await signOut({ callbackUrl: '/uk/signin' })

			return Promise.reject(err)
		}
	}
)
