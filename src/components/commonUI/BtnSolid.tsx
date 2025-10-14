'use client'

import '@/styles/globals.css'

import React from 'react'

type BtnVariant = 'primary' | 'bronze' | 'green'
type BtnSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
type BtnType = 'button' | 'submit' | 'reset'

interface BtnSolidProps {
	variant?: BtnVariant
	size?: BtnSize
	children: React.ReactNode
	className?: string
	action?: (() => void) | null
	btnType?: BtnType
}

const BtnSolid: React.FC<BtnSolidProps> = ({
	variant = 'primary',
	size = 's',
	children,
	className = '',
	action = null,
	btnType = 'button'
}) => {
	const baseStyle =
		'border-box cursor-pointer flex justify-center items-center p-[2px] rounded-full transition-all duration-300 hover:shadow-lg hover:scale-103 overflow-hidden font-bold'

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

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (action) action()
		console.log('Click!')
	}

	return (
		<button className={combined} onClick={handleClick} type={btnType}>
			{children}
		</button>
	)
}

export default BtnSolid
