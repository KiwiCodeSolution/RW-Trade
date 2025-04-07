import AdminHeader from '@/components/adminUI/AdminHeader'
import '../globals.css'

const AdminLayout = ({ children }) => {
  return (
    <html lang='uk'>
      <body>
        <AdminHeader />
        <main>{children}</main>
        <footer>Admin Footer</footer>
      </body>
    </html>
  )
}
export default AdminLayout
