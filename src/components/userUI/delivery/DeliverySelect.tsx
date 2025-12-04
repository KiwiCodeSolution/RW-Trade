'use client'

import { ArrowUp } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

type DeliveryOption = {
	id: string
	title: Record<Locale, string>
	img: string
}

type Props = {
	options: DeliveryOption[]
	value: string
	onChange: (value: string) => void
}

export default function DeliverySelect({ options, value, onChange }: Props) {
	const locale = useLocale() as Locale

	const selected = options.find(o => o.id === value) ?? options[0]
	const renderOptions = options.filter(o => o.id !== value)

	const [isOpen, setIsOpen] = useState(false)

	console.log('DeliverySelect render:', { value, selected, isOpen })

	return (
		<div className='w-[224px] h-8 p-[1px] rounded-lg bg-primary relative'>
			{/* Верхня кнопка */}
			<button
				type='button'
				onClick={() => setIsOpen(v => !v)}
				className='w-full h-full px-3 flex items-center justify-between bg-bg-light rounded-lg'
			>
				<div className='flex items-center gap-x-2 text-[17px]'>
					<Image src={selected.img} alt='' width={26} height={26} />
					<span>{selected.title[locale]}</span>
				</div>

				<div
					className={`w-6 h-6 rounded-full flex items-center justify-center bg-white rating-shadow transition-transform duration-300 ${
						isOpen ? 'rotate-180' : 'rotate-0'
					}`}
				>
					<ArrowUp />
				</div>
			</button>

			{/* Випадаючий список (absolute, не рухає макет) */}
			{isOpen && (
				<div className='absolute bg-primary w-full z-10 p-[1px] rounded-lg'>
					<div className='flex flex-col bg-bg-light rounded-lg gap-y-[10px] py-[5px]'>
						{renderOptions.map(opt => (
							<div
								key={opt.id}
								role='button'
								tabIndex={0}
								title={opt.title[locale]}
								aria-label={opt.title[locale]}
								className='h-8 flex items-center gap-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100 text-[17px]'
								onClick={() => {
									onChange(opt.id)
									setIsOpen(false)
								}}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										onChange(opt.id)
										setIsOpen(false)
									}
								}}
							>
								<Image src={opt.img} alt='' width={26} height={26} />
								<span>{opt.title[locale]}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
