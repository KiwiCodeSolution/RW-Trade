'use client'

import BtnSolid from '../commonUI/BtnSolid'
import Spinner from '../commonUI/loader/Spinner'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputs = {
	name: string
	surname: string // honeypot
	email: string
	message: string
}

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
	} = useForm<FormInputs>()

	const onSubmit: SubmitHandler<FormInputs> = data => {
		setIsLoading(true)
		// антиспам — якщо поле surname заповнене, нічого не відправляємо
		if (data.surname) return
		console.log({
			name: data.name,
			email: data.email,
			message: data.message
		})
		setTimeout(() => {
			setIsLoading(false)
			reset()
		}, 2000)
		reset()
	}

	return (
		<div>
			<h3 className='text-2xl text-center font-bold'>{formTexts.title}</h3>

			<form onSubmit={handleSubmit(onSubmit)} className='py-7 flex flex-col text-white'>
				{/* name */}
				<label htmlFor='name'>{formTexts.item_1}</label>
				<input
					id='name'
					className='h-9 bg-white rounded-md mb-2 outline-0 text-txt-dark px-2'
					placeholder={formTexts.placeholder_1}
					{...register('name', { required: true })}
				/>
				{errors.name && (
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
