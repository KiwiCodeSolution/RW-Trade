'use client'

import { categoryStore } from '@/store/CategoryStore'

import HeaderPage from './HeaderPage'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const HeaderOfCreateProductPage = observer(() => {
	const searchParams = useSearchParams()
	const categoryId = searchParams.get('category')

	// якщо categories ще не завантажені, можеш ініціалізувати
	useEffect(() => {
		if (categoryStore.categories.length === 0) {
			categoryStore.fetchCategories()
		}
	}, [])

	// обчислюємо поточну категорію без окремого useState
	const currentCategory = useMemo(() => {
		if (!categoryId) return undefined
		return categoryStore.categories.find(c => c._id === categoryId)
	}, [categoryId])

	// без `mounted` — у цьому випадку він не потрібен
	if (!currentCategory) {
		return <HeaderPage pageName='Створення карточки продукту' />
	}

	return (
		<HeaderPage
			pageName={`Створення карточки продукту у категорії ${currentCategory.title.uk}`}
		/>
	)
})

export default HeaderOfCreateProductPage
