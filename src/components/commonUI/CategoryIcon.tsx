'use client'

import { Category } from '@/types/baseTypes'

import ControlIconM from '../../../public/icons/control-m.svg'
import ControlIcon from '../../../public/icons/control.svg'
import DiagnosticsIcomM from '../../../public/icons/diagnostics-m.svg'
import DiagnosticsIcom from '../../../public/icons/diagnostics.svg'
import ElectricIconM from '../../../public/icons/electric-m.svg'
import ElectricIcon from '../../../public/icons/electric.svg'
import LightIconM from '../../../public/icons/light-m.svg'
import LightIcon from '../../../public/icons/light.svg'
import PersentIconM from '../../../public/icons/persent-m.svg'
import PersentIcon from '../../../public/icons/persent.svg'
import RadioIconM from '../../../public/icons/radio-m.svg'
import RadioIcon from '../../../public/icons/radio.svg'
import RepairIcomM from '../../../public/icons/repair-m.svg'
import RepairIcom from '../../../public/icons/repair.svg'
import ToolsIconM from '../../../public/icons/tools-m.svg'
import ToolsIcon from '../../../public/icons/tools.svg'

import '@/styles/globals.css'

import { JSX } from 'react'

type Size = 's' | 'm'

type Background = 'primary' | 'bronze' | 'green'

type PropsCategoryIcon = {
	category: Category['title']['en']
	size?: Size
	bg?: Background
}

const CategoryIcon = ({ category = 'Lighting', size = 's', bg = 'primary' }: PropsCategoryIcon) => {
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

	const combined = `${baseStyle} ${sizes[size]} ${background[bg]}`.trim()

	return (
		<div className={combined}>
			<div className='rounded-2xl'></div>
			{categories[size][category]}
		</div>
	)
}

export default CategoryIcon
