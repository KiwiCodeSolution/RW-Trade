import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then(module => module.default),
  uk: () => import('./uk.json').then(module => module.default)
}

export const getDictionary = async (locale) => {
  if(dictionaries[locale]) {
    return dictionaries[locale]()
  }
  return dictionaries.uk()
}