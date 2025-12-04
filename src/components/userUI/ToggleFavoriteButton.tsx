'use client'

import { FavoriteHurt, FavoriteHurtSolid } from '@/assets/icons'

import { Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

type ToggleFavoriteButtonProps = {
	product: Product
}

const ToggleFavoriteButton = observer(({ product }: ToggleFavoriteButtonProps) => {
	const [favorite, setFavorite] = useState(product.isFavorite || false)

	useEffect(() => {
		const favs = productStore.getFavoritesFromStorage()
		setFavorite(favs.some(p => p._id === product._id))
	}, [product._id])

	function toggleFavorite() {
		productStore.toggleFavorite(product)
		setFavorite(!favorite)
	}

	return (
		<button
			onClick={toggleFavorite}
			className='cursor-pointer w-8 h-8 flex items-center justify-center'
		>
			{favorite ? <FavoriteHurtSolid /> : <FavoriteHurt />}
		</button>
	)
})

export default ToggleFavoriteButton
