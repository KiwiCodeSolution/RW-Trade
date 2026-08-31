'use client'

import { Subcategory } from '@/types/baseTypes'

import { createSubCategory, updateSubCategory } from '@/api/categories'

import Spinner from '../commonUI/loader/Spinner'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { useState } from 'react'

export default function CategoriesEditor({
	categoryId,
	onSuccess,
	initialData
}: {
	categoryId: string
	onSuccess: () => void
	initialData?: Subcategory | null
}) {
	const [titleUk, setTitleUk] = useState(initialData?.title.uk ?? '')
	const [titleEn, setTitleEn] = useState(initialData?.title.en ?? '')
	const [isLoading, setIsLoading] = useState(false)

	const disabled = !titleUk.trim() || !titleEn.trim()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (disabled) return

		try {
			setIsLoading(true)
			if (initialData?._id) {
				await updateSubCategory({
					id: categoryId,
					subId: initialData._id,
					data: {
						title: {
							uk: titleUk.trim(),
							en: titleEn.trim()
						}
					}
				})
			} else {
				await createSubCategory({
					id: categoryId,
					data: {
						title: {
							uk: titleUk.trim(),
							en: titleEn.trim()
						}
					}
				})
			}
			setTitleUk('')
			setTitleEn('')
			setIsLoading(false)
			onSuccess()
			toast.success(initialData?._id ? 'Оновлено' : 'Створено')
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error(
					initialData?._id
						? 'Не вдалося оновити підкатегорію'
						: 'Не вдалося створити підкатегорію'
				)
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<p className='text-xl font-medium text-center mt-12 max-w-[417px] mx-auto '>
				Створіть підкатегорію в якій будемо налаштовувати фільтри:
			</p>
			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-2 gap-x-4 max-w-[90%] mx-auto mt-8'
			>
				<div className='flex flex-col gap-y-[2px]'>
					<label htmlFor='title-uk' className='text-sm'>
						Українська
					</label>

					<input
						type='text'
						placeholder='Назвіть підкатегорію'
						id='title-uk'
						value={titleUk}
						onChange={e => setTitleUk(e.target.value)}
						className='border px-4 py-2 rounded-lg border-sc-1'
					/>
				</div>
				<div className='flex flex-col gap-y-[2px]'>
					<label htmlFor='title-en' className='text-sm'>
						English
					</label>
					<input
						type='text'
						placeholder='Subcategory name'
						id='title-en'
						value={titleEn}
						onChange={e => setTitleEn(e.target.value)}
						className='border px-4 py-2 rounded-lg border-sc-1'
					/>
				</div>

				<button
					type='submit'
					disabled={disabled}
					className={`col-span-2 mt-[50px] py-1 px-4 w-fit h-9 rounded-4xl  text-white mx-auto  ${disabled ? 'bg-sc-2 cursor-not-allowed' : 'bg-bronze cursor-pointer'}`}
				>
					{!isLoading ? (
						initialData?._id ? (
							'Оновити'
						) : (
							'Створити підкатегорію'
						)
					) : (
						<Spinner />
					)}
				</button>
			</form>
		</>
	)
}
