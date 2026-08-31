'use client'

import { ArrowGoBack } from '@/assets/icons'

import { useRouter } from 'next/navigation'

const GoBackBtn = () => {
	const router = useRouter()

	return (
		<button
			type='button'
			onClick={() => router.back()}
			className='absolute top-0 left-1 w-[140px] h-10 flex items-center gap-x-[6px] go-back-btn'
		>
			<ArrowGoBack className='animate-wiggle-x' />
			<p className='gradient-text select-none'>Назад</p>
		</button>
	)
}

export default GoBackBtn
