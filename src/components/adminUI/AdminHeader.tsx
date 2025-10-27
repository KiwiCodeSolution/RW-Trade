'use client'

import { feedbackStore } from '@/store/FeedbackStore'
import { notificationsStore } from '@/store/NotificationsStore'

import Count from './Count'

import { observer } from 'mobx-react-lite'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const AdminLink = ({ href, title, count }: { href: string; title: string; count?: number }) => {
	const pathname = usePathname()

	const isActive = pathname === `/uk${href}`

	return (
		<div
			className={`w-full h-fit px-2 py-1 rounded-lg relative ${isActive ? 'bg-primary' : ''}`}
		>
			<Link
				href={href}
				className={`text-txt-white transition-colors hover:underline hover:underline-offset-2`}
			>
				{title}
			</Link>
			{count && count > 0 && <Count count={count} />}
		</div>
	)
}
const AdminHeader = observer(() => {
	const { data: session } = useSession()

	useEffect(() => {
		if (!session?.user?.accessToken) return

		const init = async () => {
			await notificationsStore.fetchNotifications(session.user.accessToken!)
			await feedbackStore.fetchMessages(session.user.accessToken!)
		}

		init()
	}, [session?.user?.accessToken])

	const handleLogout = async () => {
		await signOut({
			callbackUrl: '/uk/signin' //виходимо на сторінку аторизації
		})
	}

	return (
		<header className='flex flex-col gap-7 bg-[#3C4447] text-txt-white p-2 min-h-screen rounded-tr-4xl rounded-br-4xl justify-center'>
			{/* <div className='flex justify-center pt-4'>
				<Link href='/manage-panel' className='mx-auto'>
					<BaseImageItem src={'/logos/LOGO_252_white.png'} />
				</Link>
			</div> */}

			<div className='flex flex-col gap-7 px-2 overflow-y-auto '>
				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Зворотній зв&nbsp;&apos;язок</h2>
					<div className='h-0.5 w-full bg-primary' />
					<AdminLink
						href='/manage-panel/notifications'
						title='Сповіщення'
						count={notificationsStore.unreadTotal}
					/>
					<AdminLink
						href='/manage-panel/messages'
						title='Повідомлення'
						count={feedbackStore.newMessagesCount}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Замовлення</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink
						href='/manage-panel/orders'
						title='Нові'
						count={notificationsStore.unreadOrders}
					/>
					<AdminLink href='/manage-panel/orders' title='Історія замовлень' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Товари та послуги</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink
						href='/manage-panel/categories_filters'
						title='Категорії та фільтри'
					/>
					<AdminLink href='/manage-panel/cards' title='Картки товарів' />
					<AdminLink href='/manage-panel/create_card' title='Створити нову картку' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Новини та статті</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/manage-panel/news' title='Додати / редагувати' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'>Статистика</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/manage-panel/statistics' title='Категорії товарів' />
				</div>

				<div className='flex flex-col gap-2'>
					<h2 className='text-2xl'> Налаштування</h2>
					<div className='h-0.5 w-full bg-primary' />

					<AdminLink href='/manage-panel/profile' title='Профілі користувачів' />
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
})

export default AdminHeader
