import { Add } from '@/assets/icons'

import Link from 'next/link'

const CreateProductBtn = ({ categoryId }: { categoryId: string }) => {
	return (
		<article className='h-[317px] w-full min-w-[162px] max-w-[162px] rounded-md border-2 border-sc-1 flex flex-col gap-y-2 justify-center items-center relative product-card-shadow'>
			<Link
				href={`/manage-panel/products/editor?category=${categoryId}`} // /manage-panel/products/editor
				className='add-btn-link bg-primary '
			>
				<Add />
			</Link>
			<p className='font-medium text-center'>Створити товар</p>
		</article>
	)
}

export default CreateProductBtn
