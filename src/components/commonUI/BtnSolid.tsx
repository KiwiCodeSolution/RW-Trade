'use client'

import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import React from 'react'

type BtnVariant = 'primary' | 'bronze' | 'green'
type BtnSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
type BtnType = 'button' | 'submit' | 'reset'

interface BaseBtnProps {
	variant?: BtnVariant
	size?: BtnSize
	children: React.ReactNode
	className?: string
}

interface ButtonProps extends BaseBtnProps {
	as?: 'button'
	action?: () => void
	btnType?: BtnType
	href?: never
	disabled?: boolean
}

interface LinkProps extends BaseBtnProps {
	as: 'link'
	href: string
	action?: never
	btnType?: never
}

type BtnSolidProps = ButtonProps | LinkProps

const BtnSolid: React.FC<BtnSolidProps> = props => {
	const { variant = 'primary', size = 's', children, className = '' } = props

	const baseStyle =
		'border-box cursor-pointer flex justify-center items-center p-[2px] rounded-full transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold disabled:opacity-50 disabled:cursor-not-allowed'

	const variants: Record<BtnVariant, string> = {
		primary: 'bg-primary text-white',
		bronze: 'bg-bronze text-white',
		green: 'bg-bg-green text-white'
	}

	const sizes: Record<BtnSize, string> = {
		s: 'w-[204px] min-h-[48px]',
		m: 'w-[242px] min-h-[56px] text-xl',
		l: 'w-[280px] min-h-[48px] text-xl',
		xl: 'w-[340px] min-h-[48px] sm:w-[280px] text-xl',
		xxl: 'w-[340px] min-h-[52px] sm:w-[280px] sm:min-h-[48px]',
		xxxl: 'w-full max-w-[436px] min-h-[56px] text-xl sm:text-2xl'
	}

	const combined = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`.trim()

	// Якщо лінк
	if (props.as === 'link') {
		return (
			<Link className={combined} href={props.href}>
				{children}
			</Link>
		)
	}

	// Якщо кнопка
	return (
		<button
			className={combined}
			onClick={props.action}
			type={props.btnType || 'button'}
			disabled={props.disabled}
		>
			{children}
		</button>
	)
}

export default BtnSolid
