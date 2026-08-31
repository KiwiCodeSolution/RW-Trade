'use client'

import { Add, Trash } from '@/assets/icons'

import { toast } from '@/lib/toast'

import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

export type PreviewItem = {
	id: string
	file?: File
	url?: string
}

interface ProductImagesBlockProps {
	images?: PreviewItem[]
	onChange?: (imgs: PreviewItem[]) => void
}

const ProductImagesBlock = ({ images = [], onChange }: ProductImagesBlockProps) => {
	const createEmptySlots = () =>
		Array.from({ length: 10 }, (_, i) => ({
			id: `slot-${i}`,
			file: undefined,
			url: undefined
		}))

	const [local, setLocal] = useState<PreviewItem[]>(
		images.length ? [...images, ...createEmptySlots()].slice(0, 10) : createEmptySlots()
	)

	const resolveImageUrl = (url?: string) => {
		if (!url) return ''

		// локальне превʼю
		if (url.startsWith('blob:')) return url

		// абсолютний url
		if (url.startsWith('http://') || url.startsWith('https://')) return url

		// файли з бекенду
		if (url.startsWith('/uploads')) return `/api${url}`

		// статичні картинки
		if (url.startsWith('/images')) return url

		return ''
	}

	// 🔹 відправляємо на бек тільки заповнені фото, але UI зберігає всі слоти
	useEffect(() => {
		const filled = local.filter(i => i.url || i.file)
		onChange?.(filled)
	}, [local, onChange])

	const MAX_FILE_SIZE_MB = 20
	const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

	// const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const files = e.target.files
	// 	if (!files) return

	// 	const newImgs = Array.from(files).map(f => ({
	// 		id: `img-${Date.now()}-${Math.random()}`,
	// 		file: f,
	// 		url: URL.createObjectURL(f)
	// 	}))

	// 	setLocal(prev => {
	// 		const updated = [...prev]
	// 		for (const img of newImgs) {
	// 			const emptyIndex = updated.findIndex(i => !i.url)
	// 			if (emptyIndex === -1) break
	// 			updated[emptyIndex] = img
	// 		}
	// 		return updated
	// 	})
	// }

	const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) return

		const oversized = Array.from(files).filter(f => f.size > MAX_FILE_SIZE_BYTES)

		if (oversized.length) {
			oversized.forEach(f =>
				toast.error(
					`"${f.name}" перевищує ліміт ${MAX_FILE_SIZE_MB}MB (${(f.size / 1024 / 1024).toFixed(1)}MB)`
				)
			)
			e.target.value = ''
			return
		}

		const newImgs = Array.from(files).map(f => ({
			id: `img-${Date.now()}-${Math.random()}`,
			file: f,
			url: URL.createObjectURL(f)
		}))

		setLocal(prev => {
			const updated = [...prev]
			for (const img of newImgs) {
				const emptyIndex = updated.findIndex(i => !i.url)
				if (emptyIndex === -1) break
				updated[emptyIndex] = img
			}
			return updated
		})
	}

	const handleRemove = (id: string) => {
		setLocal(prev => {
			return prev.map(i => (i.id === id ? { ...i, url: undefined, file: undefined } : i))
		})
	}

	return (
		<div className='flex gap-x-5 items-center'>
			<label className='inline-flex flex-col items-center justify-center w-[162px] h-[162px] rounded-md border-2 border-sc-1 cursor-pointer product-card-shadow'>
				<input type='file' multiple className='hidden' onChange={handleAdd} />
				<div className='add-btn-link bg-primary mb-2'>
					<Add />
				</div>
				<p className='font-medium text-center'>Додати фото</p>
			</label>

			<ReactSortable list={local} setList={setLocal} className='grid grid-cols-5 gap-4'>
				{local.map((item, idx) => (
					<div
						key={item.id}
						className={`relative w-[72px] h-[72px] rounded-md border-2 border-sc-1 product-card-shadow overflow-hidden flex items-center justify-center ${
							item.url ? 'hover:cursor-grab active:cursor-grabbing' : ''
						}`}
					>
						{item.url ? (
							<Image
								src={resolveImageUrl(item.url)}
								alt=''
								width={72}
								height={72}
								className='object-contain w-full h-full'
							/>
						) : (
							<div className='w-8 h-8 flex items-center justify-center rounded-full bg-primary'>
								<p className='text-white font-medium'>{idx + 1}</p>
							</div>
						)}

						{item.url && (
							<button
								type='button'
								onClick={() => handleRemove(item.id)}
								className='absolute top-1 right-1 w-7 h-7 rounded-full flex items-center justify-center bg-sc-5'
							>
								<Trash className='w-4 h-4' />
							</button>
						)}
					</div>
				))}
			</ReactSortable>
		</div>
	)
}

export default ProductImagesBlock
