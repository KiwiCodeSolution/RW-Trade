import 'server-only'

type Dictionary = {
	[key: string]: () => Promise<any>
}

const dictionaries: Dictionary = {
	en: () => import('./en.json').then(module => module.default),
	uk: () => import('./uk.json').then(module => module.default)
}

export const getDictionary = async ({ locale }: { locale: string }) => {
	if (dictionaries[locale]) {
		return dictionaries[locale]()
	}
	return dictionaries.uk()
}
