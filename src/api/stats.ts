import { api } from '@/utils/axios'

import { OrderStats } from '@/types/baseTypes'

import { toast } from '@/lib/toast'

export async function getAllData(): Promise<OrderStats> {
	try {
		const { data } = await api.get<OrderStats>('/statistics', { params: { cache: 'no-store' } })
		return data
	} catch (err) {
		toast.error('Помилка отримання статистики')
		console.error('Помилка отримання статистики', err)
		throw err
	}
}
