'use client'
import { useState } from "react" 
import WorldIcon from '../../../public/icons/world-16.svg' 

const Language = () => {

  const [current, setCurrent] = useState('ukr')
  const [option, setOption] = useState('eng')

  const handleClick = () => {
    setCurrent(option)
    setOption(current)
  }

  return (
    <div className='flex gap-2 items-center cursor-pointer hover:text-gr-5 duration-200' onClick={handleClick} >
      <WorldIcon />
      <div className="min-w-8">{current}</div>
    </div>
  )
}

export default Language