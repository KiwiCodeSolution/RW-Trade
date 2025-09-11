import AddSectionFirst from '@/components/userUI/AddSectionFirst'
import AddSectionSecond from '@/components/userUI/AddSectionSecond'
import DiscountsSection from '@/components/userUI/DiscountsSection'
import PopularCategories from '@/components/userUI/PopularCategories'
import PopularProducts from '@/components/userUI/PopularProducts'
import FormSection from '@/components/userUI/FormSection'
import React from 'react'
import TestimonialsSection from '@/components/userUI/TestimonialsSection'
import NewsSection from '@/components/userUI/NewsSection'
import { getDictionary } from '@/app/dictionaries/get-dictionary'

// export async function generateStaticParams() {
//   return [
//     { lang: "en" },
//     { lang: "uk" },
//   ];
// }

const Main = async ({ params }) => {

  const {lang} = await params

  // const dictionary = await getDictionary(lang)

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
        <NewsSection isMain={true} lang={lang}/>
      </div>
    </>
  )
}

export default Main