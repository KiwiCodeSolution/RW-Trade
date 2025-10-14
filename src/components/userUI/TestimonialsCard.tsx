import PersonIcon from '../../../public/icons/person-16.svg'
import StarIcon from '../../../public/icons/star-solid-24.svg'

const TestimonialsCard = ({ testimonial }) => {
	return (
		<div className='min-w-[240px] max-w-[340px] h-[152px] p-4 bg-primary rounded-2xl'>
			<div className='flex gap-2 items-center mb-4'>
				<div className='w-8 h-8 min-w-8 flex items-center justify-center rounded-full overflow-hidden'>
					{!!testimonial.imgUrl ? (
						<img src={testimonial?.imgUrl} alt='avatar' className='min-w-8 h-auto' />
					) : (
						<div className='w-full  h-full flex items-center justify-center border rounded-full text-white'>
							<PersonIcon />
						</div>
					)}
				</div>
				<p className='text-white grow'>{testimonial.name}</p>
				<div className='flex text-sc-4'>
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
				</div>
			</div>
			<p className='text-white'>{testimonial.text}</p>
		</div>
	)
}

export default TestimonialsCard
