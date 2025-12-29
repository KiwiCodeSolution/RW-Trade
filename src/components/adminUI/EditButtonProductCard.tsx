import { Settings } from '@/assets/icons'

import Link from 'next/link'

const EditButtonProductCard = ({ id }: { id: string }) => {
	return (
		<Link
			href={`/manage-panel/products/editor/${id}`}
			className='w-8 h-8 flex items-center justify-center '
		>
			<Settings />
		</Link>
	)
}

export default EditButtonProductCard
