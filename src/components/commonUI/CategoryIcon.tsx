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

import { JSX } from 'react'

type Size = 's' | 'm'

type Background = 'primary' | 'bronze' | 'green'

type PropsCategoryIcon = {
	category: Category['slug']
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

	const categories: Record<Size, Record<Category['slug'], JSX.Element>> = {
		s: {
			lighting: <LightIcon />,
			tools: <ToolsIcon />,
			electric: <ElectricIcon />,
			control: <ControlIcon />,
			repair: <RepairIcon />,
			diagnostics: <DiagnosticsIcon />,
			radio: <RadioIcon />,
			discounts: <PersentIcon />
		},
		m: {
			lighting: <LightIconM />,
			tools: <ToolsIconM />,
			electric: <ElectricIconM />,
			control: <ControlIconM />,
			repair: <RepairIconM />,
			diagnostics: <DiagnosticsIconM />,
			radio: <RadioIconM />,
			discounts: <PersentIconM />
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
