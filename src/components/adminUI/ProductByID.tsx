'use client'

import { Product } from '@/types/baseTypes'

import { productStore } from '@/store/ProductsStore'

import ProductForm from './ProductForm'

import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

const ProductByID = observer(({ id }: { id: string }) => {
	const [product, setProduct] = useState<Product | null>(null)

	useEffect(() => {
		const loadProduct = async () => {
			if (!id) return

			const data = await productStore.fetchProductById(id)
			if (data) setProduct(data)
		}
		loadProduct()
	}, [id])

	if (!id) return <p>Не передано ID продукту.</p>

	if (!product) return <p>Продукт не знайдено.</p>

	return <ProductForm product={product} />
})

export default ProductByID
