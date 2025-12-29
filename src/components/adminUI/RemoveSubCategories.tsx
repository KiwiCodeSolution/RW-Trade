'use client'

import { Subcategory } from '@/types/baseTypes'

import { deleteSubCategory } from '@/api/categories'

import BtnSolid from '../commonUI/BtnSolid'

import { toast } from '@/lib/toast'

import { useSession } from 'next-auth/react'

const RemoveSubCategories = ({
	categoryId,
	subCategoryID,
	onCloseModal,
	onSuccess
}: {
	categoryId: string
	subCategoryID: Subcategory['_id']
	onCloseModal: () => void
	onSuccess: () => void
}) => {
	const { data: session } = useSession()
	const token: string = session?.user?.accessToken ?? ''
	if (!subCategoryID) return

	async function handleRemove() {
		if (subCategoryID) {
			try {
				await deleteSubCategory({
					id: categoryId,
					subId: subCategoryID,
					token
				})

				onSuccess()
				toast.success('Підкатегорію видалено')
			} catch {
				/* empty */
			}
		}
	}

	return (
		<>
			<p className='text-lg font-medium text-center mx-auto mb-10 mt-14'>
				Ви впевнені, що хочете видалити?
			</p>
			<p className='text-base text-center mx-auto mb-14'>
				Дані про підкатегорію будуть видалені{' '}
				<span className='underline'>без можливості відновлення</span>.
			</p>
			<button
				className='block w-fit h-10 rounded-4xl bg-sc-5 text-white text-xl font-bold px-8 cursor-pointer mx-auto mb-5 transition-all duration-300 hover:shadow-lg hover:scale-103'
				onClick={handleRemove}
			>
				Видалити
			</button>

			<BtnSolid variant='primary' size='l' action={onCloseModal} className='mx-auto'>
				Повернутись назад
			</BtnSolid>
		</>
	)
}

export default RemoveSubCategories
