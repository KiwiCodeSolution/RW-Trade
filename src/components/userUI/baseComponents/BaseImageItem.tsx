'use client'

import NoImage from '../../../../public/images/NotFound.png'

import Image from 'next/image'
import { useState } from 'react'

type BaseImageItemProps = {
	src: string
	width?: number
	height?: number
	alt?: string
	className?: string
}

const BaseImageItem = ({ src, width, height, alt, className }: BaseImageItemProps) => {
	const [imgSrc, setImgSrc] = useState(src)

	return (
		<Image
			src={imgSrc}
			alt={alt || 'product image'}
			width={width || 152}
			height={height || 62}
			className={`h-full w-full object-cover ${className || ''}`}
			onError={() => setImgSrc(NoImage.src)}
		/>
	)
}

export default BaseImageItem
