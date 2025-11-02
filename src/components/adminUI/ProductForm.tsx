/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Checked } from '@/assets/icons'

import { CreateProduct, PreviewItem, Product, ProductStatus } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'
import { productStore } from '@/store/ProductsStore'

import { BaseInput } from './BaseInput'
import Collapse from './Collapse'
import ProductImagesBlock from './formsComponents/ProductImagesBlock'
import TextEditor from './formsComponents/TextEditor'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

type Created = Product | null

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
		control,
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
					deliveryTerms: '',
					initialRatingSum: 25,
					initialRatingCount: 5,
					isPublished: true
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

	const { data: session } = useSession()
	const token = session?.user?.accessToken

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

	const normalizeCompatibility = (input: string | string[]) => {
		if (Array.isArray(input)) return input
		if (!input.trim()) return []
		return input
			.split(',')
			.map(item => item.trim())
			.filter(Boolean)
	}

	const onSubmit = async (data: ProductFormValues) => {
		const filesOnly = (data.images ?? []).filter(
			(i): i is PreviewItem & { file: File } => !!i?.file
		)

		const prepared: CreateProduct = {
			...data,
			compatibility: normalizeCompatibility(data.compatibility as unknown as string)
		}

		const created: Created = await productStore.createProduct({
			product: prepared,
			token: token ?? '',
			files: filesOnly.map(i => i.file)
		})

		if (created) {
			// успіх → чистимо форму та локальні картинки
			reset() // react-hook-form
			setValue?.('images', []) // якщо керуєш цим полем через RHF
		}
	}

	const rait = useMemo(() => {
		const sum = watch('initialRatingSum') || 0
		const count = watch('initialRatingCount') || 0
		if (count === 0) return 0

		const res = sum / count
		if (res > 5) return 5

		return (sum / count).toFixed(2)
	}, [watch('initialRatingSum'), watch('initialRatingCount')])

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pt-3'>
				{/* блок додавання / редагування фото */}
				<ProductImagesBlock
					images={images ?? []}
					onChange={imgs => setValue('images', imgs)}
				/>
				<Collapse title='SEO-блок (не обов’язкові поля)'>
					<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
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

				{/* назва */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
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

				{/* півкатегорія та статус */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
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
								<div className='relative flex flex-col gap-1 overflow-hidden max-w-[600px]'>
									<select
										id='subcategory'
										{...register('subCategoryId')}
										className='w-[600px] h-10 border border-gr-2 rounded-lg px-3 py-2 text-base text-txt-dark bg-white 
               focus:border-bg-green focus:outline-none transition-colors duration-200 cursor-pointer'
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
					<div>
						<label
							htmlFor='status'
							className='font-semibold relative flex items-center gap-x-1'
						>
							Статус товару (наявність)
						</label>
						<div className='relative flex flex-col gap-1 overflow-hidden max-w-[600px]'>
							<select
								id='status'
								{...register('status')}
								className='w-[600px] h-10 border border-gr-2 rounded-lg px-3 py-2 text-base text-txt-dark bg-white 
               focus:border-bg-green focus:outline-none transition-colors duration-200 cursor-pointer'
							>
								<option value={ProductStatus.IN_STOCK}>В наявності</option>
								<option value={ProductStatus.EXPECTED}>Очікується</option>
								<option value={ProductStatus.ON_ORDER}>Під замовлення</option>
							</select>
						</div>
					</div>
				</div>

				{/* код товару, чекбокси, ціна та кількість товару */}
				<div className='w-full grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<div className='flex items-end gap-x-3'>
						<BaseInput<ProductFormValues>
							name='sku'
							label='Код товару'
							type='text'
							register={register}
							errors={errors}
							placeholder='RW-2025-AX47B9'
							isRequired
							requiredMessage='Код є обов’язковим'
						/>
						<div className='grid grid-cols-2 gap-2 items-end mx-4 h-full'>
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
								<input
									type='checkbox'
									{...register('isHit')}
									className='peer hidden'
								/>
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
								<span className='text-base font-semibold'>
									Пропозиції партнерів
								</span>
							</label>
						</div>
					</div>

					<div className='flex items-center gap-x-4'>
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
						/>

						<BaseInput<ProductFormValues>
							name='inStock'
							label='Кількість на складі'
							type='number'
							register={register}
							errors={errors}
							placeholder='123456'
							isRequired
							requiredMessage='Поле є обов’язковим'
							pattern={/^\d+$/}
							patternMessage='Кількість повинна бути числом'
						/>
					</div>
				</div>

				{/* Опис */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4 mt-4'>
					<TextEditor
						name='description.uk'
						control={control}
						label='Опис українською'
						initialValue={product?.description?.uk || ''}
						rules={{ required: 'Опис українською є обов’язковим' }}
					/>

					<TextEditor
						name='description.en'
						control={control}
						label='Description in English'
						initialValue={product?.description?.en || ''}
						rules={{ required: 'Description in English is required' }}
					/>
				</div>

				{/* виробник та бренд */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<BaseInput<ProductFormValues>
						name='characteristics.country'
						label='Країна-виробник'
						type='text'
						register={register}
						errors={errors}
						placeholder='Україна'
					/>

					<BaseInput<ProductFormValues>
						name='characteristics.brand'
						label='Назва бренду'
						type='text'
						register={register}
						errors={errors}
						placeholder='RW Trade'
					/>
				</div>

				{/* сумісність і комплектація */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<BaseInput<ProductFormValues>
						name='compatibility'
						label='Сумісність (через кому)'
						type='text'
						register={register}
						errors={errors}
						placeholder='Audi, BMW, Ford'
					/>

					<BaseInput<ProductFormValues>
						name='kit'
						label='Комплектація (через кому)'
						type='text'
						register={register}
						errors={errors}
						placeholder='Кабель, перехідник, адаптер'
					/>
				</div>

				{/* умови доставки, відео-лінк */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<BaseInput<ProductFormValues>
						name='deliveryTerms'
						label='Умови доставки'
						type='text'
						register={register}
						errors={errors}
						placeholder='Безкоштовна доставка від 500 грн'
					/>

					<BaseInput<ProductFormValues>
						name='videoUrl'
						label='Посилання на відео'
						type='text'
						register={register}
						errors={errors}
						placeholder='https://www.youtube.com/'
					/>
				</div>

				{/* рейтинг */}
				<div className='grid grid-cols-3 2xl:grid-cols-3 gap-4 items-center'>
					<BaseInput<ProductFormValues>
						name='initialRatingSum'
						label='Сумарний рейтинг'
						type='number'
						register={register}
						errors={errors}
						placeholder='25'
					/>

					<BaseInput<ProductFormValues>
						name='initialRatingCount'
						label='Кількість відгуків'
						type='number'
						register={register}
						errors={errors}
						placeholder='5'
					/>

					<div className='flex items-center gap-1 pt-3'>
						<p className='text-base font-semibold'>
							Рейтинг продукту на сайті:{' '}
							<span className='text-link-bronze text-xl font-bold'>{rait}</span>
						</p>
					</div>
				</div>

				<div className='grid grid-cols-3 2xl:grid-cols-3 gap-4 items-center'>
					<label className='flex items-center gap-2 cursor-pointer select-none'>
						<input
							type='checkbox'
							{...register('isPublished')}
							className='peer hidden'
						/>
						<Checked isCheck={watch('isPublished')} />
						<span className='text-base font-semibold'>Чи опубліковано продукт</span>
					</label>
				</div>

				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-primary text-white px-4 py-2 rounded hover:bg-gr-8 transition'
				>
					{isSubmitting ? 'Збереження...' : 'Створити / Зберегти товар'}
				</button>
			</form>
		</div>
	)
})

export default ProductForm
