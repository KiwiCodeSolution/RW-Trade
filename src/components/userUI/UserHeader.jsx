import Link from "next/link"

const UserHeader = () => {
  return (
    <header className='flex gap-4 items-center justify-center'>
      <Link href='/' >
        <h1 className='text-2xl font-bold'>RW-Trade</h1>
      </Link>
      <div className='flex gap-2'>
        <Link href='/catalog' className="text-link-blue">Catalog</Link>
        <Link href='/favorites' className="text-link-blue">Favorites</Link>
        <Link href='/about' className="text-link-blue">About</Link>
        <Link href='/payment_delivery' className="text-link-blue">Payment and Delivery</Link>
        <Link href='/warranty_return' className="text-link-blue">Warranty and Return</Link>
        <Link href='/contacts' className="text-link-blue">Contacts</Link>
        <Link href='/admin' className="text-link-bronze">Admin</Link>
        <Link href='/demo' className='text-link-bronze'>Demo</Link>
      </div>
    </header>
  )
}

export default UserHeader