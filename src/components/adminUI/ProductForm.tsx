'use client'

import { PreviewItem, Product, ProductStatus } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import Collapse from './Collapse'
import ProductImagesBlock from './formsComponents/ProductImagesBlock'
import { toast } from '@/lib/toast'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type ProductFormValues = Omit<Product, '_id' | 'slugUk' | 'slugEn' | 'images'> & {
	images: PreviewItem[]
}

const toPreviewItems = (arr?: string[]) =>
	(arr ?? []).map(url => ({ id: crypto.randomUUID(), url }) as PreviewItem)

const ProductForm = observer(({ product }: { product?: Product }) => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<ProductFormValues>({
		defaultValues: product
			? {
					...(product as Product),
					images: toPreviewItems(product.images as string[] | undefined)
				}
			: {
					title: { uk: '', en: '' },
					description: { uk: '', en: '' },
					price: 0,
					wholesalePrice: 0,
					categoryId: '',
					subCategoryId: '',
					images: [] as PreviewItem[],
					isHit: false,
					newArrival: false,
					showDiscountBlock: false,
					showOfferBlock: false,
					videoUrl: '',
					characteristics: {},
					status: ProductStatus.IN_STOCK
				}
	})

	useEffect(() => {
		if (product) {
			reset({
				...(product as Product),
				images: toPreviewItems(product.images as string[] | undefined)
			})
		}
	}, [product, reset])

	const searchParams = useSearchParams()
	const categoryId = searchParams.get('category')

	useEffect(() => {
		if (categoryStore.categories.length === 0) categoryStore.fetchCategories()
		if (categoryId) {
			setValue('categoryId', categoryId)
		}
	}, [])

	const currentCategory = useMemo(() => {
		if (!categoryId) return undefined
		return categoryStore.categories.find(c => c._id === categoryId)
	}, [categoryId])

	const images = watch('images') // PreviewItem[]

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log('submit data', data)
			toast.success('Товар успішно збережено')
		} catch {
			toast.error('Помилка при збереженні')
		}
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-6 p-4 bg-white rounded-xl shadow-md'
			>
				<h2 className='text-2xl font-semibold'>
					{product ? 'Редагувати товар' : 'Новий товар'}
				</h2>

				{/* блок додавання / редагування фото */}
				<ProductImagesBlock
					images={images ?? []}
					onChange={imgs => setValue('images', imgs)}
				/>
				<Collapse title='Основна інформація'>
					<p>тут будуть оновны поля</p>
				</Collapse>

				{/* поля форми нижче */}
				<div>
					<label className='block font-medium mb-1'>Назва (укр)</label>
					<input
						{...register('title.uk', { required: 'Обов’язкове поле' })}
						className='w-full border rounded px-2 py-1'
					/>
					{errors.title?.uk && (
						<p className='text-red-500 text-sm'>{errors.title.uk.message}</p>
					)}
				</div>

				<div>
					<label className='block font-medium mb-1'>Назва (англ)</label>
					<input
						{...register('title.en', { required: 'Обов’язкове поле' })}
						className='w-full border rounded px-2 py-1'
					/>
					{errors.title?.en && (
						<p className='text-red-500 text-sm'>{errors.title.en.message}</p>
					)}
				</div>

				<div>
					<label className='block font-medium mb-1'>Ціна</label>
					<input
						type='number'
						step='0.01'
						{...register('price', { required: true, min: 0 })}
						className='w-full border rounded px-2 py-1'
					/>
				</div>

				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-primary text-white px-4 py-2 rounded hover:bg-gr-8 transition'
				>
					{isSubmitting ? 'Збереження...' : 'Зберегти'}
				</button>
			</form>
		</div>
	)
})

export default ProductForm
