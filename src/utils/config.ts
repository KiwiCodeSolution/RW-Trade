// Основна адреса API (для запитів даних)
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/rest';

// Адреса для картинок (корінь сайту).
// Логіка: беремо BASE_URL і відрізаємо "/rest" в кінці.
// Наприклад: https://site.com/rest -> https://site.com
export const BASE_IMG_URL = BASE_URL.replace(/\/rest\/?$/, '');
