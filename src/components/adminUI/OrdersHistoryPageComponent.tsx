'use client'

import { ordersStore } from '@/store/OrderStore'

import { observer } from 'mobx-react-lite'

const OrdersHistoryPageComponent = observer(() => {
	const { orders } = ordersStore
	return <div>OrdersHistoryPageComponent</div>
})
export default OrdersHistoryPageComponent
