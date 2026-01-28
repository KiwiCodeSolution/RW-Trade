'use client'

import { Banner, BannerType } from '@/types/baseTypes'

import { bannersStore } from '@/store/BannersStore'

import BaseModal from '../commonUI/modal/BaseModal'

import AddBtnLink from './AddBtnLink'
import BannerItem from './BannerItem'
import CreateSlideComponent from './CreateSlideComponent'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const SliderBanners = observer(() => {
	const { banners } = bannersStore
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowEditModal, setIsShowEditModal] = useState(false)
	const [typeBanner, setTypeBanner] = useState<BannerType>('left')
	const [currentBanner, setCurrentBanner] = useState<Banner | null>(null)

	useEffect(() => {
		if (banners.length === 0) bannersStore.fetchBanners({ pageType: 'client' })
	}, [banners.length])

	const handleOpenModal = (type: BannerType) => {
		setIsShowModal(true)
		setTypeBanner(type)
	}

	function findCurrentBanner(id: string) {
		const banner = banners.find(b => b._id === id)

		if (!banner) return // або показати тост, або що завгодно

		setCurrentBanner(banner)
		setIsShowEditModal(true)
	}
	// Групуємо
	const left = banners.filter(b => b.type === 'left').slice(0, 5)
	const right = banners.filter(b => b.type === 'right').slice(0, 5)

	// Доповнюємо до 5
	const filledLeft = [...left, ...Array(5 - left.length).fill(null)]
	const filledRight = [...right, ...Array(5 - right.length).fill(null)]

	return (
		<div className='w-full flex bg-primary-bottom'>
			{/* LEFT */}
			<div className='w-1/2 pr-[1px]'>
				<div className='grid grid-rows-5 bg-white px-4'>
					{filledLeft.map((banner, i) => (
						<div key={i} className='w-full h-[240px] bg-primary pb-[2px]'>
							<div className='w-full h-full bg-white flex items-center justify-center'>
								{banner ? (
									<BannerItem
										banner={banner}
										fnc={() => findCurrentBanner(banner._id)}
									/>
								) : (
									// Порожній слот → кнопка добавити
									<AddBtnLink
										page='slider'
										title='Додати банер'
										type='button'
										fnc={() => handleOpenModal('left')}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* RIGHT */}
			<div className='w-1/2 pl-[1px]'>
				<div className='grid grid-rows-5 bg-white px-4'>
					{filledRight.map((banner, i) => (
						<div key={i} className='w-full min-h-[240px] bg-primary pb-[2px]'>
							<div className='w-full h-full bg-white flex items-center justify-center'>
								{banner ? (
									<BannerItem
										banner={banner}
										fnc={() => findCurrentBanner(banner._id)}
									/>
								) : (
									<AddBtnLink
										page='slider'
										title='Додати банер'
										type='button'
										fnc={() => handleOpenModal('right')}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* MODAL */}
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Управління банерами'
				>
					<CreateSlideComponent
						type={typeBanner}
						resultFnc={() => setIsShowModal(false)}
					/>
				</BaseModal>
			)}
			{isShowEditModal && currentBanner && (
				<BaseModal
					isOpen={isShowEditModal}
					onClose={() => setIsShowEditModal(false)}
					title='Управління банерами'
				>
					<CreateSlideComponent
						resultFnc={() => setIsShowEditModal(false)}
						banner={currentBanner}
					/>
				</BaseModal>
			)}
		</div>
	)
})

export default SliderBanners
