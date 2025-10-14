import UserFooterBottom from './UserFooterBottom'
import UserFooterTop from './UserFooterTop'

import React from 'react'

const UserFooter = () => {
	return (
		<footer>
			<div className='user-container'>
				<UserFooterTop />
				<UserFooterBottom />
			</div>
		</footer>
	)
}

export default UserFooter
