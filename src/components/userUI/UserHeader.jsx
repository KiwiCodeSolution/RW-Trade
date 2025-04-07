import Link from "next/link"

const UserHeader = () => {
  return (
    <header className='flex gap-4 items-center justify-center'>
      <Link href='/' >
        <h1 className='text-2xl font-bold'>RW-Trade</h1>
      </Link>
      <div className='flex gap-2'>
        <Link href='/catalog' >Catalog</Link>
        <Link href='/favorites' >Favorites</Link>
        <Link href='/about' >About</Link>
        <Link href='/payment_delivery' >Payment and Delivery</Link>
        <Link href='/warranty_return' >Warranty and Return</Link>
        <Link href='/contacts' >Contacts</Link>
        <Link href='/admin' >Admin</Link>
      </div>
    </header>
  )
}

export default UserHeader