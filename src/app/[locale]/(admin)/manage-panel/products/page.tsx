import CategoriesControlAdminPage from '@/components/adminUI/CategoriesControlAdminPage'
import HeaderPage from '@/components/adminUI/HeaderPage'

const Cards = () => {
	return (
		<div className='w-full'>
			<HeaderPage pageName='Всі продукти' />
			<CategoriesControlAdminPage />
		</div>
	)
}

export default Cards
