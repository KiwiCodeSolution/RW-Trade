'use client'

import { Product, ProductStatus } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import { toast } from '@/lib/toast'

import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type ProductFormValues = Omit<Product, '_id' | 'slugUk' | 'slugEn'>

const ProductForm = observer(({ product }: { product?: Product }) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<ProductFormValues>({
		defaultValues: product ?? {
			title: { uk: '', en: '' },
			description: { uk: '', en: '' },
			price: 0,
			wholesalePrice: 0,
			categoryId: '',
			subCategoryId: '',
			images: [],
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
		if (product) reset(product)
	}, [product])
	const searchParams = useSearchParams()
	const categoryId = searchParams.get('category')

	// якщо categories ще не завантажені, можеш ініціалізувати
	useEffect(() => {
		if (categoryStore.categories.length === 0) {
			categoryStore.fetchCategories()
		}
	}, [])

	// обчислюємо поточну категорію без окремого useState
	const currentCategory = useMemo(() => {
		if (!categoryId) return undefined
		return categoryStore.categories.find(c => c._id === categoryId)
	}, [categoryId])

	const onSubmit = async (data: ProductFormValues) => {
		try {
			console.log('submit data', data)
			// тут потім буде твій axios.post або patch
			toast.success('Товар успішно збережено')
		} catch (err) {
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

				{/* 🔹 Поле назв українською */}
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

				{/* 🔹 Поле назв англійською */}
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

				{/* 🔹 Ціна */}
				<div>
					<label className='block font-medium mb-1'>Ціна</label>
					<input
						type='number'
						step='0.01'
						{...register('price', { required: true, min: 0 })}
						className='w-full border rounded px-2 py-1'
					/>
				</div>

				{/* 🔹 Кнопка */}
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
