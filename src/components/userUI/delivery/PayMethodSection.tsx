'use client'

import { ArrowUp } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { useLocale } from 'next-intl'
import { useState } from 'react'

type PaymentMethod = {
	id: string
	title: Record<Locale, string>
}

type Props = {
	value: PaymentMethod['id']
	onChange: (value: PaymentMethod['id']) => void
}

const paymentMethodList: PaymentMethod[] = [
	{
		id: 'card_privatbank',
		title: { uk: 'Оплата на картку Приватбанку', en: 'Payment to a PrivatBank card' }
	},
	{
		id: 'cash',
		title: { uk: 'Готівкою', en: 'In cash' }
	},
	{
		id: 'fop_2_3',
		title: {
			uk: 'Безготівковий розрахунок (ПП ЄП 2-3 групи)',
			en: 'Non-cash payment (PP EP 2-3 groups)'
		}
	},
	{
		id: 'wayforpay',
		title: { uk: 'Оплата картою Visa, Mastercard', en: 'Payment by Visa, Mastercard' }
	}
]

export default function PayMethodSection({ value, onChange }: Props) {
	const locale = useLocale() as Locale

	const selected = paymentMethodList.find(o => o.id === value) ?? paymentMethodList[0]
	const renderOptions = paymentMethodList.filter(o => o.id !== value)

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='w-full h-8 p-[1px] rounded-lg bg-primary relative'>
			<button
				type='button'
				onClick={() => setIsOpen(v => !v)}
				className='w-full h-full px-3 flex items-center justify-between bg-bg-light rounded-lg'
			>
				<div className='flex items-center gap-x-2 text-[17px]'>
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

			{isOpen && (
				<div className='absolute bg-primary w-[calc(100%-2px)] z-10 p-[1px] rounded-lg mt-1'>
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
								<span>{opt.title[locale]}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
