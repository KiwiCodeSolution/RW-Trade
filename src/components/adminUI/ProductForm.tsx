'use client'

import { Checked } from '@/assets/icons'

import { CreateProductDto, PreviewItem, Product, ProductStatus } from '@/types/baseTypes'

import { categoryStore } from '@/store/CategoryStore'
import { productStore } from '@/store/ProductsStore'

import Collapse from '../commonUI/Collapse'

import { BaseInput } from './BaseInput'
import ProductImagesBlock from './formsComponents/ProductImagesBlock'
import TextEditor from './formsComponents/TextEditor'

import { observer } from 'mobx-react-lite'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

type Created = Product | null

export type ProductFormValues = Omit<CreateProductDto, 'images' | 'price' | 'priceCurrency'> & {
	images: PreviewItem[]
	price?: number
	priceCurrency?: number
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
					priceCurrency: 0,
					wholesalePrice: 0,
					categoryId: '',
					subCategoryId: '',
					images: [] as PreviewItem[],
					isHit: false,
					newArrival: false,
					showDiscountBlock: false,
					showOfferBlock: false,
					videoUrl: '',
					characteristics: { uk: '', en: '' },
					status: ProductStatus.IN_STOCK,
					compatibility: { uk: '', en: '' },
					kit: { uk: '', en: '' },
					deliveryTerms: { uk: '', en: '' },
					initialRatingSum: 25,
					initialRatingCount: 5,
					isPublished: true,
					country: '',
					brand: ''
				}
	})

	useEffect(() => {
		if (!product) return
		reset({
			...(product as Product),
			images: toPreviewItems(product.images as string[] | undefined)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?._id])

	const { data: session } = useSession()
	const token = session?.user?.accessToken

	const searchParams = useSearchParams()
	const categoryIdFromQuery = searchParams.get('category')

	const categoryId = product?.categoryId || categoryIdFromQuery

	useEffect(() => {
		if (categoryStore.categories.length === 0) {
			categoryStore.fetchCategories()
		}

		if (categoryId) {
			setValue('categoryId', categoryId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId])

	const price = watch('price')
	const priceCurrency = watch('priceCurrency')

	useEffect(() => {
		if (price != null && price !== 0) {
			setValue('priceCurrency', undefined) // або 0, якщо тобі так зручно
		}
	}, [price, setValue])

	useEffect(() => {
		if (priceCurrency != null && priceCurrency !== 0) {
			setValue('price', undefined)
		}
	}, [priceCurrency, setValue])

	useEffect(() => {
		if (categoryStore.categories.length === 0) categoryStore.fetchCategories()
		if (categoryId) {
			setValue('categoryId', categoryId)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const currentCategory = useMemo(() => {
		if (!categoryId || categoryStore.categories.length === 0) return undefined
		return categoryStore.categories.find(c => c._id === categoryId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, categoryStore.categories])

	const images = watch('images')

	const onSubmit = async (data: ProductFormValues) => {
		const filesOnly = (data.images ?? []).filter(
			(i): i is PreviewItem & { file: File } => !!i?.file
		)

		// Гарантуємо лише string[]
		const imageUrls = (data.images ?? [])
			.map(i => i.url)
			.filter((u): u is string => typeof u === 'string')

		let prepared: CreateProductDto

		if (data.price !== undefined && data.price !== 0) {
			prepared = {
				...data,
				price: data.price,
				priceCurrency: undefined,
				images: imageUrls,
				inStock: isInStock ? Number(data.inStock) || 0 : 0
			}
		} else if (data.priceCurrency !== undefined && data.priceCurrency !== 0) {
			prepared = {
				...data,
				priceCurrency: data.priceCurrency,
				price: undefined,
				images: imageUrls,
				inStock: isInStock ? Number(data.inStock) || 0 : 0
			}
		} else {
			throw new Error('Вкажи або price, або priceCurrency')
		}
		let result: Created = null

		if (product?._id) {
			result = await productStore.updateProduct({
				id: product._id,
				product: prepared,
				token: token ?? '',
				files: filesOnly.map(i => i.file)
			})
		} else {
			result = await productStore.createProduct({
				product: prepared,
				token: token ?? '',
				files: filesOnly.map(i => i.file)
			})
		}

		if (result) {
			reset()
			setValue('images', [])
		}
	}

	const rait = useMemo(() => {
		const sum = watch('initialRatingSum') || 0
		const count = watch('initialRatingCount') || 0
		if (count === 0) return 0

		const res = sum / count
		if (res > 5) return 5

		return (sum / count).toFixed(2)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('initialRatingSum'), watch('initialRatingCount')])

	const status = watch('status')
	const isInStock = status === ProductStatus.IN_STOCK

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pt-3'>
				{/* блок додавання / редагування фото */}
				<ProductImagesBlock
					images={images ?? []}
					onChange={imgs => {
						const prev = images ?? []
						const changed =
							prev.length !== imgs.length ||
							prev.some((p, i) => p.url !== imgs[i]?.url)
						if (changed) setValue('images', imgs)
					}}
				/>
				<Collapse title='SEO-блок' sectionType='form'>
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
										defaultValue={product?.subCategoryId || ''}
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

				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<div className='flex items-end gap-x-3'>
						<BaseInput<ProductFormValues>
							name='sku'
							label='Код товару'
							type='text'
							register={register}
							errors={errors}
							placeholder='RW-2025-AX47B9'
							isRequired={status === ProductStatus.IN_STOCK}
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
					<div className=''>
						<BaseInput<ProductFormValues>
							name='brand'
							label='Бренд товару'
							type='text'
							register={register}
							errors={errors}
							isRequired
							placeholder='RWTrade'
							requiredMessage='Поле є обов’язковим'
						/>
					</div>
				</div>

				<div className='w-full grid grid-cols-2 xl:grid-cols-4 items-center gap-x-4'>
					<BaseInput<ProductFormValues>
						name='price'
						label='Ціна, роздріб, ₴'
						type='number'
						register={register}
						errors={errors}
						placeholder='123456'
						pattern={/^\d+$/}
						patternMessage='Ціна повинна бути числом'
					/>
					<BaseInput<ProductFormValues>
						name='priceCurrency'
						label='Ціна, роздріб, $'
						type='number'
						register={register}
						errors={errors}
						placeholder='123456'
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
						disabled={!isInStock}
						isRequired={isInStock}
						requiredMessage='Поле є обов’язковим'
						pattern={/^\d+$/}
						patternMessage='Кількість повинна бути числом'
					/>
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

				{/* характеристика */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<TextEditor
						name='characteristics.uk'
						control={control}
						label='характеристика українською'
						initialValue={product?.characteristics?.uk || ''}
					/>
					<TextEditor
						name='characteristics.en'
						control={control}
						label='Characteristics in English'
						initialValue={product?.characteristics?.en || ''}
					/>
				</div>

				{/* сумісність */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<TextEditor
						name='compatibility.uk'
						control={control}
						label='сумісність українською'
						initialValue={product?.compatibility?.uk || ''}
					/>
					<TextEditor
						name='compatibility.en'
						control={control}
						label='Compatibility in English'
						initialValue={product?.compatibility?.en || ''}
					/>
				</div>

				{/* комплектація */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<TextEditor
						name='kit.uk'
						control={control}
						label='комплектація українською'
						initialValue={product?.kit?.uk || ''}
					/>
					<TextEditor
						name='kit.en'
						control={control}
						label='Kit in English'
						initialValue={product?.kit?.en || ''}
					/>
				</div>

				{/* умови доставки */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<TextEditor
						name='deliveryTerms.uk'
						control={control}
						label='Умови доставки українською'
						initialValue={product?.deliveryTerms?.uk || ''}
					/>
					<TextEditor
						name='deliveryTerms.en'
						control={control}
						label='Delivery terms in English'
						initialValue={product?.deliveryTerms?.en || ''}
					/>
				</div>

				{/* країна, відео-лінк */}
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<BaseInput<ProductFormValues>
						name='country'
						label='Країна виробник'
						type='text'
						register={register}
						isRequired
						errors={errors}
						placeholder='Ukraine'
						requiredMessage='Поле є обов’язковим'
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
					{/* <BaseInput<ProductFormValues>
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
					/> */}
					<BaseInput<ProductFormValues>
						name='initialRatingSum'
						label='Сумарний рейтинг'
						type='number'
						register={register}
						validation={{
							min: 0,
							validate: value => {
								const count = watch('initialRatingCount') || 1
								const avg = Number(value) / count
								return avg <= 5 || 'Середній рейтинг не може бути більше 5'
							}
						}}
						errors={errors}
						placeholder='25'
					/>

					<BaseInput<ProductFormValues>
						name='initialRatingCount'
						label='Кількість відгуків'
						type='number'
						register={register}
						validation={{
							min: { value: 1, message: 'Має бути хоча б один відгук' },
							validate: value => {
								const sum = watch('initialRatingSum') || 0
								const avg = sum / Number(value)
								return avg <= 5 || 'Середній рейтинг не може бути більше 5'
							}
						}}
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
					className='bg-primary text-white px-4 py-2 rounded hover:shadow-lg bg-gr-8 transition duration-300 disabled:opacity-50'
				>
					{isSubmitting ? 'Збереження...' : 'Створити / Зберегти товар'}
				</button>
			</form>
		</div>
	)
})

export default ProductForm
