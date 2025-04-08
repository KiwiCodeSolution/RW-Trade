import Link from "next/link"

const AdminHeader = () => {
  return (
    <header className='flex gap-4 items-center justify-center'>
      <Link href='/admin'>
        <h1 className='text-2xl font-bold'>RW-Trade Admin Panel</h1>
      </Link>
      <div className='flex gap-2'>
        <Link href='/admin/notifications' className="text-link-blue" >Notifications</Link>
        <Link href='/admin/messages' className="text-link-blue" >Messages</Link>
        <Link href='/admin/orders' className="text-link-blue" >Orders</Link>
        <Link href='/admin/categories_filters' className="text-link-blue" >Categories and Filters</Link>
        <Link href='/admin/cards' className="text-link-blue" >Cards</Link>
        <Link href='/admin/create_card' className="text-link-blue" >Create a New Card</Link>
        <Link href='/admin/statistics' className="text-link-blue" >Statistics</Link>
        <Link href='/admin/profile'className="text-link-blue" >Profile</Link>
        <Link href='/' className="text-link-bronze" >Main Page</Link>
      </div>
    </header>
  )
}

export default AdminHeader