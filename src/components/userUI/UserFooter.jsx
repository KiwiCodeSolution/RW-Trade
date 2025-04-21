import React from 'react'
import UserFooterBottom from './UserFooterBottom'
import UserFooterTop from './UserFooterTop'

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