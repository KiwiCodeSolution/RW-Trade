'use client'

import { feedbackStore } from '@/store/FeedbackStore'
import { notificationsStore } from '@/store/NotificationsStore'

import BtnSolid from '../commonUI/BtnSolid'

import Count from './Count'

import { observer } from 'mobx-react-lite'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const AdminLink = ({ href, title, count }: { href: string; title: string; count?: number }) => {
	const pathname = usePathname() ?? ''
	const isActive = pathname === `/uk${href}`

	return (
		<div
			className={`w-full h-fit px-2 py-1 rounded-lg relative ${isActive ? 'bg-primary' : ''}`}
		>
			<Link
				href={href}
				className='flex items-center justify-between text-txt-white transition-colors hover:underline hover:underline-offset-2'
			>
				<span>{title}</span>
				{typeof count === 'number' && count > 0 && <Count count={count} />}
			</Link>
		</div>
	)
}

const TitleNavAdmin = ({ text }: { text: string }) => {
	return (
		<>
			<h2 className='text-2xl'>{text}</h2>
			<div className='h-0.5 w-full bg-primary' />
		</>
	)
}

const AdminHeader = observer(() => {
	const { data: session } = useSession()

	useEffect(() => {
		if (!session?.user?.accessToken) return

		const init = async () => {
			await notificationsStore.fetchNotifications()
			await feedbackStore.fetchMessages()
		}

		init()
	}, [session?.user?.accessToken])

	const handleLogout = async () => {
		await signOut({
			callbackUrl: '/uk/signin' //виходимо на сторінку аторизації
		})
	}

	return (
		<header className='flex flex-col gap-4 bg-[#3C4447] text-txt-white px-2 py-3 min-h-screen rounded-tr-4xl rounded-br-4xl justify-center sticky top-0 overflow-y-auto'>
			<div className='flex flex-col gap-6 '>
				{/* <div className='mt-4'>
					<Link
						href='/manage-panel'
						className='text-3xl font-bold w-7 h-7 rounded-full flex items-center justify-center hover:shadow-lg hover:product-card-shadow transition duration-300'
					>
						<HomeIcon />
					</Link>
				</div> */}

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text="Зворотній зв&nbsp;'язок" />

					<AdminLink
						href='/manage-panel/notifications'
						title='Сповіщення'
						count={
							notificationsStore.isLoaded && notificationsStore.unreadTotal > 0
								? notificationsStore.unreadTotal
								: undefined
						}
						// count={notificationsStore.unreadTotal}
					/>
					<AdminLink
						href='/manage-panel/messages'
						title='Повідомлення'
						count={
							feedbackStore.isLoaded && feedbackStore.newMessagesCount > 0
								? feedbackStore.newMessagesCount
								: undefined
						}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Замовлення' />

					<AdminLink
						href='/manage-panel/orders'
						title='Нові'
						count={notificationsStore.unreadOrders}
					/>
					<AdminLink href='/manage-panel/orders/history' title='Історія замовлень' />
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Товари та послуги' />

					<AdminLink
						href='/manage-panel/categories_filters'
						title='Категорії та фільтри'
					/>
					<AdminLink href='/manage-panel/products' title='Всі товари' />
					{/* <AdminLink href='/manage-panel/products/editor' title='Створити новий товар' /> */}
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Новини та статті' />

					<AdminLink href='/manage-panel/news' title='Всі новини' />
					{/* <AdminLink href='/manage-panel/news/editor' title='Додати / редагувати' /> */}
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Рекламні банери' />

					<AdminLink href='/manage-panel/banners' title='Управління банерами' />
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Статистика' />

					<AdminLink href='/manage-panel/statistics' title='Статистика за категоріями' />
				</div>

				<div className='flex flex-col gap-2'>
					<TitleNavAdmin text='Налаштування' />

					<AdminLink href='/manage-panel/profile' title='Профілі користувачів' />
				</div>

				<BtnSolid
					variant='primary'
					action={handleLogout}
					as='button'
					btnType='button'
					className='mx-auto'
				>
					Вийти
				</BtnSolid>
			</div>
		</header>
	)
})

export default AdminHeader
