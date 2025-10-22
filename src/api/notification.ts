import { BASE_URL } from '@/utils/config'

import { toast } from '@/lib/toast'

import axios from 'axios'

export async function toggleStatusNotification(id: string) {
	try {
		const res = await axios.patch(`${BASE_URL}/notifications/${id}/read`, id)

		return res.data
	} catch (err: any) {
		toast.error(err.response?.data?.message)
		throw err
	}
}
