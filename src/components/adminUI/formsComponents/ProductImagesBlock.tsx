'use client'

import { Add, Trash } from '@/assets/icons'

import { BASE_IMG_URL } from '@/utils/config'

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
	// 🔹 стабільна ініціалізація слотів (без Math.random / crypto у SSR)
	const createStaticSlots = () =>
		Array.from({ length: 10 }, (_, i) => ({
			id: `slot-${i}`,
			file: undefined,
			url: undefined
		}))

	const [local, setLocal] = useState<PreviewItem[]>(images.length ? images : createStaticSlots())
	const resolveImageUrl = (url?: string) => {
		if (!url) return ''

		// 🔥 важливо: blob-URL не чіпаємо!
		if (url.startsWith('blob:')) return url

		// звичайні http/https
		if (url.startsWith('http://') || url.startsWith('https://')) return url

		return `${BASE_IMG_URL}${url.startsWith('/') ? url : `/${url}`}`
	}

	// 🔹 коли додаються або видаляються фото — оновлюємо форму, але не втрачаємо порожні слоти
	useEffect(() => {
		const filled = local.filter(i => i.url || i.file)

		// запобігаємо циклу: не викликаємо onChange, якщо масив ідентичний
		const prev = images || []
		const changed =
			filled.length !== prev.length ||
			filled.some((f, i) => f.url !== prev[i]?.url || f.id !== prev[i]?.id)

		if (changed) onChange?.(filled)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [local])

	// 🔹 якщо ззовні прийшли фото (наприклад, при редагуванні) — тільки додаємо їх у слоти
	useEffect(() => {
		if (images.length === 0) return

		setLocal(prev => {
			const base = prev.filter(i => !i.url && !i.file) // існуючі порожні
			const filled = images.map(img => ({
				id: img.id || `img-${crypto.randomUUID()}`,
				url: img.url,
				file: img.file
			}))
			const result = [...filled, ...base].slice(0, 10) // максимум 10
			return result
		})
	}, [images])
	const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) return

		const newImgs = Array.from(files).map(f => ({
			id: `img-${Date.now()}-${Math.random()}`, // унікальний, але стабільний після mount
			file: f,
			url: URL.createObjectURL(f)
		}))

		// замінюємо порожні слоти
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
			// 1. Фільтруємо всі заповнені елементи, крім видаленого
			const remaining = prev.filter(i => i.id !== id && i.url)

			// 2. Добудовуємо список порожніми слотами до 10 елементів
			const emptySlots = Array.from({ length: 10 - remaining.length }, (_, i) => ({
				id: `slot-${Date.now()}-${i}`,
				file: undefined,
				url: undefined
			}))

			return [...remaining, ...emptySlots]
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
								className='object-cover w-full h-full'
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

			<ul className='min-w-[210px] max-w-[450px] list-decimal pl-2'>
				<li className='mb-2'>
					<p className='text-xs font-medium bronze-text'>
						Ви можете додати до 10 зображень в одну картку товару
					</p>
				</li>
				<li className='mb-2'>
					<p className='text-xs font-medium bronze-text'>
						Ви можете змінювати порядок фото шляхом перетягування карток
					</p>
				</li>
				<li className='mb-2'>
					<p className='text-xs font-medium bronze-text'>
						Зображення під номером “1” буде заголовним і відображатиметься першим при
						відкритті сторінки з товаром
					</p>
				</li>
				<li>
					<p className='text-xs font-medium bronze-text'>
						Фон зображень повинен бути білим або прозорим для коректного відображення
						картки на сайті
					</p>
				</li>
			</ul>
		</div>
	)
}

export default ProductImagesBlock
