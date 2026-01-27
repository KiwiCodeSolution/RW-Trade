import { OrderStats } from '@/types/baseTypes'

import { getAllData } from '@/api/stats'

import { authGuard } from '@/lib/authGuard'
import { toast } from '@/lib/toast'

import { makeAutoObservable, runInAction } from 'mobx'

class StatisticsStore {
	stats: OrderStats | null = null
	loading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	fetchStats = async () => {
		this.loading = true
		this.error = null

		try {
			const data = await getAllData()
			runInAction(() => {
				this.stats = data
				this.loading = false
			})
		} catch (err: unknown) {
			const error = err as { isAuthError?: boolean }
			console.error(error)

			if (error?.isAuthError) {
				authGuard.expireSession()
			} else {
				toast.error('Не вдалося отримати статистику')
			}

			return null
		} finally {
			runInAction(() => {
				this.loading = false
			})
		}
	}
}

export const statisticsStore = new StatisticsStore()
