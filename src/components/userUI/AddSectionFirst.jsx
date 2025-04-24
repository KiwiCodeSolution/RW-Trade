'use client'
import { useState, useEffect} from 'react'

const AddSectionFirst = () => {

  const [currentSlide, setCurrentSlide] = useState(0)

  const slideStyle = 'w-full h-[176px] sm:h-[290px] rounded-2xl bg-sc-2 flex justify-center items-center'

  const slides = [
    <div className={slideStyle}>Slide 1</div>,
    <div className={slideStyle}>Slide 2</div>
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section>
      <div className='hidden sm:grid sm:grid-cols-2 sm:gap-12 sm:py-14'>      
        {slides.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className='sm:hidden relative w-full flex justify-center items-center'>
        {slides[currentSlide]}
        <div className='absolute bottom-2 left-1/2 -translate-1/2 flex gap-2'>
          {slides.map((item, index) => (
            <div key={index} className={`h-2 rounded-full duration-200 ${index === currentSlide ? 'bg-bronze w-5' : 'bg-primary w-2'}`}></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AddSectionFirst