import { Locale } from '@/types/baseTypes'

const Favorites = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
	const { locale } = await params

	return <div>Favorites Page</div>
}

export default Favorites
