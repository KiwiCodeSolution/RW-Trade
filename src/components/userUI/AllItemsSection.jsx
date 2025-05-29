'use client' 
import ProductCard from './ProductCard'
import BtnSolid from '../commonUI/BtnSolid'
import CategoryControl from './CategoryControl'
import { categories } from '@/data/categories'
import { subCategories } from '@/data/subCategories'
import { useEffect, useState } from 'react'
import SubCategoryControl from './SubCategoryControl'

const AllItemsSection = () => {

  const [category, setCategory] = useState('')
  const [selectedCategory, setSelectedCategoriy] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const lang = 'uk'

  const title = {
    uk: 'Всі товари на сайті',
    en: 'All products on the site'
  }

  useEffect(() => {
    const selected = subCategories.find(item => item.category === category)
    console.log(selected)
    setSelectedCategoriy(selected || '')
  }, [category])

  return (
    <section>
      <h2 className="font-bold text-[40px] mb-7">{title[lang]}</h2>
      <div className="mb-7">
        <CategoryControl categories={categories} setCategory={setCategory}/>
      </div>
      {!!selectedCategory && (
        <div className="mb-7">
          <SubCategoryControl category={selectedCategory} setSubCategory={setSelectedSubCategory} />
        </div>
      )}

    </section>
  )
}

export default AllItemsSection