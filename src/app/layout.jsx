import Link from 'next/link'
import './globals.css'

const Layout = ({ children }) => {
  return (
    <html lang='uk'>
      <body>
        <header className='flex gap-4 items-center justify-center'>
          <h1 className='text-2xl font-bold'>RW-Trade</h1>
          <div className='flex gap-2'>
            <Link href='/catalog' >Catalog</Link>
            <Link href='/favorites' >Favorites</Link>
            <Link href='/about' >About</Link>
            <Link href='payment_delivery' >Payment and Delivery</Link>
            <Link href='/warranty_return' >Warranty and Return</Link>
            <Link href='contacts' >Contacts</Link>
            <Link href='/admin' >Admin</Link>
          </div>
        </header>
        <main>{children}</main>
        <footer>@RW-Trade</footer>
      </body>
    </html>
  )
}
export default Layout
