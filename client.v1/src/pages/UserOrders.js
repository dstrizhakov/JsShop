import { useState, useEffect } from 'react'
import { userGetAll as getAllOrders } from '../http/orderAPI.js'
import { Container } from 'react-bootstrap'
import Orders from '../components/Orders.js'
import Loading from '../components/Loading.js'

const UserOrders = () => {
	const [orders, setOrders] = useState(null)
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		getAllOrders()
			.then(
				data => setOrders(data)
			)
			.finally(
				() => setFetching(false)
			)
	}, [])

	if (fetching) {
		return <Loading />
	}

	return (
		<Container className="page-header">
			<h1 className='text-center'>Your orders</h1>
			<Orders items={orders} admin={false} />
		</Container>
	)
}

export default UserOrders