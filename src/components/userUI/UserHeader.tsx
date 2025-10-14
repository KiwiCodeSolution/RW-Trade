import { Locale } from '@/types/baseTypes'

import UserHeaderBottom from './UserHeaderBottom'
import UserHeaderTop from './UserHeaderTop'

interface UserHeaderProps {
	locale: Locale
}

const UserHeader = ({ locale }: UserHeaderProps) => {
	return (
		<header>
			<UserHeaderTop locale={locale} />
			<UserHeaderBottom />
		</header>
	)
}

export default UserHeader
