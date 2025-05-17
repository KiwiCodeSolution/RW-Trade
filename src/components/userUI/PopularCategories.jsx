import React from 'react'
import BtnGost from '../commonUI/BtnGost'
import BtnIcon from '../../../public/icons/btn-icon-02-prim.svg' 
import CategoryIcon from '../commonUI/CategoryIcon'
import Link from 'next/link'



const PopularCategories = () => {

  const content = [
    {
      category: 'light',
      name: 'Автосвітло',
      text: 'Фары, лампы, LED-освещение, ходовые огни. Все для безопасности и стиля.'
    },
    {
      category: 'tools',
      name: 'Інструменти та обладнання', 
      text: 'Инструменты, наборы, ключи, головки и многое другое для сервиса авто.'
    },
    {
      category: 'control',
      name: 'Системи контроля у шинах',
      text: 'Датчики давления, температурные индикаторы, TPMS-комплекты.'
    },
    {
      category: 'electric',
      name: 'Автоелектроніка',
      text: 'Камеры, парктроники, сигнализации, гаджеты для комфорта и безопасности.'
    }
  ]
  return (
    <section className='py-9'>
      <h2 className="font-bold text-[40px] mb-7 text-center">Популяні категорії</h2>
      <div className="grid grid-cols-4 gap-10 mb-10 pt-10">
        
        {content.map((item, index) => (
          <Link key={index} href={`category/${item.category}`}>
            <div className='flex flex-col items-center max-w-[260px] mx-auto'>
              <div className='mb-5'>
                <CategoryIcon category={item.category} size='m'/>
              </div>
              <h3 className='text-xl font-semibold mb-2 text-center max-w-[200px]'>
                {item.name}
              </h3>
              <p className='text-center text-txt-dark opacity-50'>
                {item.text}
              </p>
            </div>
          </Link>
        ))}

      </div>
      <div className='flex justify-center'>
        <BtnGost variant='outlined'>
          <BtnIcon />
          <span>Всі категорії</span>
        </BtnGost>
      </div>
    </section>
  )
}

export default PopularCategories