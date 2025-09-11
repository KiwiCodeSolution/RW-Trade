import UserHeaderTop from "./UserHeaderTop"
import UserHeaderBottom from "./UserHeaderBottom"

const UserHeader = ({ currentLang }) => {
  return (
    <header>
      <UserHeaderTop currentLang={currentLang} />
      <UserHeaderBottom />
    </header>
  )
}

export default UserHeader