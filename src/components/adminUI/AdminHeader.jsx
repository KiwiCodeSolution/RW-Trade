import Link from "next/link"
import Logo from "../../../public/logos/LOGO 252 white.png"

const AdminHeader = () => {
  return (
    <header className='flex flex-col gap-12 bg-txt-dark text-txt-white p-2'>

      <div className="flex justify-center pt-4">
        <Link href='/admin' className="mx-auto">
          <img src="logos/LOGO 252 white.png"/>
        </Link>
      </div>

      <div className='flex flex-col gap-10 px-2'>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Зворотній зв'язок</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/notifications' className="text-txt-white" >Сповіщення</Link>
          <Link href='/admin/messages' className="text-txt-white" >Повідомлення</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Замовлення</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/orders' className="text-txt-white" >Нові</Link>
          <Link href='/admin/orders' className="text-txt-white" >Історія замовлень</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Товари та послуги</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/categories_filters' className="text-txt-white" >Категорії та фільтри</Link>
          <Link href='/admin/cards' className="text-txt-white" >Картки товарів</Link>
          <Link href='/admin/create_card' className="text-txt-white" >Створити нову картку</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Новини та статті</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/orders' className="text-txt-white" >Додати / редагувати</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Статистика</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/statistics' className="text-txt-white" >Категорії товарів</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl"> Налаштування</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/admin/profile'className="text-txt-white" >Профілі користувачів</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Сторінки сайта</h2>
          <div className="h-0.5 w-full bg-primary"></div>
          <Link href='/' className="text-link-bronze" >Головна</Link>
        </div>




      </div>
    </header>
  )
}

export default AdminHeader