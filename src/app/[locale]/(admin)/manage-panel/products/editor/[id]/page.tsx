import GoBackBtn from '@/components/adminUI/GoBackBtn'

import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редагування продукту | RW-Trade'
}
export default function page() {
	return (
		<div className='w-full h-full relative'>
			<GoBackBtn />
		</div>
	)
}
