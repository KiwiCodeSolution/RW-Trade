'use client'

import { Banner, BannerType, CreateBannerDto, PreviewItem } from '@/types/baseTypes'

import { bannersStore } from '@/store/BannersStore'

import { BaseInput } from './BaseInput'
import SingleImageUpload from './formsComponents/SingleImageUpload'
import { toast } from '@/lib/toast'

import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

type Props = {
	banner?: Banner
	type?: BannerType
	resultFnc: () => void
}

type BannerFormValues = CreateBannerDto & {
	imageFile?: File | null
}

const BannerForm = ({ banner, type, resultFnc }: Props) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<BannerFormValues>({
		defaultValues: {
			link: banner?.link || '',
			image: banner?.image || '',
			type: banner?.type || type,
			imageFile: null
		}
	})

	const image = watch('image')

	const { data: session } = useSession()
	const token = session?.user?.accessToken

	const onSubmit = async (data: BannerFormValues) => {
		try {
			if (!token) {
				toast.error('Ви не авторизовані')
				return
			}

			const formData = new FormData()
			formData.append('link', data.link)
			formData.append('type', data.type)

			// якщо вибране нове фото → відправляємо
			if (data.imageFile) {
				formData.append('image', data.imageFile)
			}

			if (banner?._id) {
				await bannersStore.update(banner._id, { ...banner, ...data }, token)
			} else {
				await bannersStore.create(data, token)
			}

			reset()

			resultFnc() // закриваємо модалку
		} catch (err) {
			console.error('Помилка при збереженні банера:', err)
			toast.error('Не вдалося зберегти банер')
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-6 pt-3 w-full items-center py-5'
		>
			{/* Картинка */}
			<SingleImageUpload
				image={image ? { id: 'banner', url: image } : undefined}
				onChange={(preview?: PreviewItem) => {
					setValue('image', preview?.url || '')
					setValue('imageFile', preview?.file || null)
				}}
				className='w-[372px] h-[176px]'
			/>

			{/* Лінк */}
			<div className='w-4/5'>
				<BaseInput<BannerFormValues>
					name='link'
					label='Посилання'
					type='text'
					register={register}
					errors={errors}
					isRequired
					requiredMessage='Лінк обов’язковий'
				/>
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg bg-gr-8 transition duration-300 disabled:opacity-50'
			>
				{isSubmitting ? 'Збереження...' : banner?._id ? 'Оновити банер' : 'Створити банер'}
			</button>
		</form>
	)
}

export default BannerForm
