import { DeliveryMethod } from '@/types/baseTypes'

export interface NPAddressItem {
	Ref: string
	Present: string
	MainDescription: string
	Area: string
	Region: string
	Warehouse?: string
	DeliveryCity?: string
}

export interface NPWarehouseItem {
	Ref: string
	Number: string
	Description: string
	ShortAddress: string
	CityRef: string
}

export interface DeliveryCity {
	ref: string
	name: string
	full: string
	short: string
	raw: NPAddressItem
}

export interface DeliveryWarehouse {
	ref: string
	number: string
	description: string
	short: string
	raw: NPWarehouseItem
}

export interface DeliveryAPI {
	searchCities(query: string): Promise<DeliveryCity[]>
	getWarehouses(city: DeliveryCity): Promise<DeliveryWarehouse[]>
}

export type DeliveryData = {
	method: DeliveryMethod
	city: DeliveryCity | null
	warehouse?: DeliveryWarehouse | null
	address?: string
	comment?: string
	raw?: {
		city?: NPAddressItem
		warehouse?: NPWarehouseItem
	} | null
}
