import { useState, useEffect } from 'react'
import { userGetAll as getAllOrders } from '../http/orderAPI.js'
import { Container, Spinner } from 'react-bootstrap'
import Orders from '../components/Orders.js'

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
        return <Spinner animation="border" />
    }

    return (
        <Container className="page-header">
            <div className="d-flex align-items-center">
                <div className="container position-relative">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-10">
            <h1>Your orders</h1>
            <Orders items={orders} admin={false} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default UserOrders