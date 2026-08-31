'use client'

import { Pen, Trash } from '@/assets/icons'

import { Subcategory } from '@/types/baseTypes'

import { getCategoriesByID } from '@/api/categories'

import BtnSolid from '../commonUI/BtnSolid'
import BaseModal from '../commonUI/modal/BaseModal'

import CategoriesEditor from './CategoriesEditor'
import RemoveSubCategories from './RemoveSubCategories'
import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { useEffect, useState } from 'react'

const TitleSection = ({ title }: { title: string }) => (
	<div className='w-full h-9 px-4 flex items-center bg-[#D3E6EA]'>
		<h3 className='font-bold'>{title}</h3>
	</div>
)

interface Props {
	categoryId: string
}

export default function SubCategoriesAndFilters({ categoryId }: Props) {
	const [sub, setSub] = useState<Subcategory[]>([])
	const [loading, setLoading] = useState(true)
	const [isShowModal, setIsShowModal] = useState(false)
	const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
	const [editedSubcategory, setEditedSubcategory] = useState<Subcategory | null>(null)

	// ---------------- Fetch підкатегорій ----------------
	const fetchSubcategories = async () => {
		setLoading(true)
		try {
			const category = await getCategoriesByID({ id: categoryId })
			setSub(category.subcategories ?? [])
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося завантажити підкатегорії')
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSubcategories()
	}, [categoryId])

	// ---------------- Після успішної дії ----------------
	const handleSuccess = () => {
		fetchSubcategories()
		setIsShowModal(false)
		setIsShowConfirmModal(false)
	}

	if (loading) return <p className='p-4'>Завантаження...</p>

	return (
		<section className='grid grid-cols-2 mt-2 h-[90%] bg-bg-light rounded-lg overflow-hidden'>
			{/* ---------- Підкатегорії ---------- */}
			<div className='border-r-[2px] border-r-sc-1 h-full flex flex-col gap-y-2'>
				<TitleSection title='Створені підкатегорії:' />

				{sub.length > 0 && (
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
										<Trash className='w-4 h-4' />
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

			{/* ---------- Фільтри ---------- */}
			<div>
				<TitleSection title='Фільтри у підкатегоріях:' />
			</div>

			{/* ---------- Модалі ---------- */}
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
						onSuccess={handleSuccess}
						onCloseModal={() => setIsShowConfirmModal(false)}
						subCategoryID={editedSubcategory?._id}
					/>
				</BaseModal>
			)}
		</section>
	)
}
