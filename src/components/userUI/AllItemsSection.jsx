'use client' 

import CategoryControl from './CategoryControl'
import { categories } from '@/data/categories'
import { subCategories } from '@/data/subCategories'
import { useEffect, useState } from 'react'
import SubCategoryControl from './SubCategoryControl'
import NumberOfProducts from './NumberOfProducts'
import { fakeProducts } from '@/data/fakeData'
import ProductCard from './ProductCard'
import Pagination from '../commonUI/Pagination'

const AllItemsSection = () => {

  const [category, setCategory] = useState('any')
  const [selectedCategory, setSelectedCategoriy] = useState(null)
  const [subCategory, setSubCategory] = useState('any')

  const [numberOfItems, setNumberOfItems] = useState('10')
  const [products, setProducts] = useState([]) 

  const [currentPage, setCurrentPage] = useState(1)

  const lang = 'uk'

  const title = {
    uk: 'Всі товари на сайті',
    en: 'All products on the site'
  }

  useEffect(() => {
    console.log('all items section rendered first useEffect')
    const selected = subCategories.find(item => item.category === category)
    setSelectedCategoriy(selected || null)
    setSubCategory('any')
  }, [category])

  useEffect(() => {
    console.log('all items section rendered second useEffect')
    const fakeProds = fakeProducts(numberOfItems, category, subCategory)
    setProducts(fakeProds)
  }, [numberOfItems, category, subCategory, currentPage])

  return (
    <section>
      <h2 className="font-bold text-[40px] mb-7">{title[lang]}</h2>
      <div className="mb-7">
        <CategoryControl categories={categories} setCategory={setCategory}/>
      </div>
      {!!selectedCategory && (
        <div className="mb-7">
          <SubCategoryControl category={selectedCategory} setSubCategory={setSubCategory} />
        </div>
      )}
      <div className='mb-7 flex justify-end'>
        <NumberOfProducts setNumber={setNumberOfItems} initialNumber={numberOfItems} />
      </div>
      <div className='mb-7 grid min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6'>
        {products.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
      <div className='mb-7'>
        <Pagination numberOfItems={100} itemsPerPage={numberOfItems} currentPage={1} onPageChange={(page) => setCurrentPage(page)}/>
      </div>

    </section>
  )
}

export default AllItemsSection