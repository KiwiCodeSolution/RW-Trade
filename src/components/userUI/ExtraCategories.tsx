import { useTranslations } from 'next-intl'

const ExtraCategories = ({ count }: { count: number }) => {
	const t = useTranslations('categories')

	if (count <= 0) return null

	return <span>{t('extra', { count })} ---&gt;</span>
}

export default ExtraCategories
