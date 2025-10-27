'use client'

import { Bell, Cart, Envelope } from '@/assets/icons'

import { Notification } from '@/types/baseTypes'

import { notificationsStore } from '@/store/NotificationsStore'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

type Props = { notice: Notification; token: string }

const Notice = observer(({ notice, token }: Props) => {
	const router = useRouter()
	const isUnread = notice.status === 'unread'

	const textColor = isUnread ? 'text-white' : 'gradient-text'
	const text =
		notice.type === 'order'
			? `Замовлення товару на суму ${notice.amount} грн від ${notice.name}`
			: `Повідомлення з основної сторінки сайту від ${notice.name}`

	const link =
		notice.type === 'order'
			? `/manage-panel/orders#${notice._id}`
			: `/manage-panel/messages#${notice._id}`

	const formatDate = (iso: string) => {
		const d = new Date(iso)
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(
			d.getHours()
		)}:${pad(d.getMinutes())}`
	}

	const handleClick = async () => {
		if (isUnread) {
			await notificationsStore.toggleStatus(notice._id, token)
		}
		router.push(link)
	}

	return (
		<article
			onClick={handleClick}
			className={`w-full rounded-2xl ${
				isUnread ? 'bg-bg-green' : 'p-[2px] bg-primary'
			} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
		>
			<div
				className={`w-full h-full rounded-2xl px-6 py-5 flex items-center justify-between ${
					isUnread ? '' : 'bg-bg-light'
				}`}
			>
				<div className='flex items-center gap-x-2'>
					{notice.type === 'order' ? (
						<>
							{isUnread && <Bell />}
							<Cart variant={isUnread ? 'white' : 'gradient'} type='notice' />
						</>
					) : (
						<>
							{isUnread && <Bell />}
							<Envelope variant={isUnread ? 'white' : 'gradient'} />
						</>
					)}
				</div>
				<p className={`${textColor} text-lg font-bold`}>{text}</p>
				<p className={`${textColor} text-lg font-bold`}>{formatDate(notice.date)}</p>
			</div>
		</article>
	)
})

export default Notice
