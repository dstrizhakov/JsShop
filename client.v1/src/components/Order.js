import { Table } from 'react-bootstrap'

const Order = (props) => {
	return (
		<>
			<ul>
				<li>Order date: {props.data.prettyCreatedAt}</li>
				<li>
					Order status: <span> </span>
					{props.data.status === 0 && <span>New</span>}
					{props.data.status === 1 && <span>In work</span>}
					{props.data.status === 2 && <span>Finished</span>}
				</li>
			</ul>
			<ul>
				<li>Name: {props.data.name}</li>
				<li>Email: {props.data.email}</li>
				<li>Phone: {props.data.phone}</li>
				<li>Address: {props.data.address}</li>
				<li>Comment: {props.data.comment}</li>
			</ul>
			<Table bordered hover size="sm" className="mt-3">
				<thead>
					<tr>
						<th>title</th>
						<th>price</th>
						<th>quantity</th>
						<th>Sum</th>
					</tr>
				</thead>
				<tbody>
					{props.data.items.map(item =>
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td>{item.price * item.quantity}</td>
						</tr>
					)}
					<tr>
						<td colSpan={3}>Total</td>
						<td>{props.data.amount}</td>
					</tr>
				</tbody>
			</Table>
		</>
	)
}

export default Order