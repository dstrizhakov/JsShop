import { useState, useEffect } from 'react'
import { adminGetAll as getAllOrders } from '../http/orderAPI.js'
import { Button, Container } from 'react-bootstrap'
import Orders from '../components/Orders.js'
import CreateOrder from '../components/CreateOrder.js'
import Loading from '../components/Loading.js'

const AdminOrders = () => {
    const [orders, setOrders] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)

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
            <h1>All orders</h1>
            <Button onClick={() => setShow(true)}>Create order</Button>
            <CreateOrder show={show} setShow={setShow} />
            <Orders items={orders} admin={true} />
        </Container>
    )
}

export default AdminOrders