import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios, { isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

export interface Notification {
	_id: string
	type: 'order' | 'feedback' | string
	status: 'unread' | 'read'
}

class NotificationsStore {
	notifications: Notification[] = []
	unreadTotal = 0
	unreadOrders = 0
	unreadFeedback = 0
	isLoaded = false

	constructor() {
		makeAutoObservable(this)
	}

	/** --- Отримання нотифікацій --- */
	async fetchNotifications(token: string) {
		try {
			this.isLoaded = false

			const res = await fetch(`${BASE_URL}/notifications`, {
				headers: { Authorization: `Bearer ${token}` },
				cache: 'no-store'
			})

			if (!res.ok) throw new Error(`HTTP ${res.status}`)

			const data: Notification[] = await res.json()

			runInAction(() => {
				this.notifications = data
				this._recalculateUnread()
				this.isLoaded = true
			})
		} catch (err) {
			console.error('Помилка при отриманні нотифікацій:', err)
			runInAction(() => {
				this.isLoaded = true
			})
		}
	}

	/** --- Тогл статусу прочитання (API + локальне оновлення) --- */
	async toggleStatus(id: string, token: string) {
		try {
			await axios.patch(`${BASE_URL}/notifications/${id}/read`, id, {
				headers: { Authorization: `Bearer ${token}` }
			})

			runInAction(() => {
				const target = this.notifications.find(n => n._id === id)
				if (target) {
					target.status = target.status === 'unread' ? 'read' : 'unread'
					this._recalculateUnread()
				}
			})
		} catch (err: unknown) {
			const msg = isAxiosError(err)
				? (err.response?.data?.message ?? 'Помилка при оновленні статусу')
				: 'Помилка при оновленні статусу'
			toast.error(msg)
			console.error('Помилка при оновленні статусу:', err)
		}
	}

	/** --- Внутрішній метод для підрахунку --- */
	private _recalculateUnread() {
		const unread = this.notifications.filter(n => n.status === 'unread')
		this.unreadTotal = unread.length
		this.unreadOrders = unread.filter(n => n.type === 'order').length
		this.unreadFeedback = unread.filter(n => n.type === 'feedback').length
	}
}

export const notificationsStore = new NotificationsStore()
