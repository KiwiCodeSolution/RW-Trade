import { BASE_URL } from '@/utils/config'

import { OrderStats } from '@/types/baseTypes'

import { fetchWithAuth } from './fetchWithAuth'

// Отримати всі нотифікації
export async function getAllData(): Promise<OrderStats> {
	const res = await fetchWithAuth(`${BASE_URL}/statistics`, { cache: 'no-store' })

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`)
	}

	const data: OrderStats = await res.json()
	return data
}
