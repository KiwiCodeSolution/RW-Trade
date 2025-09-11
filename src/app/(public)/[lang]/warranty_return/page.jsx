import BabyImg from '../../../../../public/images/baby.svg'
import Image from 'next/image'

const WarrantyAndReturn = () => {
  return (
    <div>
      <div className='header-shadow'></div>
      <div className="user-container">
        <h1 className="page-title text-center">Гарантія та повернення</h1>
        <div className='grid grid-cols-2 py-4 gap-10 sm:gap-24'>
          <div>
            <h2 className='text-2xl font-semibold mb-2 sm:mb-10'>Гарантія:</h2>
            <p className='font-semibold mb-2 sm:mb-10'>Гарантійні зобов'язання:</p>
            <p className='mb-2 sm:mb-8'> Весь товар нашого інтернет магазину має гарантійний термін експлуатації! Гарантія на кожен товар індивідуальна і складає від 2-х тижнів (аксесуари, зарядні пристрої та інше) до 5 років, залежно від товару.</p>
            <p className='mb-2 sm:mb-8'>Протягом гарантійного терміну ми зобов'язуємось замінити (полагодити) придбаний у нашому інтернет-магазині товар. Якщо у гарантійний період виріб придбаний у нас вийшов з ладу з вини виробника і не може бути відремонтований у сервісному центрі – ми обміняємо товар на аналогічний робітник.</p>
            <p className='mb-2 sm:mb-8'>У момент передачі або отримання товару (поштою, у кур'єра), покупець зобов'язаний перевірити товарний вигляд, комплектацію та відсутність механічних пошкоджень. Перевірити товар на увімкнення вимкнення. Після прийому товару право власності, а також ризик випадкової втрати або пошкодження переходить до Покупця, після чого Продавець не приймає претензій до зовнішнього вигляду та комплектації товару.</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mx-auto w-fit mb-20'>
              <Image src="/logos/LOGO 252 orange.png" width={252} height={96} alt="logo" />
            </div>
            <div className='w-full max-w-[600px]'>
              <BabyImg className='w-full h-auto'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarrantyAndReturn