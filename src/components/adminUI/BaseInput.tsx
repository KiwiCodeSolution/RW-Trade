'use client'

import { RequiredStar } from '@/assets/icons'

import {
	FieldError,
	FieldErrors,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister
} from 'react-hook-form'

interface BaseInputProps<TFormValues extends FieldValues> {
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
	disabled?: boolean
}

/**
 * Отримує помилку навіть для вкладених шляхів типу "title.uk"
 */
function getNestedError<T extends FieldValues>(
	errors: FieldErrors<T>,
	path: string
): FieldError | undefined {
	return path.split('.').reduce<unknown>((acc, key) => {
		if (acc && typeof acc === 'object' && key in acc) {
			return (acc as Record<string, unknown>)[key]
		}
		return undefined
	}, errors) as FieldError | undefined
}

export const BaseInput = <TFormValues extends FieldValues>({
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
	disabled
}: BaseInputProps<TFormValues>) => {
	const validationRules: RegisterOptions<TFormValues, Path<TFormValues>> = {}

	if (isRequired) validationRules.required = requiredMessage || 'Це поле обов’язкове'
	if (pattern)
		validationRules.pattern = {
			value: pattern,
			message: patternMessage || 'Невірний формат'
		}

	const fieldError = getNestedError(errors, name)

	return (
		<div className='flex flex-col gap-1'>
			{label && (
				<label
					htmlFor={String(name)}
					className='font-semibold relative flex items-center gap-x-1'
				>
					{label}
					{isRequired && <RequiredStar />}
				</label>
			)}

			<div className='relative flex flex-col gap-1'>
				<input
					id={id ?? String(name)}
					type={type}
					autoComplete='off'
					placeholder={placeholder}
					disabled={disabled}
					className={`border border-gr-2 focus:border-link-blue focus:outline-none px-3 py-2 text-base rounded-lg placeholder:text-sc-2 transition-colors duration-200`}
					{...register(name, validationRules)}
				/>
				{fieldError?.message && (
					<p className='text-sc-5 italic text-sm absolute -bottom-6 left-1'>
						{fieldError.message}
					</p>
				)}
			</div>
		</div>
	)
}
