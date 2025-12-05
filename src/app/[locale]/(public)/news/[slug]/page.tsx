import NewsSection from '@/components/userUI/NewsSection'

import { Locale } from '@/types/baseTypes'

type Params = { locale: Locale; slug: string }

interface Post {
	userId: number
	id: number
	title: string
	body: string
	imgUrl?: string
}

interface Comment {
	postId: number
	id: number
	name: string
	email: string
	body: string
}

const OneNews = async ({ params }: { params: Promise<Params> }) => {
	const { slug } = await params

	const resNews = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
	const post: Post = await resNews.json()

	const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}/comments`)
	const comments: Comment[] = await resComments.json()

	return (
		<div className='user-container'>
			<div className='py-4 mb-4'>
				<div className='flex items-center mb-8'>
					<div className='w-[100px] h-[100px] min-w-[100px] flex justify-center items-center mr-8'>
						{post.imgUrl ? (
							<img src={post.imgUrl} alt={post.title} />
						) : (
							<img src='/logos/LOGO_152_blue.png' alt={post.title} />
						)}
					</div>
					<h2 className='text-5xl'>{post.title}</h2>
				</div>
				<p>{post.body}</p>
			</div>

			<div>
				{comments.map(comment => (
					<p key={comment.id}>
						{comment.body} — {comment.name}
					</p>
				))}
			</div>

			<NewsSection section='news' />
		</div>
	)
}

export default OneNews
