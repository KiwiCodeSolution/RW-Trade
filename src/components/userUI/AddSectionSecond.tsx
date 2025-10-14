import ArrowRightIcon from '../../../public/icons/arrow-right-primary-32.svg'
import BtnGost from '../commonUI/BtnGost'

const AddSectionSecond = () => {
	return (
		<section className='relative h-[228px] bg-primary text-white'>
			<div className='absolute left-[130px] top-1/2 -translate-y-1/2'>advertising block</div>
			<BtnGost className='absolute right-[130px] top-1/2 -translate-y-1/2'>
				<span>Каталог</span>
				<ArrowRightIcon />
			</BtnGost>
		</section>
	)
}

export default AddSectionSecond
