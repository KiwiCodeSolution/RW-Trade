import React from 'react'
import BtnSolid from '../commonUI/BtnSolid' 
import Icon from '../../../public/icons/btn-icon-01-32.svg'
import CardRow from './CardRow'

const PopularProducts = () => {
  return (
    <section className='py-9'>
      <h2 className='font-bold text-[40px] mb-7'>Популяні товари</h2>
      <div className='grid grid-rows-3 gap-9 mb-9'>
        <CardRow />
        <CardRow />
        <CardRow />
      </div>
      <div className='flex justify-center items-center'>
        <BtnSolid size='m' variant='bronze'>
          <Icon />
          <span>
            Дивитись каталог
          </span>
        </BtnSolid>
      </div>
    </section>
  )
}

export default PopularProducts