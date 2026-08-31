import { Locale } from '@/types/baseTypes'

import UserFooterBottom from './UserFooterBottom'
import UserFooterTop from './UserFooterTop'
import BaseSection from './baseComponents/BaseSection'

const UserFooter = ({ locale }: { locale: Locale }) => {
	return (
		<footer>
			<BaseSection>
				<UserFooterTop locale={locale} />
				<UserFooterBottom />
			</BaseSection>
		</footer>
	)
}

export default UserFooter
