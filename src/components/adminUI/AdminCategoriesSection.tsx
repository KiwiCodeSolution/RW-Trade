'use client'

import { Category } from '@/types/baseTypes'

import { getCategoriesByID } from '@/api/categories'

import HeaderPage from './HeaderPage'
import SubCategoriesAndFilters from './SubCategoriesAndFilters'
import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { useEffect, useState } from 'react'

interface Props {
	id: string
}

export default function AdminCategoriesSection({ id }: Props) {
	const [category, setCategory] = useState<Category | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getCategoriesByID({ id })
			.then(data => setCategory(data))
			.catch((err: unknown) => {
				const error = err as { isAuthError?: boolean }
				console.error(error)

				if (error?.isAuthError) {
					authGuard.expireSession()
				} else {
					toast.error('Не вдалося завантажити категорію')
				}
			})
			.finally(() => setLoading(false))
	}, [id])

	if (loading) return <p>Завантаження...</p>
	if (!category) return <p>Категорія не знайдена</p>

	return (
		<>
			<HeaderPage pageName={category.title['uk']} />
			<p className='text-xl font-medium mt-2'>
				Виберіть або створіть підкатегорію, для якої потрібно налаштовувати фільтри:
			</p>
			<SubCategoriesAndFilters categoryId={id} />
		</>
	)
}
