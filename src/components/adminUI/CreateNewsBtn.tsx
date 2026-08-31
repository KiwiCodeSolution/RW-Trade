import { Add } from '@/assets/icons'

import Link from 'next/link'

const CreateNewsBtn = () => {
	return (
		<article className='h-[132px] w-full rounded-2xl border-2 border-sc-1 flex flex-col gap-y-2 justify-center items-center relative product-card-shadow'>
			<Link href={`/manage-panel/news/editor`} className='add-btn-link bg-primary '>
				<Add />
			</Link>
			<p className='font-medium text-center'>Створити запис</p>
		</article>
	)
}
export default CreateNewsBtn
