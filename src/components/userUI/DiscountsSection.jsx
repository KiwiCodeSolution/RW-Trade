'use client'
import ProductCard from './ProductCard'
import BtnSolid from '../commonUI/BtnSolid'
import CategoryControl from './CategoryControl'
import { categories } from '@/data/categories'
import { useEffect, useState } from 'react'

const DiscountsSection = () => {

  const setOfCategories = categories.slice(0, categories.length -1)

  const [selected, setSelected] = useState('')

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <section className='py-9'>
      <h2 className='font-bold text-[40px] mb-7'>Акції та скидки</h2>
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
        <BtnSolid variant='bronze' size='m'>
          Переглянути всі
        </BtnSolid>
      </div>
    </section>
  )
}

export default DiscountsSection