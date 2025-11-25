import { meestAPI } from './adapters/meest.adapter'
import { novaPoshtaAPI } from './adapters/novaPoshta.adapter'
import { ukrPoshtaAPI } from './adapters/ukrPoshta.adapter'
import { DeliveryAPI } from './delivery.types'

export const deliveryAdapters: Record<string, DeliveryAPI> = {
	nova_poshta: novaPoshtaAPI,
	Ukrposhta: ukrPoshtaAPI,
	Meest: meestAPI
}
