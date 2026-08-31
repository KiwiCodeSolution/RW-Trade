'use client'

import { Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
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
			className='cursor-pointer w-8 h-8 flex items-center justify-center text-red-500'
		>
			{favorite ? (
				<Image src='/icons/hurt_full.png' alt='heart' width={24} height={20} />
			) : (
				<Image src='/icons/hurt_empty.png' alt='heart' width={24} height={20} />
			)}
		</button>
	)
})

export default ToggleFavoriteButton
