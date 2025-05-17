import FormIcon_1 from '../../../public/icons/form_1.svg'
import FormIcon_2 from '../../../public/icons/form_2.svg' 
import FormIcon_3 from '../../../public/icons/form_3.svg'
import FormIcon_4 from '../../../public/icons/form_4.svg'
import UserForm from './UserForm'

const FormSection = () => {

  const lang = 'uk' 

  const content = {
    uk: {
      title: 'Товари для автомобілів',
      item_1: 'Прайси / оптові ціни',
      item_2: 'Співпраця / дропшипінг',
      item_3: 'Запчастини / аксесуари на замовлення',
      item_4: 'Допомога у виборі / підбір для конкретної марки авто'
    },
    en: {
      title: 'Товари для автомобілів',
      item_1: 'Прайси / оптові ціни',
      item_2: 'Співпраця / дропшипінг',
      item_3: 'Запчастини / аксесуари на замовлення',
      item_4: 'Допомога у виборі / підбір для конкретної марки авто'
    }
  }
  
  return (
    <section className='bg-primary h-[488px] text-white'>
      <div className='w-full h-full grid grid-cols-2 gap-4 py-14'>
        <div className='items-center max-w-[500px] mx-auto'>
          
          <div className='flex justify-center'>
            <img src="logos/LOGO 152 white.png" alt="logo" />
          </div>
          <h3 className='text-center text-[32px] font-bold border-b-2 border-white mb-4'>
            {content[lang].title}
          </h3>

          <div className='flex gap-6 mb-4 mx-8'>
            <FormIcon_1 className='min-w-[33px] h-auto'/>
            <p className='text-xl leading-8'>
              {content[lang].item_1}
            </p>
          </div>

          <div className='flex gap-6 mb-4 mx-8'>
            <FormIcon_2 className='min-w-[33px] h-auto'/>
            <p className='text-xl leading-8'>
              {content[lang].item_2}
            </p>
          </div>

          <div className='flex gap-6 mb-4 mx-8'>
            <FormIcon_3 className='min-w-[33px] h-auto'/>
            <p className='text-xl leading-8'>
              {content[lang].item_3}
            </p>
          </div>

          <div className='flex gap-6 mb-4 mx-8'>
            <FormIcon_4 className='min-w-[33px] h-auto'/>
            <p className='text-xl leading-8'>
              {content[lang].item_4}
            </p>
          </div>


        </div>
        <div className='items-center w-full max-w-[580px] mx-auto'>
          <UserForm />
        </div>
      </div>
    </section>
  )
}

export default FormSection