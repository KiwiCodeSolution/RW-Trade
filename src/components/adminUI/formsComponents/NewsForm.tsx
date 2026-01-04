'use client'

import Collapse from '@/components/commonUI/Collapse'

import { Checked } from '@/assets/icons'

import { CreateNewsDto, NewsArticle } from '@/types/baseTypes'

import { newsStore } from '@/store/NewsStore'

import { BaseInput } from '../BaseInput'

import SingleImageUpload from './SingleImageUpload'
import TextEditor from './TextEditor'
import { useRouter } from '@/i18n/navigation'
import { toast } from '@/lib/toast'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type NewsFormValues = CreateNewsDto & { imageFile?: File | null }

const NewsForm = observer(({ news }: { news?: NewsArticle }) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<NewsFormValues>({
		defaultValues: news
			? {
					...news,
					imageFile: null
				}
			: {
					title: { uk: '', en: '' },
					subtitle: { uk: '', en: '' },
					content: { uk: '', en: '' },
					videoUrl: '',
					image: '',
					seo: {
						title: { uk: '', en: '' },
						description: { uk: '', en: '' },
						keywords: { uk: '', en: '' }
					},
					isNews: undefined,
					isPublished: true,
					imageFile: null
				}
	})

	useEffect(() => {
		if (news) {
			reset({
				...news,
				imageFile: null
			})
		}
	}, [news, reset])

	const router = useRouter()

	const image = watch('image')
	const isPublished = watch('isPublished')
	const isNews = watch('isNews')

	const onSubmit = async (data: CreateNewsDto & { imageFile?: File | null }) => {
		try {
			// Формуємо payload так, як чекає сервер
			const prepared: CreateNewsDto = {
				title: data.title, // залишаємо об'єкт
				subtitle: data.subtitle, // залишаємо об'єкт
				content: data.content, // залишаємо об'єкт
				seo: data.seo, // залишаємо об'єкт
				videoUrl: data.videoUrl || undefined,
				// image: data.image || '',
				isNews: Boolean(data.isNews),
				isPublished: Boolean(data.isPublished)
			}

			let result: NewsArticle | null = null

			if (news?._id) {
				result = await newsStore.updateNews({
					id: news._id,
					data: prepared,

					files: data.imageFile ? [data.imageFile] : undefined
				})
			} else {
				result = await newsStore.addNews({
					data: prepared,

					files: data.imageFile ? [data.imageFile] : undefined
				})
			}

			if (!result) throw new Error('Не вдалося отримати новину')

			reset() // очищаємо форму
			setValue('image', '')
			setValue('imageFile', null)
			router.push('/manage-panel/news')
		} catch (err) {
			console.error('❌ Помилка збереження новини:', err)
			toast.error('Не вдалося зберегти новину')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pt-3'>
			<div className='flex items-start gap-x-3'>
				<SingleImageUpload
					image={image ? { id: 'main', url: image } : undefined}
					onChange={preview => {
						setValue('image', preview?.url || '')
						setValue('imageFile', preview?.file || null)
					}}
					className='border-2 border-sc-1 product-card-shadow w-[162px] h-[162px]'
				/>
				<div className='flex flex-col gap-y-2 w-4/5'>
					<BaseInput<NewsFormValues>
						name='title.uk'
						label='Назва запису'
						type='text'
						register={register}
						errors={errors}
						isRequired
						requiredMessage='Назва запису є обов’язковою'
					/>
					<BaseInput<NewsFormValues>
						name='title.en'
						label='Назва запису (англійською)'
						type='text'
						register={register}
						errors={errors}
						isRequired
						requiredMessage='Назва запису є обов’язковою'
					/>
				</div>
			</div>

			<Collapse title='SEO-блок' sectionType='form'>
				<div className='grid grid-cols-1 2xl:grid-cols-2 gap-4'>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.title.uk'
						label='SEO-заголовок українською'
						register={register}
						errors={errors}
					/>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.title.en'
						label='SEO-title in English'
						register={register}
						errors={errors}
					/>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.description.uk'
						label='SEO-опис українською'
						register={register}
						errors={errors}
					/>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.description.en'
						label='SEO-description in English'
						register={register}
						errors={errors}
					/>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.keywords.uk'
						label='Ключові слова (укр)'
						register={register}
						errors={errors}
					/>
					<BaseInput<NewsFormValues>
						type='text'
						name='seo.keywords.en'
						label='Keywords (en)'
						register={register}
						errors={errors}
					/>
				</div>
			</Collapse>

			<div className='grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-4'>
				<BaseInput<NewsFormValues>
					type='text'
					name='subtitle.uk'
					label='Субтитул запису'
					register={register}
					errors={errors}
				/>
				<BaseInput<NewsFormValues>
					type='text'
					name='subtitle.en'
					label='Субтитул запису (англійською)'
					register={register}
					errors={errors}
				/>
			</div>

			<TextEditor
				name='content.uk'
				control={control}
				label='Новина українською'
				initialValue={news?.content?.uk || ''}
				rules={{ required: 'Текст є обов’язковим' }}
			/>
			<TextEditor
				name='content.en'
				control={control}
				label='Новина англійською'
				initialValue={news?.content?.en || ''}
				rules={{ required: 'Текст є обов’язковим' }}
			/>

			<BaseInput<NewsFormValues>
				type='text'
				name='videoUrl'
				label='Посилання на відео'
				register={register}
				errors={errors}
				placeholder='https://www.youtube.com/'
			/>

			<div className='grid grid-cols-3 2xl:grid-cols-3 gap-4 items-center'>
				<label className='flex items-center gap-2 cursor-pointer select-none'>
					<input type='checkbox' {...register('isPublished')} className='peer hidden' />
					<Checked isCheck={isPublished} />
					<span className='text-base font-semibold'>Чи опубліковано запис</span>
				</label>
			</div>

			<div className='grid grid-cols-3 2xl:grid-cols-3 gap-4 items-center'>
				<label className='flex items-center gap-2 cursor-pointer select-none'>
					<input type='checkbox' {...register('isNews')} className='peer hidden' />
					<Checked isCheck={isNews} />
					<span className='text-base font-semibold'>Новина</span>
				</label>
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='bg-primary text-white px-4 py-2 rounded hover:shadow-lg bg-gr-8 transition duration-300 disabled:opacity-50'
			>
				{isSubmitting ? 'Збереження...' : 'Створити / Зберегти запис'}
			</button>
		</form>
	)
})

export default NewsForm
