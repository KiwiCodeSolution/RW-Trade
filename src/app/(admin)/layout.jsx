import AdminHeader from '@/components/adminUI/AdminHeader'
import '../globals.css'

const AdminLayout = ({ children }) => {
  return (
    <html lang='uk'>
      <body className='text-txt-dark bg-bg-light'>
        <AdminHeader />
        <main>{children}</main>
        <footer>Admin Footer</footer>
      </body>
    </html>
  )
}
export default AdminLayout
