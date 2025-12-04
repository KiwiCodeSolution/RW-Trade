'use client'

import { BASE_IMG_URL } from '@/utils/config'

import Image from 'next/image'
import { useState } from 'react'

type BaseImageItemProps = {
	src?: string
	width?: number
	height?: number
	alt?: string
	className?: string
}

const BaseImageItem = ({
	src,
	width = 152,
	height = 62,
	alt = 'product image',
	className
}: BaseImageItemProps) => {
	const [fallbackSrc, setFallbackSrc] = useState('/images/NotFound.png')

	// Формуємо повний шлях до картинки
	const imgSrc = src ? `${BASE_IMG_URL}${src.startsWith('/') ? src : `/${src}`}` : fallbackSrc

	return (
		<Image
			src={imgSrc}
			alt={alt}
			width={width}
			height={height}
			className={`h-full w-full object-cover ${className || ''}`}
			onError={() => setFallbackSrc('/images/NotFound.png')}
		/>
	)
}

export default BaseImageItem
