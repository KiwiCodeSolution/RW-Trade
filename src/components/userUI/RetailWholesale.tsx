'use client'

import { BagIcon, BoxIcon } from '@/assets/icons'

import { Locale } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const RetailWholesale = observer(({ fnc, locale }: { fnc?: () => void; locale: Locale }) => {
	const { isWholesale, toggleWholesale } = productStore
	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps, react/no-unstable-nested-components
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const texts = {
		uk: {
			wholesale: 'Опт',
			retail: 'Роздріб'
		},
		en: {
			wholesale: 'Wholesale',
			retail: 'Retail'
		}
	}

	const title = {
		wholesale: { uk: 'Опт', en: 'Wholesale' },
		retail: { uk: 'Роздріб', en: 'Retail' }
	}

	const current = isWholesale ? title.wholesale[locale] : title.retail[locale]

	function toggleWholesaleState() {
		toggleWholesale()
		if (fnc) fnc()
	}

	return (
		<button
			type='button'
			onClick={() => toggleWholesaleState()}
			className='flex gap-2 items-center hover:text-gr-5 duration-200 focus:outline-none'
		>
			{isWholesale ? <BoxIcon /> : <BagIcon />}
			<span>{current}</span>
		</button>
	)
})

export default RetailWholesale
