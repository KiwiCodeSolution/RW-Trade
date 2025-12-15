'use client'

import { Bell, Cart, Envelope } from '@/assets/icons'

import { Notification } from '@/types/baseTypes'

import { notificationsStore } from '@/store/NotificationsStore'

import { observer } from 'mobx-react-lite'

type Props = { notice: Notification }

const Notice = observer(({ notice }: Props) => {
	const isUnread = notice.status === 'unread'

	const textColor = isUnread ? 'text-white' : 'gradient-text'
	const text =
		notice.type === 'order'
			? `Замовлення товару на суму ${notice.amount} грн від ${notice.name}`
			: `Повідомлення з основної сторінки сайту від ${notice.name}`

	const link =
		notice.type === 'order'
			? `/manage-panel/orders#${notice.refId}`
			: `/manage-panel/messages#${notice.refId}`

	const formatDate = (iso: string) => {
		const d = new Date(iso)
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(
			d.getHours()
		)}:${pad(d.getMinutes())}`
	}

	const handleMarkRead = async () => {
		if (isUnread) {
			await notificationsStore.toggleStatus(notice._id)
		}
	}

	return (
		<a
			href={link}
			onClick={handleMarkRead}
			className={`w-full rounded-2xl ${
				isUnread ? 'bg-bg-green' : 'p-[2px] bg-primary'
			} hover:shadow-lg transition-shadow duration-300 cursor-pointer block`}
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
		</a>
	)
})

export default Notice
