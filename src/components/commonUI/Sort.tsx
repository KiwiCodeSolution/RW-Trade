'use client'

import { SortIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { useState } from 'react'

type SortOption<T extends string> = {
	value: T
	label: Record<Locale, string>
}

function Sort<T extends string>({
	locale,
	options,
	onChange
}: {
	locale: Locale
	options: readonly SortOption<T>[]
	onChange: (value: T) => void
}) {
	const [open, setOpen] = useState(false)

	function handleSelect(value: T) {
		setOpen(false)
		onChange(value)
	}

	return (
		<div className='w-full xl:w-fit relative'>
			<button
				className='w-1/2 h-12 xl:h-fit xl:w-fit flex items-center justify-center bg-primary rounded-lg p-0.5 xl:bg-transparent xl:p-0'
				onClick={() => setOpen(v => !v)}
			>
				<div className='w-full h-full rounded-lg mx-auto flex items-center justify-center gap-1 bg-bg-light'>
					<p className='font-medium text-link-blue underline decoration-1 order-2 xl:order-1'>
						{locale === 'uk' ? 'Сортування' : 'Sort by'}
					</p>
					<SortIcon className='order-1 xl:order-2' />
				</div>
			</button>

			{open && (
				<div className='w-1/2 h-fit px-2 py-4 rounded-md border-2 border-sc-1 flex flex-col gap-y-3 bg-other-1 z-10 absolute top-12 xl:top-8 xl:right-0 xl:w-[200px]'>
					{options.map(item => (
						<button
							key={item.value}
							className='gradient-text font-medium text-left w-full'
							onClick={() => handleSelect(item.value)}
						>
							{item.label[locale]}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default Sort
