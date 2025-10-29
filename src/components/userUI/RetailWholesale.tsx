'use client'

import { BagIcon, BoxIcon } from '@/assets/icons'

import { productStore } from '@/store/ProductsStore'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const RetailWholesale = observer(() => {
	const { isWholesale, toggleWholesale } = productStore
	const [mounted, setMounted] = useState(false)

	// eslint-disable-next-line react-hooks/exhaustive-deps, react/no-unstable-nested-components
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const current = isWholesale ? 'Опт' : 'Роздріб'

	return (
		<button
			type='button'
			onClick={toggleWholesale}
			className='flex gap-2 items-center hover:text-gr-5 duration-200 focus:outline-none'
		>
			{isWholesale ? <BoxIcon /> : <BagIcon />}
			<span>{current}</span>
		</button>
	)
})

export default RetailWholesale
