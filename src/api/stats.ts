import { api } from '@/utils/axios'

import { OrderStats } from '@/types/baseTypes'

export async function getAllData(): Promise<OrderStats> {
	const { data } = await api.get<OrderStats>('/statistics', { params: { cache: 'no-store' } })
	return data
}
