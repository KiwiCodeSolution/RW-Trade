'use client'

import { BorderSmall, InputField, RequiredStar } from '@/assets/icons'

import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface BaseInputProps<TFormValues extends Record<string, unknown>> {
	register: UseFormRegister<TFormValues>
	errors: FieldErrors<TFormValues>
	name: Path<TFormValues>
	id?: string
	type: 'text' | 'email' | 'password' | 'textarea' | 'number'
	placeholder?: string
	requiredMessage?: string
	isRequired?: boolean
	pattern?: RegExp
	patternMessage?: string
	label?: string
	width?: number
}

export const BaseInput = <TFormValues extends Record<string, unknown>>({
	register,
	errors,
	name,
	id,
	type,
	placeholder,
	requiredMessage,
	isRequired,
	pattern,
	patternMessage,
	label,
	width = 600
}: BaseInputProps<TFormValues>) => {
	const validationRules: RegisterOptions<TFormValues, Path<TFormValues>> = {}

	if (isRequired) validationRules.required = requiredMessage || 'Це поле обов’язкове'
	if (pattern)
		validationRules.pattern = {
			value: pattern,
			message: patternMessage || 'Невірний формат'
		}

	const fieldError = errors[name]?.message as string | undefined

	return (
		<div className='flex flex-col gap-1'>
			<label
				htmlFor={String(name)}
				className='font-semibold relative flex items-center gap-x-1'
			>
				{label}
				{isRequired && <RequiredStar className='' />}
			</label>

			<div className={`relative flex flex-col gap-1 overflow-hidden`} style={{ width }}>
				{width < 400 ? (
					<BorderSmall className={`absolute top-0 left-0 w-[${width}px] h-10 z-0`} />
				) : (
					<InputField className={`absolute top-0 left-0 w-[${width}px] h-full z-0`} />
				)}

				<input
					id={id ?? String(name)}
					type={type}
					autoComplete='off'
					style={{ width }}
					placeholder={placeholder}
					className={` outline-none px-3 py-2 relative z-[1] text-base placeholder:text-sc-2`}
					{...register(name, validationRules)}
				/>

				{fieldError && (
					<p className='text-sc-5 italic text-sm absolute -bottom-6 left-1'>
						{fieldError}
					</p>
				)}
			</div>
		</div>
	)
}
