'use client'

import { categories } from '@/data/categories'

import BtnSolid from '../commonUI/BtnSolid'

import CategoryControl from './CategoryControl'
import ProductCard from './ProductCard'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'

import { useState } from 'react'

const DiscountsSection = ({ title, btn }: { title: string; btn: string }) => {
	const setOfCategories = categories.slice(0, categories.length - 1)

	const [selected, setSelected] = useState('')

	// useEffect(() => {
	//   console.log('discount section')
	// }, [selected])

	return (
		<BaseSection className='py-9'>
			<Title tag='h2' styles='mb-7'>
				{title}
			</Title>

			<div className='mb-7'>
				<CategoryControl categories={setOfCategories} setCategory={setSelected} />
			</div>
			<div className='grid h-[505px] min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6 overflow-hidden'>
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
			<div className='mt-9 flex justify-center items-center'>
				<BtnSolid variant='bronze' size='m' as='link' href='/catalog/discount'>
					{btn}
				</BtnSolid>
			</div>
		</BaseSection>
	)
}

export default DiscountsSection
