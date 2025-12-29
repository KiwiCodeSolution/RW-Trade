'use client'

import { FeedbackStatus, Message } from '@/types/baseTypes'

import { deleteMessage, getAllMessages, toggleStatusFeedback } from '@/api/feedback'

import { notificationsStore } from './NotificationsStore'
import { toast } from '@/lib/toast'

import { isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

export class FeedbackStore {
	messages: Message[] = []
	newMessagesCount = 0
	contactedCount = 0
	importantCount = 0
	isLoaded = false

	constructor() {
		makeAutoObservable(this)
	}

	async fetchMessages() {
		this.isLoaded = false
		try {
			const res: Message[] = await getAllMessages()
			runInAction(() => {
				this.messages = res
				this.recalculateCounts()
				this.isLoaded = true
			})
		} catch (err: unknown) {
			runInAction(() => (this.isLoaded = true))
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при завантаженні звернень')
				: 'Помилка при завантаженні звернень'
			toast.error(msg)
		}
	}

	private recalculateCounts() {
		this.newMessagesCount = this.messages.filter(m => m.status === 'new').length
		this.contactedCount = this.messages.filter(m => m.status === 'contacted').length
		this.importantCount = this.messages.filter(m => m.status === 'important').length
	}

	async updateStatus(id: string, status: FeedbackStatus) {
		try {
			await toggleStatusFeedback(id, status)
			runInAction(() => {
				const msg = this.messages.find(m => m._id === id)
				if (msg) msg.status = status
				this.recalculateCounts()
			})
			await notificationsStore.fetchNotifications()
			toast.success('Статус успішно оновлено')
		} catch (err: unknown) {
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при зміні статусу')
				: 'Помилка при зміні статусу'
			toast.error(msg)
		}
	}

	async removeMessage(id: string) {
		try {
			await deleteMessage(id)
			runInAction(() => {
				this.messages = this.messages.filter(m => m._id !== id)
				this.recalculateCounts()
			})
			toast.success('Повідомлення видалено')
		} catch (err: unknown) {
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при видаленні звернення')
				: 'Помилка при видаленні звернення'
			toast.error(msg)
		}
	}
}

export const feedbackStore = new FeedbackStore()
