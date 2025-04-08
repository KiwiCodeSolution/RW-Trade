import UserHeader from '@/components/userUI/UserHeader'
import '../globals.css'

const PublicLayout = ({ children }) => {

  return (
    <html lang='uk'>
      <body className='text-txt-dark bg-bg-light'>
        <UserHeader />
        <main>{children}</main>
        <footer>Public Footer</footer>
      </body>
    </html>
  )
}

export default PublicLayout