import UserFooterBottom from './UserFooterBottom'
import UserFooterTop from './UserFooterTop'
import BaseSection from './baseComponents/BaseSection'

const UserFooter = () => {
	return (
		<footer>
			<BaseSection>
				<UserFooterTop />
				<UserFooterBottom />
			</BaseSection>
		</footer>
	)
}

export default UserFooter
