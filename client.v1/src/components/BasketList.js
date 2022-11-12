import { useContext, useState, useEffect } from 'react'
import { AppContext } from './AppContext.js'
import { fetchBasket, increment, decrement, remove } from '../http/basketAPI.js'
import { Table, Spinner, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BasketItem from './BasketItem.js'
import { observer } from 'mobx-react-lite'

const BasketList = observer(() => {
    const { basket } = useContext(AppContext)
    const [fetching, setFetching] = useState(true)

    const navigate = useNavigate()

    const handleIncrement = (id) => {
        setFetching(true)
        increment(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleDecrement = (id) => {
        setFetching(true)
        decrement(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleRemove = (id) => {
        setFetching(true)
        remove(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    useEffect(() => {
        fetchBasket()
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            {basket.count ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.products.map(item => 
                                <BasketItem
                                    key={item.id}
                                    increment={handleIncrement}
                                    decrement={handleDecrement}
                                    remove={handleRemove}
                                    {...item}
                                />
                            )}
                            <tr>
                                <th colSpan="3">Total</th>
                                <th>{basket.sum}</th>
                                <th>USD</th>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => navigate('/checkout')}>Checkout</Button>
                </>
            ) : (
                <p>Your basket is empty</p>
            )}
        </>
    )
})

export default BasketList