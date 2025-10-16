'use client'

import { FavoriteHurt, FavoriteHurtSolid } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const ToggleFavoriteButton = observer(({ product }: { product: Product }) => {
	const [favorite, setFavorite] = useState(false)

	// const product = productStore.products.find(p => p._id === id)
	if (!product) return null

	function toggleFavorite() {
		setFavorite(!favorite)
		console.log('click')
		// productStore.toggleFavorite(product._id)
	}

	return (
		<button
			onClick={toggleFavorite}
			className='cursor-pointer w-8 h-8 flex items-center justify-center'
		>
			{/* {product.isFavorite ? <FavoriteHurtSolid /> : <FavoriteHurt />} */}
			{favorite ? <FavoriteHurtSolid /> : <FavoriteHurt />}
		</button>
	)
})

export default ToggleFavoriteButton
