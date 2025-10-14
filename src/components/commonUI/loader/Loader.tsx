import Backdrop from '../Backdrop'

import '@/styles/loader.css'

const Loader = () => {
	return (
		<Backdrop>
			<div className='loader relative z-10' />
		</Backdrop>
	)
}

export default Loader
