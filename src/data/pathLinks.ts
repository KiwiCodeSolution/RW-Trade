// 1. Тип із переліком усіх сторінок
export type PageName =
	| 'головна'
	| 'home'
	| 'про нас'
	| 'about'
	| 'каталог'
	| 'catalog'
	| 'новини'
	| 'new'

// 2. Об'єкт із лінками
export const pathLinks: Record<PageName, string> = {
	головна: '/',
	home: '/',
	'про нас': '/about',
	about: '/about',
	каталог: '/catalog',
	catalog: '/catalog',
	новини: '/new',
	new: '/new'
}
