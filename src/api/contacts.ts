import { api } from '@/utils/axios'

export interface ContactsData {
	phone1?: string
	phone2?: string
	phone3?: string
	address?: { uk: string; en: string }
	facebook?: string
	messenger?: string
	youtube?: string
	viber?: string
	telegram?: string
}

export async function getContacts(): Promise<ContactsData> {
	const { data } = await api.get<ContactsData>('/settings/data/contacts')
	return data
}

export async function updateContacts(payload: ContactsData): Promise<ContactsData> {
	const { data } = await api.patch<ContactsData>('/settings/data/contacts', payload)
	return data
}
