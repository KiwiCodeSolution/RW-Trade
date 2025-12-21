'use client'

import { Banner } from '@/types/baseTypes'

import { bannersStore } from '@/store/BannersStore'

import BaseModal from '../commonUI/modal/BaseModal'
import ConfirmAdminComponent from '../commonUI/modal/ConfirmAdminComponent'
import BaseImageItem from '../userUI/baseComponents/BaseImageItem'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useState } from 'react'

const BannerItem = observer(({ banner, fnc }: { banner: Banner; fnc: () => void }) => {
	const { toggleVisibility, remove } = bannersStore

	const [isShowModal, setIsShowModal] = useState(false)

	if (typeof window === 'undefined') return null
	function toggleVisible() {
		toggleVisibility(banner._id)
	}

	function removeBanner() {
		remove(banner._id, () => setIsShowModal(false))
	}

	return (
		<>
			<div className='relative w-[342px] h-[176px] rounded-lg overflow-hidden border-2 border-sc-1 shadow-lg group'>
				{/* Картинка */}
				<BaseImageItem
					src={banner.image}
					alt=''
					className={`w-full h-full object-cover rounded-lg transition duration-300 ${
						banner.isPublished ? 'group-hover:brightness-50' : ''
					}`}
				/>

				{/* Постійний overlay для неопублікованих банерів */}
				{!banner.isPublished && (
					<div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
						<Image src='/images/hide.png' alt='' width={72} height={72} />
					</div>
				)}

				{/* Hover overlay з кнопками */}
				<div className='absolute bottom-0 left-0 w-full grid grid-cols-3 items-center h-8 bg-black/60 transform translate-y-full transition-all duration-300 group-hover:translate-y-0'>
					<button
						className='text-white font-medium px-2 py-1 bg-bronze rounded-lb-lg'
						onClick={fnc}
					>
						Редагувати
					</button>
					<button
						className={`text-white font-medium px-2 py-1 ${banner.isPublished ? 'bg-primary' : 'bg-bg-green'}`}
						onClick={toggleVisible}
					>
						{banner.isPublished ? 'Сховати' : 'Показати'}
					</button>
					<button
						className='text-white font-medium px-2 py-1 bg-sc-5 rounded-rb-lg'
						onClick={() => setIsShowModal(true)}
					>
						Видалити
					</button>
				</div>
			</div>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Підтвердження видалення'
				>
					<ConfirmAdminComponent
						fncDelete={() => removeBanner()}
						fncEscape={() => setIsShowModal(false)}
						text='банер'
					/>
				</BaseModal>
			)}
		</>
	)
})

export default BannerItem
