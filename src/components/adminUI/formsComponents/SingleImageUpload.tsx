'use client'

import { Add, Trash } from '@/assets/icons'

import { BASE_IMG_URL } from '@/utils/config'

import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'

export type PreviewItem = {
	id: string
	file?: File
	url?: string
}

interface SingleImageUploadProps {
	image?: PreviewItem
	onChange?: (img?: PreviewItem) => void
	className?: string
}

const SingleImageUpload = ({
	image,
	onChange,
	className = 'w-[162px] h-[162px]'
}: SingleImageUploadProps) => {
	const [local, setLocal] = useState<PreviewItem | undefined>(image)

	useEffect(() => {
		setLocal(image)
	}, [image])

	const resolveImageUrl = (url?: string) => {
		if (!url) return ''
		if (url.startsWith('blob:')) return url
		if (url.startsWith('http://') || url.startsWith('https://')) return url
		return `${BASE_IMG_URL}${url.startsWith('/') ? url : `/${url}`}`
	}

	const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const img: PreviewItem = {
			id: `img-${Date.now()}`,
			file,
			url: URL.createObjectURL(file)
		}

		setLocal(img)
		onChange?.(img)
	}

	const handleRemove = () => {
		setLocal(undefined)
		onChange?.(undefined)
	}

	return (
		<div className='flex gap-x-5 items-center'>
			{!local ? (
				<label
					className={`inline-flex flex-col items-center justify-center rounded-md cursor-pointer ${className}`}
				>
					<input type='file' className='hidden' onChange={handleAdd} />
					<div className='add-btn-link bg-primary mb-2'>
						<Add />
					</div>
					<p className='font-medium text-center'>
						Додати <br /> зображення
					</p>
				</label>
			) : (
				<div
					className={`relative rounded-md border-2 border-sc-1 overflow-hidden product-card-shadow ${className}`}
				>
					<Image src={resolveImageUrl(local.url)} alt='' fill className='object-cover' />

					<button
						type='button'
						onClick={handleRemove}
						className='absolute top-1 right-1 w-7 h-7 rounded-full flex items-center justify-center bg-sc-5'
					>
						<Trash className='w-4 h-4' />
					</button>
				</div>
			)}
		</div>
	)
}

export default SingleImageUpload
