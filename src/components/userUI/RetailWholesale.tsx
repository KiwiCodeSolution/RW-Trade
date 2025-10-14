'use client'

import BagIcon from '../../../public/icons/bag-16.svg'
import BoxIcon from '../../../public/icons/box-16.svg'

import { useState } from 'react'

// import DownIcon from '../../../public/icons/down-16.svg'

const RetailWholesale = () => {
	const [current, setCurrent] = useState('Роздріб')
	const [option, setOption] = useState('Опт')

	const handleClick = () => {
		setCurrent(option)
		setOption(current)
	}

	return (
		<div
			className='flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200'
			onClick={handleClick}
		>
			{current === 'Опт' ? <BoxIcon /> : <BagIcon />}
			<div>{current}</div>
		</div>
	)
}

export default RetailWholesale
