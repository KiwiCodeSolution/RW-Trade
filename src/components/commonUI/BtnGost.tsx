'use client'

import { Link } from '@/i18n/navigation'
import '@/styles/globals.css'

import React from 'react'

type BtnVariant = 'gost' | 'outlined' | 'block'
type BtnType = 'button' | 'submit' | 'reset'

interface BaseBtnProps {
	variant?: BtnVariant
	children: React.ReactNode
	className?: string
}

interface ButtonProps extends BaseBtnProps {
	as?: 'button'
	action?: () => void
	btnType?: BtnType
	href?: never
}

interface LinkProps extends BaseBtnProps {
	as: 'link'
	href: string
	action?: never
	btnType?: never
}

type BtnGostProps = ButtonProps | LinkProps

const BtnGost: React.FC<BtnGostProps> = props => {
	const { variant = 'gost', children, className = '' } = props

	const baseStyle =
		'block border-box cursor-pointer flex justify-center items-center transition-all duration-300 hover:shadow-lg hover:scale-101 overflow-hidden font-bold min-h-[48px]'

	const variants: Record<BtnVariant, string> = {
		gost: 'bg-bg-light text-gr-2 min-w-[160px] rounded-full',
		outlined: 'bg-primary min-w-[204px] rounded-full p-[2px]',
		block: 'bg-primary w-full min-w-[162px] rounded-lg p-[2px]'
	}

	const divStyle: Record<BtnVariant, string> = {
		gost: 'rounded-full',
		outlined: 'rounded-full',
		block: 'rounded-md'
	}

	const combined = `${baseStyle} ${variants[variant]} ${className}`.trim()

	// Лінк
	if (props.as === 'link') {
		return (
			<Link className={combined} href={props.href}>
				<div
					className={`bg-bg-light w-full h-[44px] flex justify-center items-center ${divStyle[variant]}`}
				>
					<div className='bg-primary bg-clip-text text-transparent flex gap-2 justify-center items-center'>
						{children}
					</div>
				</div>
			</Link>
		)
	}

	// Кнопка
	return (
		<button className={combined} onClick={props.action} type={props.btnType || 'button'}>
			<div
				className={`bg-bg-light w-full h-[44px] flex justify-center items-center ${divStyle[variant]}`}
			>
				<div className='bg-primary bg-clip-text text-transparent flex gap-2 justify-center items-center'>
					{children}
				</div>
			</div>
		</button>
	)
}

export default BtnGost
