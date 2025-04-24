import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import React from 'react'

const mockData = [1,2,3,4,5]

const Main = () => {
  return (
    <>
    <div className='user-container'>
      <AddSectionFirst />
      <PopularProducts />
    </div>
    <AddSectionSecond />
    <div className='user-container'>
      <DiscountsSection />
      <PopularCategories />
    </div>
    </>
  )
}

export default Main