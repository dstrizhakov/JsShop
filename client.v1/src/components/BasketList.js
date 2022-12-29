import { useContext, useState } from 'react'
import { AppContext } from './AppContext.js'
import { increment, decrement, remove, clear } from '../http/basketAPI.js'
import { Table, Spinner, Button, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BasketItem from './BasketItem.js'
import { observer } from 'mobx-react-lite'
import Loading from './Loading.js'

const BasketList = observer(() => {
	const { basket } = useContext(AppContext)
	const [fetching, setFetching] = useState(false)
	const navigate = useNavigate()

	const handleClean = () => {
		setFetching(true)
		clear()
			.then(r => console.log("Basket cleared")
			)
			.finally(
				() => setFetching(false)
			)
	}

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



	if (fetching) {
		return <Loading />
	}

	return (
		<>
			{basket.count ? (
				<>
					<Table responsive hover size="sm" className="mt-3">
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
					<div className='text-center'>
						<Button onClick={() => navigate('/checkout')}>Checkout</Button>
					</div>
				</>
			) : (
				<p className='text-center'>Your basket is empty</p>
			)}
		</>
	)
})

export default BasketList