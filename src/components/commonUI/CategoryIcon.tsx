'use client'

import ControlIconM from '@/assets/icons/control-m.svg'
import ControlIcon from '@/assets/icons/control.svg'
import DiagnosticsIcomM from '@/assets/icons/diagnostics-m.svg'
import DiagnosticsIcom from '@/assets/icons/diagnostics.svg'
import ElectricIconM from '@/assets/icons/electric-m.svg'
import ElectricIcon from '@/assets/icons/electric.svg'
import LightIconM from '@/assets/icons/light-m.svg'
import LightIcon from '@/assets/icons/light.svg'
import PersentIconM from '@/assets/icons/persent-m.svg'
import PersentIcon from '@/assets/icons/persent.svg'
import RadioIconM from '@/assets/icons/radio-m.svg'
import RadioIcon from '@/assets/icons/radio.svg'
import RepairIcomM from '@/assets/icons/repair-m.svg'
import RepairIcom from '@/assets/icons/repair.svg'
import ToolsIconM from '@/assets/icons/tools-m.svg'
import ToolsIcon from '@/assets/icons/tools.svg'

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
			Repair: <RepairIcom />,
			Diagnostics: <DiagnosticsIcom />,
			Radio: <RadioIcon />,
			Discounts: <PersentIcon />
		},
		m: {
			Lighting: <LightIconM />,
			Tools: <ToolsIconM />,
			Electric: <ElectricIconM />,
			Control: <ControlIconM />,
			Repair: <RepairIcomM />,
			Diagnostics: <DiagnosticsIcomM />,
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
