import Link from "next/link"

const AdminHeader = () => {
  return (
    <header className='flex gap-4 items-center justify-center'>
      <Link href='/admin'>
        <h1 className='text-2xl font-bold'>RW-Trade Admin Panel</h1>
      </Link>
      <div className='flex gap-2'>
        <Link href='/admin/notifications' >Notifications</Link>
        <Link href='/admin/messages' >Messages</Link>
        <Link href='/admin/orders' >Orders</Link>
        <Link href='/admin/categories_filters' >Categories and Filters</Link>
        <Link href='/admin/cards' >Cards</Link>
        <Link href='/admin/create_card' >Create a New Card</Link>
        <Link href='/admin/statistics' >Statistics</Link>
        <Link href='/admin/profile' >Profile</Link>
        <Link href='/' >Main Page</Link>
      </div>
    </header>
  )
}

export default AdminHeader