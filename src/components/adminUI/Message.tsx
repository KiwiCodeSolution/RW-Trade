'use client'

import { Arrow, Trash } from '@/assets/icons'

import { FeedbackStatus, Message } from '@/types/baseTypes'

import { feedbackStore } from '@/store/FeedbackStore'

import BaseModal from '../commonUI/modal/BaseModal'
import ConfirmAdminComponent from '../commonUI/modal/ConfirmAdminComponent'

import { observer } from 'mobx-react-lite'
import { useState } from 'react'

const statuses: { label: string; value: FeedbackStatus; color: string }[] = [
	{ label: 'Нове', value: 'new', color: 'bg-bg-green text-white' },
	{
		label: 'Прочитано',
		value: 'read',
		color: 'bg-transparent border border-nav text-nav'
	},
	{
		label: 'Звʼязались',
		value: 'contacted',
		color: 'bg-primary text-white'
	},
	{ label: 'Важливе', value: 'important', color: 'bg-bronze text-white' }
]

const MessageComponent = observer(({ message }: { message: Message }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isShowModal, setIsShowModal] = useState(false)
	const current = statuses.find(s => s.value === message.status) || statuses[0]

	const handleStatusChange = async (status: FeedbackStatus) => {
		setIsOpen(false)
		await feedbackStore.updateStatus(message._id, status)
	}

	async function handleDeleteMessage(id: string) {
		await feedbackStore.removeMessage(id)
		setIsShowModal(false)
	}
	const formatDate = (iso: string) => {
		const d = new Date(iso)
		const pad = (n: number) => n.toString().padStart(2, '0')
		return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
	}

	return (
		<article className='w-full h-fit rounded-lg bg-primary p-[2px]' id={message._id}>
			<div className='w-full h-full bg-bg-light py-5 px-8 rounded-lg gap-2 flex flex-col '>
				<div className='flex items-center justify-between'>
					<p>
						<span className='font-bold'>Імʼя: </span>
						{message.username}
					</p>
					<p>
						<span className='font-bold'>Дата: </span>
						{formatDate(message.createdAt)}
					</p>
				</div>

				<div className='flex flex-col'>
					<p className='text-base font-bold'>Коментар:</p>
					<p>{message.message}</p>
				</div>

				{/* buttons */}
				<div className='flex items-center justify-end gap-x-4 relative'>
					<button
						className='w-7 h-7 rounded-full flex items-center justify-center bg-sc-5'
						onClick={() => {
							setIsShowModal(true)
						}}
					>
						<Trash className='w-4 h-4' />
					</button>
					<div className='flex items-center gap-x-4 relative'>
						<button
							onClick={() => setIsOpen(prev => !prev)}
							className={`w-[171px] h-7 px-4 py-[7px] rounded-lg transition-all ${current.color} flex items-center justify-between`}
						>
							{current.label}
							<Arrow variant={current.value === 'read' ? 'gradient' : 'white'} />
						</button>

						{isOpen && (
							<div className='absolute top-[100%] right-0 w-[171px] rounded-lg shadow-lg z-10 bg-primary p-[2px]'>
								<ul className='w-full bg-white rounded-lg'>
									{statuses.map(status => (
										<li key={status.value} className='list-none'>
											<button
												onClick={() => handleStatusChange(status.value)}
												className={`w-full text-left rounded-lg px-4 py-2 hover:bg-gray-100 ${
													message.status === status.value
														? 'font-bold'
														: ''
												}`}
											>
												{status.label}
											</button>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
			{isShowModal && (
				<BaseModal
					isOpen={isShowModal}
					onClose={() => setIsShowModal(false)}
					title='Підтвердження видалення'
				>
					<ConfirmAdminComponent
						fncDelete={handleDeleteMessage.bind(null, message._id)}
						fncEscape={() => setIsShowModal(false)}
						text='повідомлення'
					/>
				</BaseModal>
			)}
		</article>
	)
})

export default MessageComponent
