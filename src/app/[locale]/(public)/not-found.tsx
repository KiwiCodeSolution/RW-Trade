import UserFooter from '@/components/userUI/UserFooter'

import Image from 'next/image'

const NotFound = () => {
	return (
		<div>
			{/* <UserHeader /> */}
			<div className='user-container py-10'>
				<h1 className='text-[40px] font-bold text-center'>404</h1>
				<p className='text-[40px] font-bold text-center mb-8'>Page not found</p>
				<div className='w-full max-w-[750px] mx-auto'>
					<Image src='/images/404.svg' alt='404' width={500} height={500} />
					{/* <CrashImage className='w-full h-auto' /> */}
				</div>
			</div>
			<UserFooter />
		</div>
	)
}

export default NotFound
