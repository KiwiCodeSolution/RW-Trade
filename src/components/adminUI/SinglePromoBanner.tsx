'use client'

import { Add } from '@/assets/icons'

import { CreatePromoBannerDto, PreviewItem, PromoBanner } from '@/types/baseTypes'

import { promoBannerStore } from '@/store/PromoBannerStore'

import { BaseInput } from './BaseInput'
import SingleImageUpload from './formsComponents/SingleImageUpload'
import { toast } from '@/lib/toast'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type PromoBannerFormValues = CreatePromoBannerDto & {
	imageFile?: File | null
}

const SinglePromoBanner = () => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<PromoBannerFormValues>({
		defaultValues: {
			title: { uk: '', en: '' },
			subtitle: { uk: '', en: '' },
			firstText: { uk: '', en: '' },
			secondText: { uk: '', en: '' },
			thirdText: { uk: '', en: '' },
			link: '',
			image: '',
			imageFile: null
		}
	})

	const [preview, setPreview] = useState<PreviewItem | undefined>()
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const fetchBanner = async () => {
			const banner: PromoBanner | null = await promoBannerStore.fetchPromoBanner({
				pageType: 'admin'
			})
			if (banner) {
				reset({
					title: banner.title,
					subtitle: banner.subtitle,
					firstText: banner.firstText,
					secondText: banner.secondText,
					thirdText: banner.thirdText,
					link: banner.link,
					image: banner.image,
					imageFile: null
				})
				if (banner.image) setPreview({ id: 'promo', url: banner.image })
			}
		}
		fetchBanner()
	}, [reset])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const img: PreviewItem = {
			id: `img-${Date.now()}`,
			file,
			url: URL.createObjectURL(file)
		}

		setPreview(img)
		setValue('image', img.url || '')
		setValue('imageFile', img.file || null)
	}

	const onSubmit = async (data: PromoBannerFormValues) => {
		// Якщо створюємо банер
		if (!promoBannerStore.banner?._id) {
			if (!data.imageFile) {
				toast.error('Зображення обов’язкове')
				return
			}
			await promoBannerStore.create(data as CreatePromoBannerDto & { imageFile: File })
			return
		}

		// створення банера
		if (promoBannerStore.banner?._id) {
			await promoBannerStore.update({
				...promoBannerStore.banner,
				...data
			})
		} else {
			// TypeScript тепер бачить, що imageFile точно є
			await promoBannerStore.create(data as CreatePromoBannerDto & { imageFile: File })
		}
	}
	return (
		<div className='w-full bg-primary p-4'>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				{/* Image Upload */}
				<div className='w-[624px] h-[326px] rounded-2xl flex items-center justify-center mx-auto bg-black/30 mb-10 relative'>
					<div className='w-[550px] h-[262px] rounded-2xl flex items-center justify-center border-[1px] border-black/30 relative'>
						<SingleImageUpload
							className='text-white w-[550px] h-[262px]'
							image={preview}
							onChange={(img?: PreviewItem) => {
								setPreview(img)
								setValue('image', img?.url || '')
								setValue('imageFile', img?.file || null)
							}}
						/>

						{preview && (
							<label className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 text-white px-3 py-1 hover:bg-black/50 transition inline-flex flex-col items-center justify-center rounded-md cursor-pointer'>
								<input
									type='file'
									className='hidden'
									ref={inputRef}
									onChange={handleFileChange}
								/>
								<div className='add-btn-link bg-primary mb-2'>
									<Add />
								</div>
								<p className='font-medium text-center text-white'>
									Замінити зображення
								</p>
							</label>
						)}
					</div>
				</div>

				{/* Text Inputs */}
				{['title', 'subtitle', 'firstText', 'secondText', 'thirdText'].map(field =>
					['uk', 'en'].map(lang => (
						<div key={`${field}.${lang}`} className='w-4/5'>
							<BaseInput<PromoBannerFormValues>
								name={`${field}.${lang}` as keyof PromoBannerFormValues}
								label={
									field === 'title'
										? `Назва ${lang === 'uk' ? 'українською' : 'англійською'}`
										: field === 'subtitle'
											? `Підзаголовок ${lang === 'uk' ? 'українською' : 'англійською'}`
											: `Пункт ${field === 'firstText' ? '1' : field === 'secondText' ? '2' : '3'} ${lang === 'uk' ? 'українською' : 'англійською'}`
								}
								type={field.includes('Text') ? 'textarea' : 'text'}
								register={register}
								errors={errors}
								isRequired
								requiredMessage='Цей пункт обов’язковий'
								textColor='white'
								borderColor='white'
							/>
						</div>
					))
				)}

				{/* Link */}
				<div className='w-4/5'>
					<BaseInput<PromoBannerFormValues>
						name='link'
						label='Посилання на сторінку чи товар'
						type='text'
						register={register}
						errors={errors}
						isRequired
						requiredMessage='Цей пункт обов’язковий'
						textColor='white'
						borderColor='white'
					/>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={isSubmitting}
					className='px-4 py-2 rounded-lg bg-other-4 hover:shadow-lg transition duration-300 mx-auto'
				>
					<span className='gradient-text'>
						{isSubmitting
							? 'Збереження...'
							: promoBannerStore.banner?._id
								? 'Оновити банер'
								: 'Створити банер'}
					</span>
				</button>
			</form>
		</div>
	)
}

export default SinglePromoBanner
