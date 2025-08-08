import AdminHeader from '@/components/adminUI/AdminHeader'
import '../globals.css'

const AdminLayout = ({ children }) => {
  return (
    <html lang='uk'>
      <body className='text-txt-dark bg-bg-light'>
        <div className='flex'>
          <div className='w-[320px]'>
            <AdminHeader />
          </div>
          <div className='flex flex-col grow'>
            <main className='w-full grow p-8'>{children}</main>
            <footer>Admin Footer</footer>
          </div>
        </div>
      </body>
    </html>
  )
}
export default AdminLayout
