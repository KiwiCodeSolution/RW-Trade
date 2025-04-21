import Logo from '../../../../public/logos/LOGO 1.svg'
import BabyImg from '../../../../public/images/baby.svg'

const PaymentAndDelivery = () => {
  return (
    <div>
      <div className='header-shadow'></div>
      <div className="user-container">
        <h1 className='page-title text-center'>Оплата и доствака</h1>
        <div className='grid grid-cols-2 py-4 gap-10 sm:gap-24'>
          <div>

            <h2 className='text-2xl font-semibold mb-2 sm:mb-10'>Способи доставки:</h2>
            <p className='font-semibold mb-2 ml-1'>&#183; Нова Пошта</p>
            <p className='mb-2 sm:mb-8'>
              Доставка від 1 до 5 днів (в залежності від віддаленості населеного пункту). Для отримання посилки необхідно пред'явити паспорт і повідомити номер декларації, який ми надішлемо у вигляді SMS-повідомлення на вказану номер телефону.
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Укрпошта </p>
            <p className='mb-2 sm:mb-8'>
            Безкоштовно за умови <br/>
            Безкоштовно при вартості замовлення від 1500 ₴.Ми відправляємо посилки Укрпоштою за умови 100% передоплати з урахуванням вартості доставки (орієнтовно 30 грн). Час відправлення 1-2 дні + доставка орієнтовно від 3 до 7 днів (в залежності від віддаленості населеного пункту).
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Самовивіз</p>
            <p className='mb-2 sm:mb-8'>
              вул. Державінська, 38 (поряд із станцією метро "Метробудівників"). Магазин працює Пн-Пт з 10:00 до 17:00, Сб з 10:00 до 16:00. Нд - вихідний. ОБОВЯЗКОВО! Попередньо потрібно оформити замовлення, т.к. не весь асортимент представлений у магазині.
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Meest ПОШТА</p>
            <p className='mb-4 sm:mb-20'>
              Доставка кур'єром (м. Харків) Вартість доставки 100.00 ₴.Наш кур'єр доставить замовлення 6 днів на тиждень з 9.00 до 20.00. Більш точний час обговорюється з менеджером при оформленні замовлення. Вартість доставки по Харкову 100 грн (по області обговорюється індивідуально).
            </p>

            <h2 className='text-2xl font-semibold mb-2 sm:mb-10'>Способи оплати:</h2>
            <p className='font-semibold mb-2 sm:mb-8 ml-1'>&#183; Післяплата</p>
            <p className='font-semibold mb-2 ml-1'>&#183; Оплата на картку Приватбанку</p>
            <p className='mb-2 sm:mb-8'>
              При виборі оплати на карту банку, клієнт сплачує зазначену суму за товар на картковий рахунок магазину (номер картки для оплати приходить СМС повідомленням після обробки замовлення). Після підтвердження отримання грошей, ми висилаємо посилку клієнту.
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Готівкою</p>
            <p className='mb-2 sm:mb-8'>
              Оплата здійснюється готівкою в нашому магазині, або, при доставці кур'єром, безпосередньо кур'єру.
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Безготівковий розрахунок (ПП ЄП 2-3 групи)</p>
            <p className='mb-2 sm:mb-8'>
              Після прийому замовлення ми надамо рахунок-фактуру, який Ви зможете оплатити зі свого рахунку або у відділенні будь-якого банку.
            </p>
            <p className='font-semibold mb-2 ml-1'>&#183; Оплата картою Visa, Mastercard - WayForPay</p>
            <p className='mb-2 sm:mb-8'>
              Перед оплатою замовлення уточніть наявність товару на складі!
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='mx-auto w-fit mb-20'>
              <Logo className='w-[240px ] sm:w-[320px] h-auto' />
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

export default PaymentAndDelivery