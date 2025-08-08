import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import FormSection from '@/components/userUI/FormSection'
import React from 'react'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'
import NewsSection from '@/components/userUI/NewsSection'

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
      <FormSection />
      <div className="user-container">
        <TestimonialsSection />
        <NewsSection isMain={true} />
      </div>
    </>
  )
}

export default Main