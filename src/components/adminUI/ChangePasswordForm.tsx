'use client'

import { Border, Hide, Show } from '@/assets/icons'

import { api } from '@/utils/axios'

import BtnSolid from '../commonUI/BtnSolid'
import Loader from '../commonUI/loader/Loader'

import { toast } from '@/lib/toast'

import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type ChangePasswordFormValues = {
	oldPassword: string
	newPassword: string
}

export default function ChangePasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm<ChangePasswordFormValues>({
		mode: 'onTouched'
	})

	const [showOld, setShowOld] = useState(false)
	const [showNew, setShowNew] = useState(false)

	const toggleOld = () => setShowOld(p => !p)
	const toggleNew = () => setShowNew(p => !p)

	const onSubmit = async (data: ChangePasswordFormValues) => {
		try {
			const res = await api.patch('/auth/change-password', {
				oldPassword: data.oldPassword,
				newPassword: data.newPassword
			})

			if (res.status === 200) {
				toast.success('Пароль успішно оновлено!')
				reset()
			}
		} catch (err: unknown) {
			const axiosError = err as AxiosError<{ message: string }>
			toast.error(
				axiosError.response?.data?.message || 'Щось пішло не так, спробуйте ще раз згодом'
			)
		}
	}

	if (isSubmitting) return <Loader />

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='min-w-[375px] max-w-md flex flex-col gap-y-6 relative p-4 bg-white rounded shadow'
		>
			{/* OLD PASSWORD */}
			<div className='flex flex-col gap-1 relative'>
				<label htmlFor='oldPassword' className='font-semibold'>
					Старий пароль
				</label>
				<div className='relative flex flex-col gap-1 overflow-hidden'>
					<Border className='absolute top-0 left-0 w-full h-full z-0' />
					<input
						id='oldPassword'
						type={showOld ? 'text' : 'password'}
						autoComplete='off'
						placeholder='Введіть старий пароль'
						className='w-full outline-none px-3 py-2 relative z-[1] text-base placeholder:text-sc-2'
						{...register('oldPassword', {
							required: 'Старий пароль обовʼязковий'
						})}
					/>
					<button
						type='button'
						onClick={toggleOld}
						className='absolute right-3 top-1/2 -translate-y-1/2 z-[2] text-gray-500'
					>
						{showOld ? <Show /> : <Hide />}
					</button>
					{errors.oldPassword && (
						<p className='text-sc-5 italic text-sm absolute -bottom-5 left-1'>
							{errors.oldPassword.message}
						</p>
					)}
				</div>
			</div>

			{/* NEW PASSWORD */}
			<div className='flex flex-col gap-1 relative'>
				<label htmlFor='newPassword' className='font-semibold'>
					Новий пароль
				</label>
				<div className='relative flex flex-col gap-1 overflow-hidden'>
					<Border className='absolute top-0 left-0 w-full h-full z-0' />
					<input
						id='newPassword'
						type={showNew ? 'text' : 'password'}
						autoComplete='off'
						placeholder='Введіть новий пароль'
						className='w-full outline-none px-3 py-2 relative z-[1] text-base placeholder:text-sc-2'
						{...register('newPassword', {
							required: 'Новий пароль обовʼязковий',
							minLength: { value: 6, message: 'Мінімум 6 символів' }
						})}
					/>
					<button
						type='button'
						onClick={toggleNew}
						className='absolute right-3 top-1/2 -translate-y-1/2 z-[2] text-gray-500'
					>
						{showNew ? <Show /> : <Hide />}
					</button>
					{errors.newPassword && (
						<p className='text-sc-5 italic text-sm absolute -bottom-5 left-1'>
							{errors.newPassword.message}
						</p>
					)}
				</div>
			</div>

			{/* SUBMIT */}
			<BtnSolid as='button' btnType='submit' variant='primary'>
				{isSubmitting ? 'Зачекайте...' : 'Змінити пароль'}
			</BtnSolid>
		</form>
	)
}
