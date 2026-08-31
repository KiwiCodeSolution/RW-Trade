import { Person, StarIcon } from '@/assets/icons'

type Testimonial = {
	name: string
	text: string
	imgUrl?: string
}

const TestimonialsCard = ({ testimonial }: { testimonial: Testimonial }) => {
	// Якщо даних немає — не рендеримо нічого, або повертаємо пустий блок
	if (!testimonial) return null

	return (
		<div className='min-w-[240px] max-w-[340px] min-h-[152px] p-4 bg-primary rounded-2xl'>
			<div className='flex gap-2 items-center mb-4'>
				<div className='w-8 h-8 min-w-8 flex items-center justify-center rounded-full overflow-hidden'>
					{testimonial?.imgUrl ? (
						<img src={testimonial?.imgUrl} alt='avatar' className='min-w-8 h-auto' />
					) : (
						<div className='w-full h-full flex items-center justify-center border rounded-full text-white'>
							<Person />
						</div>
					)}
				</div>
				<p className='text-white grow'>{testimonial?.name}</p>
				<div className='flex text-sc-4'>
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
				</div>
			</div>
			<p className='text-white'>{testimonial?.text}</p>
		</div>
	)
}

export default TestimonialsCard
