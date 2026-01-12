'use client'

import { Border, Hide, Show } from '@/assets/icons'

import { PageContext } from '@/types/baseTypes'

import BtnSolid from '../commonUI/BtnSolid'
import Loader from '../commonUI/loader/Loader'

import { toast } from '@/lib/toast'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type SignInFormValues = {
	login: string
	password: string
}

const SignInForm = ({ pageType }: { pageType: PageContext }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm<SignInFormValues>({ mode: 'onTouched' })

	const [showPassword, setShowPassword] = useState(false)
	const togglePassword = () => setShowPassword(p => !p)

	const role = pageType === 'admin' ? 'admin' : 'user'

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/uk/manage-panel/'

	const onSubmit = async (data: SignInFormValues) => {
		const formData = { ...data, roleContext: role }
		console.log('formData', formData)

		try {
			// Використовуємо redirect: true — NextAuth сам зробить редірект
			await signIn('credentials', {
				...formData,
				redirect: true,
				callbackUrl
			})

			reset()
		} catch (err) {
			console.error('Помилка авторизації:', err)
			toast.error('Сталася помилка. Спробуйте пізніше.')
		}
	}

	if (isSubmitting) return <Loader />

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='min-w-[375px] max-w-2/3 mt-10 flex flex-col gap-y-10 relative'
		>
			{/* LOGIN */}
			<div className='flex flex-col gap-1'>
				<label htmlFor='login' className='font-semibold'>
					Login
				</label>
				<div className='relative flex flex-col gap-1 overflow-hidden'>
					<Border className='absolute top-0 left-0 w-[375px] h-full z-0' />
					<input
						type='text'
						id='login'
						autoComplete='off'
						placeholder='Введіть логін'
						className='w-[375px] outline-none px-3 py-2 relative z-[1] text-base placeholder:text-sc-2'
						{...register('login', { required: 'Login є обовʼязковим' })}
					/>
					{errors.login && (
						<p className='text-sc-5 italic text-sm absolute -bottom-6 left-1'>
							{errors.login.message}
						</p>
					)}
				</div>
			</div>

			{/* PASSWORD */}
			<div className='flex flex-col gap-1'>
				<label htmlFor='password' className='font-semibold'>
					Пароль
				</label>
				<div className='relative flex flex-col gap-1 overflow-hidden'>
					<Border className='absolute top-0 left-0 w-[375px] h-full z-0' />
					<input
						id='password'
						type={showPassword ? 'text' : 'password'}
						autoComplete='off'
						placeholder='Введіть пароль'
						className='w-[375px] outline-none px-3 py-2 relative z-[1] text-base placeholder:text-sc-2'
						{...register('password', {
							required: 'Пароль є обовʼязковим',
							minLength: { value: 6, message: 'Мінімум 6 символів' }
						})}
					/>
					<button
						type='button'
						onClick={togglePassword}
						className='absolute right-3 top-1/2 -translate-y-1/2 z-[2] text-gray-500'
					>
						{showPassword ? <Show /> : <Hide />}
					</button>
					{errors.password && (
						<p className='text-sc-5 italic text-sm absolute -bottom-6 left-1'>
							{errors.password.message}
						</p>
					)}
				</div>
			</div>

			{/* SUBMIT */}
			<BtnSolid as='button' btnType='submit' variant='primary'>
				{isSubmitting ? 'Зачекайте...' : 'Увійти'}
			</BtnSolid>
		</form>
	)
}

export default SignInForm
