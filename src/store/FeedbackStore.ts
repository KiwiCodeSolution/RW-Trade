'use client'

import { BASE_URL } from '@/utils/config'

import { FeedbackStatus, Message } from '@/types/baseTypes'

import { getAllMessages } from '@/api/feedback'

import { notificationsStore } from './NotificationsStore'
import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

class FeedbackStore {
	messages: Message[] = []
	newMessagesCount = 0
	contactedCount = 0
	importantCount = 0

	constructor() {
		makeAutoObservable(this)
	}

	async fetchMessages(token: string) {
		try {
			const res = await getAllMessages(token)

			runInAction(() => {
				this.messages = res
				this.newMessagesCount = res.filter(m => m.status === 'new').length
				this.contactedCount = res.filter(m => m.status === 'contacted').length
				this.importantCount = res.filter(m => m.status === 'important').length
			})
		} catch (err: unknown) {
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при завантаженні звернень')
				: 'Помилка при завантаженні звернень'
			toast.error(msg)
		}
	}

	async updateStatus(id: string, status: FeedbackStatus, token: string) {
		try {
			await axios.patch(
				`${BASE_URL}/feedbacks/${id}/status`,
				{ status },
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			runInAction(() => {
				const msg = this.messages.find(m => m._id === id)
				if (msg) msg.status = status

				// після оновлення одразу перераховуємо кількість
				this.newMessagesCount = this.messages.filter(m => m.status === 'new').length
				this.contactedCount = this.messages.filter(m => m.status === 'contacted').length
				this.importantCount = this.messages.filter(m => m.status === 'important').length
			})
			// синхронізація з notificationsStore
			await notificationsStore.fetchNotifications(token)
		} catch (err: unknown) {
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при зміні статусу')
				: 'Помилка при зміні статусу'
			toast.error(msg)
		}
	}
}

export const feedbackStore = new FeedbackStore()
