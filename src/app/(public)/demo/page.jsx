import React from 'react'

const DemoPage = () => {
  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='text-2xl mb-4'>Demo Page</h1>
      <section>
        <h2 className='text-xl mb-2'>Gradients</h2>
        <div className='grid grid-cols-6 gap-4 h-40'>
          <div className='w-full h-full bg-primary'></div>
          <div className='w-full h-full bg-bronze'></div>
          <div className='w-full h-full bg-other-1'></div>
          <div className='w-full h-full bg-other-2'></div>
          <div className='w-full h-full bg-other-3'></div>
          <div className='w-full h-full bg-other-4'></div>
          </div>
      </section>
    </div>
  )
}

export default DemoPage