'use client'

import {
	ControlIcon,
	ControlIconM,
	DiagnosticsIcon,
	DiagnosticsIconM,
	ElectricIcon,
	ElectricIconM,
	LightIcon,
	LightIconM,
	PersentIcon,
	PersentIconM,
	RadioIcon,
	RadioIconM,
	RepairIcon,
	RepairIconM,
	ToolsIcon,
	ToolsIconM
} from '@/assets/icons'

import { Category } from '@/types/baseTypes'

import '@/styles/globals.css'

import { JSX } from 'react'

type Size = 's' | 'm'

type Background = 'primary' | 'bronze' | 'green'

type PropsCategoryIcon = {
	category: Category['title']['en']
	size?: Size
	bg?: Background
	isActive?: boolean
}

const CategoryIcon = ({
	category = 'Lighting',
	size = 's',
	bg = 'primary',
	isActive = false
}: PropsCategoryIcon) => {
	const baseStyle = 'flex justify-center items-center rounded-2xl'

	const categories: Record<Size, Record<Category['title']['en'], JSX.Element>> = {
		s: {
			Lighting: <LightIcon />,
			Tools: <ToolsIcon />,
			Electric: <ElectricIcon />,
			Control: <ControlIcon />,
			Repair: <RepairIcon />,
			Diagnostics: <DiagnosticsIcon />,
			Radio: <RadioIcon />,
			Discounts: <PersentIcon />
		},
		m: {
			Lighting: <LightIconM />,
			Tools: <ToolsIconM />,
			Electric: <ElectricIconM />,
			Control: <ControlIconM />,
			Repair: <RepairIconM />,
			Diagnostics: <DiagnosticsIconM />,
			Radio: <RadioIconM />,
			Discounts: <PersentIconM />
		}
	}

	const sizes = {
		s: 'w-[60px] h-[60px] p-[14px]',
		m: 'w-[100px] h-[100px] p-[18px]'
	}

	const background = {
		primary: 'bg-primary',
		bronze: 'bg-bronze',
		green: 'bg-green'
	}

	const active = isActive
		? 'border border-0.5 border-white'
		: 'border border-0 border-transparent'
	const combined = `${baseStyle} ${sizes[size]} ${background[bg]} ${active}`.trim()

	return (
		<div className={combined}>
			<div className='rounded-2xl'></div>
			{categories[size][category]}
		</div>
	)
}

export default CategoryIcon
