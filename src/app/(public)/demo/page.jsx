import Button from '@/components/commonUI/Button'
import React from 'react'

const DemoPage = () => {
  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='text-2xl mb-8'>Demo Page</h1>
      <section className='mb-8'> 
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
      <section>
        <h2 className='text-xl mb-4'>Buttons</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-2'>
            <Button size='xxl'>XXL Button</Button>
            <Button variant='bronze' size='xxl'>XXL Button</Button>
            <Button variant='green' size='xxl' >XXL Button</Button>
            <Button variant='gost' size='xxl'>XXL Button</Button>
            <Button variant='outlined' size='xxl'>XXL Button</Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button size='m'>M Button</Button>
            <Button variant='bronze' size='m'>M Button</Button>
            <Button variant='green' size='m' >M Button</Button>
            <Button variant='gost' size='m'>M Button</Button>
            <Button variant='outlined' size='m'>M Button</Button>
          </div>
          <div className='flex flex-col gap-2'>
            <Button size='s'>S Button</Button>
            <Button variant='bronze' size='s'>S Button</Button>
            <Button variant='green' size='s' >S Button</Button>
            <Button variant='gost' size='s'>S Button</Button>
            <Button variant='outlined' size='s'>S Button</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DemoPage