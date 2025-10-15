'use client'

import { Feedback } from '@/types/baseTypes'

import { sendFeedback } from '@/api/feedback'

import BtnSolid from '../commonUI/BtnSolid'
import Spinner from '../commonUI/loader/Spinner'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type UserFormProps = {
	formTexts: Record<string, string>
}

const UserForm = ({ formTexts }: UserFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Feedback>()

	const onSubmit: SubmitHandler<Feedback> = async (data: Feedback) => {
		if (data.surname) return // антиспам
		setIsLoading(true)

		try {
			await sendFeedback({
				username: data.username,
				email: data.email,
				message: data.message
			})
			reset()
		} catch (err: any) {
			console.log(err)
			// помилка вже оброблена в sendFeedback через toast
			setIsLoading(false)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<h3 className='text-2xl text-center font-bold'>{formTexts.title}</h3>

			<form onSubmit={handleSubmit(onSubmit)} className='py-7 flex flex-col text-white'>
				{/* name */}
				<label htmlFor='username'>{formTexts.item_1}</label>
				<input
					id='username'
					className='h-9 bg-white rounded-md mb-2 outline-0 text-txt-dark px-2'
					placeholder={formTexts.placeholder_1}
					{...register('username', { required: true })}
				/>
				{errors.username && (
					<span className='text-sm text-yellow-300 mb-3'>{formTexts.placeholder_1}</span>
				)}

				{/* honeypot */}
				<label htmlFor='surname' className='hidden'>
					{formTexts.item_0}
				</label>
				<input
					id='surname'
					type='text'
					className='hidden'
					tabIndex={-1}
					autoComplete='off'
					{...register('surname')}
				/>

				{/* email */}
				<label htmlFor='email'>{formTexts.item_2}</label>
				<input
					id='email'
					type='email'
					className='h-9 bg-white rounded-md mb-2 outline-0 text-txt-dark px-2'
					placeholder={formTexts.placeholder_2}
					{...register('email', {
						required: true,
						pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					})}
				/>
				{errors.email && (
					<span className='text-sm text-yellow-300 mb-3'>{formTexts.placeholder_2}</span>
				)}

				{/* message */}
				<label htmlFor='message'>{formTexts.item_3}</label>
				<textarea
					id='message'
					className='min-h-[100px] bg-white rounded-md mb-3 outline-0 text-txt-dark px-2 py-1 resize-none'
					placeholder={formTexts.placeholder_3}
					{...register('message', { required: true })}
				/>
				{errors.message && (
					<span className='text-sm text-yellow-300 mb-3'>{formTexts.placeholder_3}</span>
				)}

				<div className='flex justify-center'>
					<BtnSolid variant='bronze' btnType='submit' as='button' disabled={isLoading}>
						{isLoading ? <Spinner /> : formTexts.btnText}
					</BtnSolid>
				</div>
			</form>
		</div>
	)
}

export default UserForm
