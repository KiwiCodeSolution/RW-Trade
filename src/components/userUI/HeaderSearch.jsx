import '../../app/globals.css'
import SearchIcon from '../../../public/icons/search-20.svg'

const HeaderSearch = () => {
  return (
    <div className='bg-primary p-0.5 rounded-full flex'>
      <input type="text"  className='h-[44px] grow bg-bg-light rounded-l-full outline-0 border-0 px-4' placeholder='Пошук...' />
      <div className='rounded-r-full bg-bg-light'>
      <button className='w-[44px] h-[44px] rounded-full p-2 text-gr-2 cursor-pointer'>
        <SearchIcon />
      </button>
      </div>
      
    </div>
  )
}

export default HeaderSearch