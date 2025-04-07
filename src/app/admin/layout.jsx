import '../globals.css'

const AdminLayout = ({ children }) => {
  return (
    <html lang='uk'>
      <body>
        <header className='text-2xl'>RW-Trade Admin Panel</header>
        <main>{children}</main>
        <footer>admin footer</footer>
      </body>
    </html>
  )
}
export default AdminLayout
