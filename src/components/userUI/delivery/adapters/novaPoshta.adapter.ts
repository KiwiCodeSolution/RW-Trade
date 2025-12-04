import {
	DeliveryAPI,
	DeliveryCity,
	DeliveryWarehouse,
	NPAddressItem,
	NPWarehouseItem
} from '@/types/baseTypes'

const NP_URL = 'https://api.novaposhta.ua/v2.0/json/'
const apiKey = process.env.NEXT_PUBLIC_NP_KEY!

export const novaPoshtaAPI: DeliveryAPI = {
	async searchCities(query: string): Promise<DeliveryCity[]> {
		if (!query.trim()) return []

		const res = await fetch(NP_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				apiKey,
				modelName: 'AddressGeneral',
				calledMethod: 'searchSettlements',
				methodProperties: {
					CityName: query,
					Limit: '30',
					Page: '1'
				}
			})
		})

		const data = await res.json()

		const list: NPAddressItem[] = data?.data?.[0]?.Addresses ?? []

		return list.map(item => ({
			ref: item.Ref,
			name: item.MainDescription,
			full: item.Present,
			short: item.MainDescription,
			raw: item
		}))
	},

	async getWarehouses(city: DeliveryCity): Promise<DeliveryWarehouse[]> {
		const res = await fetch(NP_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				apiKey,
				modelName: 'AddressGeneral',
				calledMethod: 'getWarehouses',
				methodProperties: {
					CityRef: city.raw.Ref,
					Language: 'UA'
				}
			})
		})

		const data = await res.json()
		const list: NPWarehouseItem[] = data?.data ?? []

		return list.map(w => ({
			ref: w.Ref,
			number: String(w.Number),
			description: w.Description,
			short: w.ShortAddress,
			raw: w
		}))
	}
}
