import { NavArrow } from '@/assets/icons'

import { ButtonHTMLAttributes } from 'react'

type Props = {
	iconsStyle?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const SwiperBtn = ({ className, iconsStyle, ...rest }: Props) => {
	return (
		<button
			type='button'
			className={`${className} w-8 h-8 p-[4px] bg-primary flex items-center justify-center rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:header-shadow`}
			{...rest}
		>
			<div className='w-7 h-7 flex items-center justify-between bg-bg-light rounded-md'>
				<NavArrow isGradient className={iconsStyle} />
			</div>
		</button>
	)
}

export default SwiperBtn
