'use client'

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
	const [fallbackSrc] = useState('/images/NotFound.png')

	const resolveImgSrc = (src?: string) => {
		if (!src) return fallbackSrc

		if (src.startsWith('http://') || src.startsWith('https://')) {
			return src
		}

		if (src.startsWith('/uploads')) {
			return `/api${src}`
		}

		if (src.startsWith('/images')) {
			return src
		}

		return fallbackSrc
	}

	return (
		<Image
			src={resolveImgSrc(src)}
			alt={alt}
			width={width}
			height={height}
			className={`h-full w-full ${className || 'object-cover'}`}
		/>
	)
}

export default BaseImageItem
