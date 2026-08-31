'use client'

import { Product, ProductStatus } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import BaseModal from '../commonUI/modal/BaseModal'
import ConfirmAdminComponent from '../commonUI/modal/ConfirmAdminComponent'

import { Link } from '@/i18n/navigation'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const EditProductCard = observer(({ product }: { product: Product }) => {
	const { toggleVisibility, changeStatus, removeProduct } = productStore
	const [isShowModal, setIsShowModal] = useState(false)

	const isPublished = product.isPublished ?? true

	function handleRemoveProduct() {
		removeProduct(product._id)
		setIsShowModal(false)
	}

	return (
		<>
			<div className='absolute inset-0 bg-black/60 z-30 flex flex-col justify-between'>
				{/* ACTIONS */}
				<div className='flex flex-col gap-y-2 mt-auto'>
					<button
						className={`w-full py-2 text-white font-medium ${
							isPublished ? 'bg-bronze' : 'bg-bg-green'
						}`}
						onClick={() => toggleVisibility(product)}
					>
						{isPublished ? 'Сховати' : 'Показати'}
					</button>

					<Link
						href={`/manage-panel/products/editor/${product._id}`}
						className='w-full py-2 text-white flex items-center justify-center bg-primary'
					>
						Редагувати
					</Link>

					<button
						className='w-full py-2 bg-sc-3'
						onClick={() => changeStatus(product, ProductStatus.EXPECTED)}
					>
						Очікується
					</button>

					<button
						className='w-full py-2 bg-[#C0C0C0]'
						onClick={() => changeStatus(product, ProductStatus.ON_ORDER)}
					>
						Під замовлення
					</button>

					<button
						className='w-full py-2 bg-sc-5 text-white'
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
						fncDelete={() => handleRemoveProduct()}
						fncEscape={() => setIsShowModal(false)}
						text='продукт'
					/>
				</BaseModal>
			)}
		</>
	)
})

export default EditProductCard
