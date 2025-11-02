'use client'

import { Checked, InputField } from '@/assets/icons'

import { PreviewItem, Product, ProductStatus } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'

import { BaseInput } from './BaseInput'
import Collapse from './Collapse'
import ProductImagesBlock from './formsComponents/ProductImagesBlock'
import { toast } from '@/lib/toast'

import { toJS } from 'mobx'
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
					status: ProductStatus.IN_STOCK,
					compatibility: [],
					kit: '',
					deliveryTerms: ''
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

	console.log(toJS(currentCategory))

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pt-3'>
				{/* блок додавання / редагування фото */}
				<ProductImagesBlock
					images={images ?? []}
					onChange={imgs => setValue('images', imgs)}
				/>
				<Collapse title='SEO-блок (не обов’язкові поля)'>
					<div className='grid grid-cols-2 gap-4'>
						<BaseInput<ProductFormValues>
							name='seo.title.uk'
							label='SEO-заголовок українською'
							type='text'
							register={register}
							errors={errors}
							placeholder='SEO-заголовок українською'
						/>

						<BaseInput<ProductFormValues>
							name='seo.title.en'
							label='SEO-title in English'
							type='text'
							register={register}
							errors={errors}
							placeholder='SEO-title in English'
						/>

						<BaseInput<ProductFormValues>
							name='seo.description.uk'
							label='SEO-опис українською'
							type='text'
							register={register}
							errors={errors}
							placeholder='SEO-опис українською'
						/>

						<BaseInput<ProductFormValues>
							name='seo.description.en'
							label='SEO-description in English'
							type='text'
							register={register}
							errors={errors}
							placeholder='SEO-description in English'
						/>

						<BaseInput<ProductFormValues>
							name='seo.keywords.uk'
							label='Ключові слова (укр)'
							type='text'
							register={register}
							errors={errors}
							placeholder='Ключові слова (укр)'
						/>

						<BaseInput<ProductFormValues>
							name='seo.keywords.en'
							label='Keywords (en)'
							type='text'
							register={register}
							errors={errors}
							placeholder='Keywords (en)'
						/>
					</div>
				</Collapse>

				{/* поля форми нижче */}
				<div className='grid grid-cols-2 gap-4'>
					<BaseInput<ProductFormValues>
						name='title.uk'
						label='Назва українською'
						type='text'
						register={register}
						errors={errors}
						placeholder='Назва українською'
						isRequired
						requiredMessage='Назва є обов’язковою'
					/>

					<BaseInput<ProductFormValues>
						name='title.en'
						label='Name in English'
						type='text'
						register={register}
						errors={errors}
						placeholder='Назва англійською'
						isRequired
						requiredMessage='Назва є обов’язковою'
					/>
				</div>

				<div className='flex items-center gap-x-5'>
					{/* мапимо підкатегорію */}
					<div className='flex flex-col gap-y-1'>
						{currentCategory?.subcategories &&
						currentCategory?.subcategories.length > 0 ? (
							<>
								<label
									htmlFor='subcategory'
									className='font-semibold relative flex items-center gap-x-1'
								>
									Виберіть підкатегорію
								</label>
								<div className='relative flex flex-col gap-1 overflow-hidden max-w-[600px] '>
									<InputField className='absolute top-0 left-0 w-[600px] h-full z-0' />
									<select
										id='subcategory'
										{...register('subCategoryId')}
										className='w-[600px] h-10 outline-none relative z-[1] px-2'
									>
										<option value=''>Без підкатегорії</option>
										{currentCategory?.subcategories.map(sub => (
											<option key={sub._id} value={sub._id}>
												{sub.title.uk}
											</option>
										))}
									</select>
								</div>
							</>
						) : (
							<p className='font-semibold w-[600px]'>
								У цій категорії немає підкатегорій
							</p>
						)}
					</div>
					<BaseInput<ProductFormValues>
						name='price'
						label='Ціна, роздріб'
						type='number'
						register={register}
						errors={errors}
						placeholder='123456'
						isRequired
						requiredMessage='Роздрібна ціна є обов’язковою'
						pattern={/^\d+$/}
						patternMessage='Ціна повинна бути числом'
						width={200}
					/>
					<BaseInput<ProductFormValues>
						name='wholesalePrice'
						label='Ціна, гурт'
						type='number'
						register={register}
						errors={errors}
						placeholder='123456'
						pattern={/^\d+$/}
						patternMessage='Ціна повинна бути числом'
						width={200}
					/>
				</div>

				<div className='w-full flex items-end gap-x-3'>
					<BaseInput<ProductFormValues>
						name='sku'
						label='Код товару'
						type='text'
						register={register}
						errors={errors}
						placeholder='RW-2025-AX47B9'
						isRequired
						requiredMessage='Код є обов’язковим'
						width={200}
					/>
					<div className='grid grid-cols-2 gap-2 items-end ml-4 h-full'>
						<label className='flex items-center gap-2 cursor-pointer select-none'>
							<input
								type='checkbox'
								{...register('newArrival')}
								className='peer hidden'
							/>
							<Checked isCheck={watch('newArrival')} />
							<span className='text-base font-semibold'>Новинка</span>
						</label>

						<label className='flex items-center gap-2 cursor-pointer select-none'>
							<input type='checkbox' {...register('isHit')} className='peer hidden' />
							<Checked isCheck={watch('isHit')} />
							<span className='text-base font-semibold'>Хіт</span>
						</label>

						<label className='flex items-center gap-2 cursor-pointer select-none'>
							<input
								type='checkbox'
								{...register('showDiscountBlock')}
								className='peer hidden'
							/>
							<Checked isCheck={watch('showDiscountBlock')} />
							<span className='text-base font-semibold'>Акція</span>
						</label>

						<label className='flex items-center gap-2 cursor-pointer select-none'>
							<input
								type='checkbox'
								{...register('showOfferBlock')}
								className='peer hidden'
							/>
							<Checked isCheck={watch('showOfferBlock')} />
							<span className='text-base font-semibold'>Пропозиції партнерів</span>
						</label>
					</div>
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
