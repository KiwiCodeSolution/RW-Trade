'use client'

import { productStore } from '@/store/ProductsStore'

import HeaderPage from './HeaderPage'

import { observer } from 'mobx-react-lite'

const HeaderOfEditProductPage = observer(() => {
	const { currentProduct } = productStore

	if (!currentProduct) {
		return <HeaderPage pageName='Редагування карточки продукту' />
	}

	return (
		<HeaderPage
			pageName={`Створення карточки продукту у категорії ${productStore.currentProduct?.title['uk']}`}
		/>
	)
})

export default HeaderOfEditProductPage
