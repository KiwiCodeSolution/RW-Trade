import CategoryCard from './CategoryCard'
import ProductCard from './ProductCard'

const CardRow = () => {

  const category = {
    title: 'Автосвітло',
    subcategories: [
      'Підкатегорія 1',
      'Підкатегорія 2',
      'Підкатегорія 3',
      'Підкатегорія 4',
      'Підкатегорія 5',
      'Підкатегорія 6',
      'Підкатегорія 7',
      'Підкатегорія 8',
      'Підкатегорія 9',
    ]
  }

  return (
    <div className='grid h-[505px] min-[940px]:grid-cols-3 min-[1230px]:grid-cols-4 min-[1530px]:grid-cols-5 min-[1840px]:grid-cols-6 gap-6 overflow-hidden'>
      <CategoryCard category={category}/>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default CardRow