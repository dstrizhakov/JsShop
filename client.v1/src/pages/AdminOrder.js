import { useState, useEffect } from 'react'
import { adminDelete as deleteOrder, adminGetOne as getOneOrder } from '../http/orderAPI.js'
import { Container, Button } from 'react-bootstrap'
import Order from '../components/Order.js'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading.js'

const AdminOrder = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOneOrder(id)
            .then(
                data => setOrder(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <Loading />
    }

    if (error) {
        return <p>{error}</p>
    }
    const handleDeleteOrder = (id) =>{
        deleteOrder(id)
        .then(
            data => {
                alert(`Order with id «${id}» was deleted`)
            }
        )
        .catch(
            error => alert(error.response.data.message)
        )
    }
console.log(order)
    return (
        <Container className="page-header">
            <h1>Order № {order.id}</h1>
            <Order data={order} admin={true} />
            <Button variant="danger" onClick={(event) => handleDeleteOrder(order.id)}>Delete order</Button>
        </Container>
    )
}

export default AdminOrder