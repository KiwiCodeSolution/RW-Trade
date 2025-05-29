'use client'

import { useEffect, useState, useRef } from 'react'

const CategoryControl = ({ categories, setCategory }) => {
  
  const lang = 'uk'
  
  const content = {
    uk: 'Всі категорії',
    en: 'All Categories',
  }

  const thumbWidth = 100

  const [selected, setSelected] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const thumbRef = useRef(null)
  const trackRef = useRef(null)
  const [thumbLeft, setThumbLeft] = useState(0)
  const [startX, setStartX] = useState(0)
  const [startLeft, setStartLeft] = useState(0)

  const handleChange = (e) => {
    setSelected(e.target.value)
    setCategory(e.target.value)
  }

  const handleScroll = () => {
    if (!containerRef.current || !trackRef.current) return
    
    const container = containerRef.current
    const track = trackRef.current
    
    const maxScroll = container.scrollWidth - container.clientWidth
    if (maxScroll <= 0) return
    
    const scrollRatio = container.scrollLeft / maxScroll
    const maxThumbTravel = track.clientWidth - thumbWidth
    
    const newThumbLeft = scrollRatio * maxThumbTravel
    setThumbLeft(newThumbLeft)
  }

  const handleThumbMouseDown = (e) => {
    e.preventDefault()
    setStartX(e.clientX)
    setStartLeft(thumbLeft)
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current || !trackRef.current) return
    
    const container = containerRef.current
    const track = trackRef.current
    
    const deltaX = e.clientX - startX
    
    const maxThumbTravel = track.clientWidth - thumbWidth
    const newThumbLeft = Math.max(0, Math.min(startLeft + deltaX, maxThumbTravel))

    setThumbLeft(newThumbLeft)
    
    const scrollRatio = newThumbLeft / maxThumbTravel
    const maxScroll = container.scrollWidth - container.clientWidth
    container.scrollLeft = scrollRatio * maxScroll
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    handleScroll()
    
    window.addEventListener('resize', handleScroll)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isDragging, startX, startLeft])

  return (
    <div className='relative'>
      <div 
        className="overflow-hidden mb-6" 
        onScroll={handleScroll} 
        ref={containerRef}
        role="region"
        aria-label="Categories navigation"
      >
        <div className='flex gap-2 whitespace-nowrap' >
          <label
            className={`p-0.5 rounded-md w-fit cursor-pointer ${selected === '' && 'bg-primary'}`}
          >
            <div className="bg-bg-light w-full h-full flex justify-center items-center rounded-sm">
              <div
                className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
                  selected === '' && 'text-transparent'
                }`}
              >
                {content[lang]}
              </div>
            </div>
            <input
              type="radio"
              name="categoryControl"
              id="control_0"
              value=""
              className="hidden"
              onChange={handleChange}
              checked={selected === ''}
            />
          </label>

          {categories.map((item, index) => (
            <label
              key={index}
              className={`p-0.5 rounded-md w-fit cursor-pointer ${
                selected === item.category && 'bg-primary'
              }`}
            >
              <div className="bg-bg-light w-full h-full flex justify-center items-center rounded-sm">
                <div
                  className={`text-nowrap px-4 py-2 bg-primary bg-clip-text hover:text-transparent ${
                    selected === item.category && 'text-transparent'
                  }`}
                >
                  {item[lang]}
                </div>
              </div>
              <input
                type="radio"
                name="categoryControl"
                id={`control_${item.category}`}
                value={item.category}
                className="hidden"
                onChange={handleChange}
                checked={selected === item.category}
              />
            </label>
          ))}
        </div>
      </div>
      
      <div 
        ref={trackRef}
        className="relative w-full h-1 bg-sc-1 rounded-sm z-10"
        role="scrollbar"
        aria-controls="categoryContainer"
        aria-orientation="horizontal"
      >
        <div
          ref={thumbRef}
          className={`absolute h-[300%] -top-[100%] bg-bronze rounded-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            width: `${thumbWidth}px`,
            left: `${thumbLeft}px`,
          }}
          onMouseDown={handleThumbMouseDown}
          role="presentation"
        />
      </div>
    </div>
  )
}

export default CategoryControl