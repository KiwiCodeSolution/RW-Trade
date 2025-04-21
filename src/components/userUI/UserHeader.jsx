import Link from "next/link"
import UserHeaderTop from "./UserHeaderTop"
import UserHeaderBottom from "./UserHeaderBottom"

const UserHeader = () => {
  return (
    <header>
      <UserHeaderTop />
      <UserHeaderBottom />
    </header>
  )
}

export default UserHeader