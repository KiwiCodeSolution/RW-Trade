'use client'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { observer } from 'mobx-react-lite'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AuthExpiredListener = observer(() => {
	const router = useRouter()

	useEffect(() => {
		if (authGuard.isExpired) {
			toast.error('Сесія завершилась. Увійдіть знову.')

			signOut({
				redirect: false // ❗ важливо
			}).finally(() => {
				authGuard.reset()
				router.push('/signin')
			})
		}
	}, [authGuard.isExpired])

	return null
})
