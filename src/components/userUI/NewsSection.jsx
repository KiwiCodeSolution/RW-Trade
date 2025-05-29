import React from 'react'
import NewsCard from './NewsCard'

const NewsSection = () => {

  const lang = 'uk'

  const content = {
    uk: {
      title: 'Новини та статті'
    },
    en: {
      title: 'News and Articles'
    }
  }

  const data = [
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure',
      imgUrl: 'mocImages/news_001.jpg'
    },
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure ipsa',
      imgUrl: 'mocImages/news_002.jpg'
    },
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure ipsa',
      imgUrl: 'mocImages/news_001.jpg'
    },
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure ipsa',
      imgUrl: 'mocImages/news_002.jpg'
    },
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure ipsa',
      imgUrl: 'mocImages/news_001.jpg'
    },
    {
      title: 'Lorem, ipsum dolor.',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo earum, ipsam harum iure ipsa',
      imgUrl: 'mocImages/news_002.jpg'
    }
  ]

  return (
    <section className='py-14'>
      <h3 className='font-bold text-[40px] text-center'>
        {content[lang].title}
      </h3>
      <div className="grid lg:grid-cols-2 gap-10 py-10">
        {data.map((item, index) => (
          <div key={index}>
            <NewsCard article={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewsSection