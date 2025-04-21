import UserHeader from '@/components/userUI/UserHeader'
import '../globals.css'
import UserFooter from '@/components/userUI/UserFooter'

const PublicLayout = ({ children }) => {

  return (
    <html lang='uk'>
      <body className='text-txt-dark bg-bg-light'>
        <UserHeader />
        <main>{children}</main>
        <UserFooter />
      </body>
    </html>
  )
}

export default PublicLayout