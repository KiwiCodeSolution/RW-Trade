'use client'

import { Pen, Trash } from '@/assets/icons'

import { Subcategory } from '@/types/baseTypes'

import BtnSolid from '../commonUI/BtnSolid'
import BaseModal from '../commonUI/modal/BaseModal'

import CategoriesEditor from './CategoriesEditor'
import RemoveSubCategories from './RemoveSubCategories'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TitleSection = ({ title }: { title: string }) => {
	return (
		<div className='w-full h-9 px-4 flex items-center bg-[#D3E6EA]'>
			<h3 className='font-bold'>{title}</h3>
		</div>
	)
}
const SubCategoriesAndFilters = ({
	sub,
	categoryId
}: {
	sub?: Subcategory[]
	categoryId: string
}) => {
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
	const [editedSubcategory, setEditedSubcategory] = useState<Subcategory | null>(null)
	const router = useRouter()

	function handleSuccess() {
		router.refresh() // ⬅️ перефетч
		setIsShowModal(false)
		setIsShowConfirmModal(false)
	}

	return (
		<section className='grid grid-cols-2 mt-2 h-[90%] bg-bg-light rounded-lg overflow-hidden '>
			<div className='border-r-[2px] border-r-sc-1 h-full flex flex-col gap-y-2'>
				<TitleSection title='Створені підкатегорії:' />

				{sub && sub.length > 0 && (
					<div className='flex flex-col gap-y-3 px-2'>
						{sub.map(item => (
							<div
								key={item._id}
								className='flex items-center justify-between px-2 border-b-2 border-b-gr-10 pb-0.5 w-full whitespace-nowrap'
							>
								<p className='text-base truncate max-w-[calc(100%-80px)]'>
									{item.title['uk']}
								</p>
								<div className='flex items-center gap-x-3 flex-shrink-0'>
									<button
										className='w-7 h-7 rounded-full flex items-center justify-center bg-primary'
										onClick={() => {
											setEditedSubcategory(item)
											setIsShowModal(true)
										}}
									>
										<Pen />
									</button>
									<button
										className='w-7 h-7 rounded-full flex items-center justify-center bg-sc-5'
										onClick={() => {
											setEditedSubcategory(item)
											setIsShowConfirmModal(true)
										}}
									>
										<Trash />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
				<BtnSolid
					size='s'
					variant='bronze'
					as='button'
					action={() => setIsShowModal(true)}
					className='ml-4 mt-8'
				>
					Створити підкатегорію
				</BtnSolid>
			</div>
			<div>
				<TitleSection title='Фільтри у підкатегоріях:' />
			</div>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Заповніть зміст на двох мовах'
				>
					<CategoriesEditor
						categoryId={categoryId}
						onSuccess={handleSuccess}
						initialData={editedSubcategory}
					/>
				</BaseModal>
			)}
			{isShowConfirmModal && (
				<BaseModal isOpen={isShowConfirmModal} onClose={() => setIsShowConfirmModal(false)}>
					<RemoveSubCategories
						categoryId={categoryId}
						onCloseModal={() => setIsShowConfirmModal(false)}
						subCategoryID={editedSubcategory?._id}
						onSuccess={handleSuccess}
					/>
				</BaseModal>
			)}
		</section>
	)
}

export default SubCategoriesAndFilters
