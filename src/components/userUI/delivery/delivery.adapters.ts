import { DeliveryAPI } from '@/types/baseTypes'

import { meestAPI } from './adapters/meest.adapter'
import { novaPoshtaAPI } from './adapters/novaPoshta.adapter'
import { ukrPoshtaAPI } from './adapters/ukrPoshta.adapter'

export const deliveryAdapters: Record<string, DeliveryAPI> = {
	nova_poshta: novaPoshtaAPI,
	Ukrposhta: ukrPoshtaAPI,
	Meest: meestAPI
}
