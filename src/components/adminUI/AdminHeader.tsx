'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AdminLink = ({ href, title }: { href: string; title: string }) => {
	const pathname = usePathname()

	const isActive = pathname === `/uk${href}`

	return (
		<div className={`w-full h-fit px-2 py-1 rounded-lg ${isActive ? 'bg-primary' : ''}`}>
			<Link
				href={href}
				className={`text-txt-white transition-colors hover:underline hover:underline-offset-2`}
			>
				{title}
			</Link>
		</div>
	)
}
const AdminHeader = () => {
	const handleLogout = async () => {
		await signOut({
			callbackUrl: '/uk/signin' //виходимо на сторінку аторизації
		})
	}

	return (
		<header className='flex flex-col gap-7 bg-[#3C4447] text-txt-white p-2 min-h-screen rounded-tr-4xl rounded-br-4xl justify-center'>
			{/* <div className='flex justify-center pt-4'>
				<Link href='/admin' className='mx-auto'>
					<BaseImageItem src={'/logos/LOGO_252_white.png'} />
				</Link>
			</div> */}

			<div className='flex flex-col gap-7 px-2 overflow-y-auto '>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Зворотній зв'язок</h2>
					<div className='h-0.5 w-full bg-primary' />
					<AdminLink href='/admin/notifications' title='Сповіщення' />
					<AdminLink href='/admin/messages' title='Повідомлення' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Замовлення</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/admin/orders' title='Нові' />
					<AdminLink href='/admin/orders' title='Історія замовлень' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Товари та послуги</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/admin/categories_filters' title='Категорії та фільтри' />
					<AdminLink href='/admin/cards' title='Картки товарів' />
					<AdminLink href='/admin/create_card' title='Створити нову картку' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Новини та статті</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/admin/news' title='Додати / редагувати' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Статистика</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/admin/statistics' title='Категорії товарів' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'> Налаштування</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/admin/profile' title='Профілі користувачів' />
				</div>

				<button onClick={handleLogout}>LogOut</button>

				{/* <div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Сторінки сайта</h2>
					<div className='h-0.5 w-full bg-primary'></div>
					<Link href='/' className='text-link-bronze'>
						Головна
					</Link>
				</div> */}
			</div>
		</header>
	)
}

export default AdminHeader
