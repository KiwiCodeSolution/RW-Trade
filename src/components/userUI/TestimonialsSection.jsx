import BabyImg from '../../../public/images/baby.svg'
import TestimonialsCard from './TestimonialsCard'

const TestimonialsSection = () => {

  const lang = 'uk' 

  const testimonials = [
    {
      uk: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      },
      en: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      }
    },
    {
      uk: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      },
      en: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      }
    },
    {
      uk: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      },
      en: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      }
    },
    {
      uk: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      },
      en: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      }
    },
    {
      uk: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      },
      en: {
        name: 'user name',
        imgUrl: '',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.'
      }
    }
  ]

  return (
    <section className='grid grid-cols-2 py-14 gap-10'>
      <div className='flex items-center justify-center'>
        <BabyImg className='max-w-[600px] h-auto' />
      </div>
      <div>
        <h3></h3>
        <div className='grid grid-cols-2 gap-10'>
          {testimonials.map((item, index) => (
            <TestimonialsCard key={index} testimonial={item[lang]}/>
          ))}
        </div>
      </div>


    </section>
  )
}

export default TestimonialsSection