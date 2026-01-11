'use client'

import LeftIcon from '@/assets/icons/chevron-left-32.svg'
import RightIcon from '@/assets/icons/chevron-right-32.svg'
import { Locale } from '@/types/baseTypes'
import TestimonialsCard from './TestimonialsCard'
import { useState } from 'react'

const TestimonialsCarousel = ({ locale }: { locale: Locale }) => {
    const testimonials = [
        {
            uk: { name: 'user name 1', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' },
            en: { name: 'user name 1', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' }
        },
        {
            uk: { name: 'user name 2', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' },
            en: { name: 'user name 2', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' }
        },
        {
            uk: { name: 'user name 3', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' },
            en: { name: 'user name 3', imgUrl: '', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.' }
        }
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 4
    const totalPages = testimonials.length > 0 ? Math.ceil(testimonials.length / itemsPerPage) : 0

    const currentTestimonials = testimonials.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    const currentLocale = (locale === 'en' || locale === 'uk') ? locale : 'uk';

    return (
        <div className='h-full flex flex-col pt-8 pb-5 lg:py-5'>
            <div className='grow'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-6'>
                    {currentTestimonials.map((item, index) => {
                        const testimonialData = item[currentLocale] || item['uk'];
                        if (!testimonialData) return null;

                        return (
                            <div key={index} className='w-full flex justify-center'>
                                <TestimonialsCard testimonial={testimonialData} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex justify-center items-center gap-6 py-4 px-8'>
                <button onClick={handlePrev} disabled={currentPage === 0} className={`w-8 h-8 rounded-full bg-bronze flex justify-center items-center ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <LeftIcon className='text-white' />
                </button>
                <span className='text-gray-700'>{currentLocale === 'uk' ? 'Наступні' : 'Next'}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`w-8 h-8 rounded-full bg-bronze flex justify-center items-center ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <RightIcon className='text-white' />
                </button>
            </div>
        </div>
    )
}

export default TestimonialsCarousel
