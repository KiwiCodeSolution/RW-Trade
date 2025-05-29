import React from 'react'

const NewsCard = ({article}) => {

  return (
    <div className='bg-primary h-[132px] w-full rounded-2xl p-4 flex gap-4'>
      {!!article.imgUrl && (
        <div className='w-[100px] h-[100px] min-w-[100px]'>
          <img src={article.imgUrl} alt="news image" />
        </div>
      )}
      <div className='text-white'>
        <h4 className='font-semibold text-xl mb-2'>{article.title}</h4>
        <p>{article.text}</p>
      </div>
    </div>
  )
}

export default NewsCard