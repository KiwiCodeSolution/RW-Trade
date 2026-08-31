import { Locale, NewsArticle } from '@/types/baseTypes'

import NewsCard from '../userUI/NewsCard'
import BaseSection from '../userUI/baseComponents/BaseSection'

const NewsList = ({ posts, locale }: { posts: NewsArticle[]; locale: Locale }) => {
	return (
		<BaseSection className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-10 py-10'>
			{posts.map(p => (
				<NewsCard article={p} locale={locale} key={p._id} />
			))}
		</BaseSection>
	)
}
export default NewsList
