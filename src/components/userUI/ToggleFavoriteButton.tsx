'use client'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'

const ToggleFavoriteButton = observer(({ id }: { id: string }) => {
	const product = productStore.products.find(p => p._id === id)
	if (!product) return null

	return (
		<button onClick={() => productStore.toggleFavorite(id)}>
			{product.isFavorite ? '❤️' : '🤍'}
		</button>
	)
})

export default ToggleFavoriteButton
