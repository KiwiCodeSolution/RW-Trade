import HeaderPage from '@/components/adminUI/HeaderPage'
import NewsSortAndPaginationComponent from '@/components/commonUI/NewsSortAndPaginationComponent'

import { YoutubeIcon } from '@/assets/icons'

import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Новини | RW-Trade'
}

export default function NewsAdminPage() {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Новини та записи' />
			<div className='w-full'>
				<div className='flex items-center gap-x-4 py-3'>
					<Image src='/icons/info.png' alt='іконка інформації' width={39} height={34} />
					<div className='w-4/5'>
						<p>
							1. На головній сторінці відображається 6 записів (та 3 записи у
							мобільній версії)
						</p>
						<div className='flex items-center gap-x-2'>
							<p>
								2. Ви можете додати посилання на відео. Тоді на превью запису буде
								відображатись значок
							</p>
							<YoutubeIcon />
						</div>
					</div>
				</div>
				<div className='h-0.5 w-full bg-primary' />
			</div>
			<NewsSortAndPaginationComponent locale='uk' />
		</div>
	)
}
