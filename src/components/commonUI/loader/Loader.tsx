import Backdrop from '../modal/Backdrop'

import '@/styles/loader.css'

const Loader = () => {
	return (
		<Backdrop closeOnOverlayClick={false} closeOnEsc={false}>
			<div className='loader relative z-10' />
		</Backdrop>
	)
}

export default Loader
